//代码重新修订
const $ = require('jquery');

class ClipTools {
	constructor() {
		this.template='<div id="workplace">\n' +
			'    <div id="workplacewrap">\n' +
			'        <div id="operateplace">\n' +
			'            <div class="showinfo">\n' +
			'            <span class="mouseposition">\n' +
			'                坐标(px):\n' +
			'                x:<span class="mouseposition-x">0</span>\n' +
			'                y:<span class="mouseposition-y">0</span>\n' +
			'            </span>\n' +
			'            </div>\n' +
			'            <div id="sourceImage">\n' +
			'                <img src="./images/show-window/1-1.jpg" alt="" draggable="false">\n' +
			'            </div>\n' +
			'            <div id="clipregion"></div>\n' +
			'            <div class="operation">\n' +
			'                <input id="fileselector" type="file" hidden style="">\n' +
			'                <label class="btn" for="fileselector">选择文件</label>\n' +
			'                <span id="btn-ResizeUp" class="btn">放大</span>\n' +
			'                <span id="btn-ResizeDown" class="btn">缩小</span>\n' +
			'                <span id="btn-Clip" class="btn">裁剪</span>\n' +
			'            </div>\n' +
			'        </div>\n' +
			'        <div id="showwindow">\n' +
			'            <div class="showinfo">\n' +
			'            <span class="mouseposition">\n' +
			'                缩放比例:\n' +
			'                <span class="enlargeratio"></span>%\n' +
			'            </span>\n' +
			'            </div>\n' +
			'            <div style="position: absolute;">\n' +
			'                <div id="pologen"></div>\n' +
			'            </div>\n' +
			'            <div id="previewwindow">\n' +
			'                <img src="" alt="" draggable="false">\n' +
			'            </div>\n' +
			'            <div class="operation">\n' +
			'                <span class="btn">保存</span>\n' +
			'            </div>\n' +
			'\n' +
			'        </div>\n' +
			'    </div>';
		this.workview = $('#sourceImage');
		this.showview = $('#previewwindow');

		this.workviewimg = $('#sourceImage>img');
		this.showviewimg = $('#previewwindow>img');
		//工作区实际尺寸,由于图片有缩放,工作区尺寸实际是有workvimg尺寸决定的,而工作区视窗的是尺寸是固定的,本例中是500*300,这个尺寸默认就是最终截图的尺寸
		//后面扩展,可以对工作视图的尺寸进行调整,截出不同尺寸的图片
		this.workvwidth = 0;
		this.workvheight = 0;
		//同样展示框的尺寸,实际是右侧展示框图片缩放后的尺寸,本例中图片一定要全部放入展示视窗,所以,这个尺寸是小于等于展示视窗的尺寸的
		this.showvwidth = this.workview.width();
		this.showvheight = this.workview.height();

		//右侧显示区图片缩放后的高度
		this.showvimgheight = 0;
		//右侧显示区图片缩放后的宽度
		this.showvimgwidth = 0;
		this.resizeRate = 0.5;
		this.isScrollMouseResize = false;
		//后面扩展,比如绘制裁剪区域时用,本例中没有实际意义
		this.isClip = false;

		this.isMouseDown = false;
		//标识鼠标在工作区的坐标,offsetX 和offsetY(相对于视窗)
		this.workpos_x = 0;
		this.workpos_y = 0;

		//图片顶点位置
		this.sourceimg_l = 0;
		this.sourceimg_t = 0;
		//图片在计算拖动距离的时候,需要记录鼠标的起始位置,在鼠标的down->move中,起始位置以鼠标的down点为基准
		this.lastMouse_x = 0;
		this.lastMouse_y = 0;
		//记录图片的原始尺寸
		this.sourceimg_w = 0;
		this.sourceimg_h = 0;
		//记录图片缩放的比例
		this.enlargeratio = 1.0;

		//显示区图片和显示区域的比例
		this.showToSourceWidthRatio = 0.1;
		this.showToSouceHeightRatio = 0.1;


		this.Init = this.Init.bind(this);
		this.ImgInputFileChanged = this.ImgInputFileChanged.bind(this);
		this.ResizeUp = this.ResizeUp.bind(this);
		this.ResizeDown = this.ResizeDown.bind(this);
		this.ShowWorkPos = this.ShowWorkPos.bind(this);
		this.DrawClipRegionTosShow = this.DrawClipRegionTosShow.bind(this);
	}

	ShowWorkPos(x, y) {
		$('.mouseposition-x').text(this.workpos_x);
		$('.mouseposition-y').text(this.workpos_y);
		$(".enlargeratio").text(($("#pologen").height() / this.showvimgwidth) * 100);

		this.DrawClipRegionTosShow();
	}

	Init() {
		//如果工作区域有默认图片
		this.sourceimg_h = this.workviewimg.height();
		this.sourceimg_w = this.workviewimg.width();

		this.workvwidth = this.sourceimg_w;
		this.workvheight = this.sourceimg_h;

		this.showToSouceHeightRatio = this.showvheight / this.sourceimg_h;
		this.showToSourceWidthRatio = this.showvwidth / this.sourceimg_w;

		//右侧展示区域,展示当前工作区处于图片的区域
		//按照最小比例对图片进行缩放

		if (this.showToSouceHeightRatio < this.showToSourceWidthRatio) {
			this.showvimgheight = this.showvheight;
			this.showvimgwidth = this.showToSouceHeightRatio * this.sourceimg_w;
		} else {
			this.showvimgheight = this.sourceimg_h * this.showToSourceWidthRatio;
			this.showvimgwidth = this.showvwidth;
		}
		this.showviewimg.attr('src', this.workviewimg.attr('src')).width(this.showvimgwidth).height(this.showvimgheight);

		$('#btn-Clip').click(() => {
			let _cropCanvas = document.createElement('canvas');
			// 计算截取时从原图片的原始长度的坐标
			//图片有缩放等,所以要利用原始数据进行计算
			let _sy = -this.sourceimg_t / (this.workvheight / this.sourceimg_h);
			let _sx = -this.sourceimg_l / (this.workvwidth / this.sourceimg_w);
			let _swidth = this.workview.width() / (this.workvwidth / this.sourceimg_w);
			let _sheight = this.workview.height() / (this.workvheight / this.sourceimg_h);
			let width = this.workview.width();
			let height = this.workview.height();
			//工作区域视窗就是图片的大小
			_cropCanvas.width = width;
			_cropCanvas.height = height;
			// 绘制图片
			_cropCanvas.getContext('2d').drawImage(this.workviewimg[0], _sx, _sy, _swidth, _sheight, 0, 0, width, height);
			// 保存图片信息
			let _lastImageData = _cropCanvas.toDataURL('image/png');
			// 将裁剪出来的信息展示
			this.showviewimg.attr({"src": _lastImageData}).css({"width": width + "px", "height": height + "px"});
			$('#pologen').css('display', "none");
			alert("裁剪成功");
		});
		$('#fileselector').on("change", this.ImgInputFileChanged);
		$("#btn-ResizeUp").click(this.ResizeUp);
		$("#btn-ResizeDown").click(this.ResizeDown);
		//this.DrawClipRegionTosShow();
		this.workviewimg.mousemove((e) => {

			if (this.isMouseDown) {
				if (this.workviewimg)
					var left_s = e.offsetX - this.lastMouse_x;
				var top_s = e.offsetY - this.lastMouse_y;

				this.sourceimg_l += left_s;
				this.sourceimg_t += top_s;
				this.workviewimg.css({"left": this.sourceimg_l + "px", "top": this.sourceimg_t + "px"});
			}
			this.workpos_x = e.offsetX + this.sourceimg_l;
			this.workpos_y = e.offsetY + this.sourceimg_t;
			this.ShowWorkPos(e.offsetX, e.offsetY);
			return false;
		});
		//工作区滚轮事件,调整图片缩放,相当于是微调
		this.workviewimg.on("mousewheel DOMMouseScroll", (e) => {
			this.isScrollMouseResize = true;
			var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
				(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

			if (delta > 0)//向上滚
			{
				if (this.enlargeratio >= 1) {
					return;
				}
				this.workvwidth += 1;
				this.workvheight += this.sourceimg_h / this.sourceimg_w;
			} else if (delta < 0) {
				this.workvwidth -= 1;
				this.workvheight -= this.sourceimg_h / this.sourceimg_w;
			}
			this.workviewimg.css({"width": this.workvwidth + "px", "height": this.workvheight + "px"});
			this.workviewimg.height(this.workvheight);
			//this.DrawClipRegionTosShow();
		});

		//工作区图片拖拽
		this.workviewimg.mousedown((e) => {
			this.isMouseDown = true;
			if (!this.isClip) {
				this.workviewimg.css({"cursor": "move"});
			}
			this.lastMouse_x = e.offsetX;
			this.lastMouse_y = e.offsetY;
		});
		//鼠标未松开,移出工作区
		this.workviewimg.mouseleave((e) => {
			this.isMouseDown = false;
			if (!this.isClip) {
				this.workviewimg.css({"cursor": "default"});
			}
		});
		//防止鼠标松开的事件,遗漏,所以拖拽的终事件,放在body中监听
		$('body').mouseup((e) => {
			this.isMouseDown = false;
			if (!this.isClip) {
				this.workviewimg.css({"cursor": "default"});
			}
		});
	}

	//在展示区域,标识出被截图的范围
	DrawClipRegionTosShow() {
		//1.首先将工作区左上角的位置还原到原图的位置,因为有滚轮的放大和缩小,所以原本定义在放大或者缩小按钮上的缩放比例不能再使用,要重新计算
		//不管是放大缩小按钮,还是滚轮缩放的比例在工作区都是一样的
		//计算在右侧展示区,缩放后投影裁剪区域的位置
		this.showToSouceHeightRatio = this.showvheight / this.workvheight;
		this.showToSourceWidthRatio = this.showvwidth / this.workvwidth;
		let showLeft = 0;
		let showTop = 0;
		let showWidth = 0;
		let showHeight = 0;
		if (this.showToSouceHeightRatio < this.showToSourceWidthRatio) {
			showWidth = this.workview.width() * this.showToSouceHeightRatio;
			showHeight = this.workview.height() * this.showToSouceHeightRatio;
			showLeft = -this.sourceimg_l * this.showToSouceHeightRatio;
			showTop = -this.sourceimg_t * this.showToSouceHeightRatio;
		} else {
			showWidth = this.workview.width() * this.showToSourceWidthRatio;
			showHeight = this.workview.height() * this.showToSourceWidthRatio;
			showLeft = -this.sourceimg_l * this.showToSourceWidthRatio;
			showTop = -this.sourceimg_t * this.showToSourceWidthRatio;
		}
		$('#pologen').css({
			"display": "block",
			"top": showTop + "px",
			"left": showLeft + "px",
			"width": showWidth + "px",
			"height": showHeight + "px"
		});

	}

	ResizeDown(e) {
		this.sourceimg_t = 0;
		this.sourceimg_l = 0;
		this.workviewimg.css({"left": this.sourceimg_l + "px", "top": this.sourceimg_t + "px"});
		//鼠标滑轮调整过尺寸,则将图复原
		if (this.isScrollMouseResize) {
			this.enlargeratio = 1.0;
			this.workvwidth = this.sourceimg_w;
			this.workvheight = this.sourceimg_h;
			this.workviewimg.css({"width": this.sourceimg_w + "px", "height": this.sourceimg_h + "px"});
		}
		this.isScrollMouseResize = false;
		//不允许对完全在工作区展示的图片,再缩小
		if (this.workvheight < this.showvheight && this.workvwidth < this.showvwidth) {
			return;
		} else {
			this.enlargeratio *= this.resizeRate;
			this.workvwidth = this.sourceimg_w * this.enlargeratio;
			this.workvheight = this.sourceimg_h * this.enlargeratio;
			this.workviewimg.css({"width": this.workvwidth + "px", "height": this.workvheight + "px"});
			this.DrawClipRegionTosShow();
		}
	}

	ResizeUp(e) {
		this.sourceimg_t = 0;
		this.sourceimg_l = 0;
		this.workviewimg.css({"left": this.sourceimg_l + "px", "top": this.sourceimg_t + "px"});
		//鼠标滑轮调整过尺寸,则将图复原
		if (this.isScrollMouseResize) {
			this.enlargeratio = 1.0;
			this.workvwidth = this.sourceimg_w;
			this.workvheight = this.sourceimg_h;
			this.workviewimg.css({"width": this.sourceimg_w + "px", "height": this.sourceimg_h + "px"});

		}
		this.isScrollMouseResize = false;
		//不允许,对原样展示的图片再进行放大
		if (this.enlargeratio >= 1) {
			return;
		} else {
			this.enlargeratio /= this.resizeRate;
			this.workvwidth = this.sourceimg_w * this.enlargeratio;
			this.workvheight = this.sourceimg_h * this.enlargeratio;
			this.workviewimg.css({"width": this.workvwidth + "px", "height": this.workvheight + "px"});
		}
		this.DrawClipRegionTosShow();
	}

	ImgInputFileChanged(e) {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		//读取完成时
		reader.onloadend = (e) => {
			this.workviewimg.attr('src', e.target.result);

			this.sourceimg_h = this.workviewimg.height();
			this.sourceimg_w = this.workviewimg.width();


			this.showToSouceHeightRatio = this.showvheight / this.sourceimg_h;
			this.showToSourceWidthRatio = this.showvwidth / this.sourceimg_w;

			//右侧展示区域,展示当前工作区处于图片的区域
			//按照短边的比例对图片进行缩放
			if (this.showToSouceHeightRatio < this.showToSourceWidthRatio) {
				this.showvimgheight = this.showvheight;
				this.showvimgwidth = this.showToSouceHeightRatio * this.sourceimg_w;
			} else {
				this.showvimgheight = this.sourceimg_h * this.showToSourceWidthRatio;
				this.showvimgwidth = this.showvwidth;
			}
			this.showviewimg.attr('src', this.workviewimg.attr('src')).css({
				"width": this.showvimgwidth + "px",
				"height": this.showvimgheight + "px"
			});

			this.DrawClipRegionTosShow();
		}
	}
}

export default ClipTools;