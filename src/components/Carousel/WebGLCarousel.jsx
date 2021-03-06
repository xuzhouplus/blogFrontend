import React from 'react';
import TweenMax from 'gsap';
import * as THREE from 'three';
import ImagesLoaded from 'imagesloaded';
import './WebGLCarousel.css';

class WebGlCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			interval: null,
			carousel: [
				{
					src: '/images/Carousel/bipenggou.jpg',
					name: '毕棚沟',
					position: '毕棚沟',
					location: '理县'
				},
				{
					src: '/images/Carousel/huashan.jpg',
					name: '华山',
					position: '华山',
					location: '华阴'
				},
				{
					src: '/images/Carousel/langzhonggucheng.jpg',
					name: '阆中古城',
					position: '阆中古城',
					location: '阆中'
				},
				{
					src: '/images/Carousel/dujiangyan.jpg',
					name: '都江堰',
					position: '都江堰',
					location: '成都'
				},
				{
					src: '/images/Carousel/uestc.jpg',
					name: '电子科技大学',
					position: '电子科技大学',
					location: '成都'
				},
				{
					src: '/images/Carousel/emeishan.jpg',
					name: '峨眉山',
					position: '峨眉山',
					location: '峨眉山'
				},
				{
					src: '/images/Carousel/yiheyuan.jpg',
					name: '颐和园',
					position: '颐和园',
					location: '北京'
				}
			]
		};
	}

	renderCarousel() {
		let webGLCarouselComponent = this;
		let displacementSlider = function displacementSlider(options) {
			let vertex = 'varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}';
			let fragment = 'varying vec2 vUv;uniform sampler2D currentImage;uniform sampler2D nextImage;uniform float dispFactor;void main() {vec2 uv = vUv;vec4 _currentImage;vec4 _nextImage;float intensity = 0.3;vec4 orig1 = texture2D(currentImage, uv);vec4 orig2 = texture2D(nextImage, uv);_currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));_nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);gl_FragColor = finalTexture;}';
			//初始化数据，用于加载图片
			let image = 0;
			//用于保存加载的图片
			let sliderImages = [];
			//图片列表
			let images = options.images;
			//第一张图片，用于渲染初始页面
			let firstImage = images[0];
			//容器
			let container = options.container;
			//添加初始图片
			let containerHtml = '';
			//添加初始文字
			containerHtml = containerHtml + '<div class="slider-inner">' +
				'<div id="slider-content">' +
				'<div class="meta">Position</div>' +
				'<h2 id="slide-title">' +
				firstImage.position
				+ '</h2>' +
				'<div class="meta">Location</div>' +
				'<div id="slide-status">' +
				firstImage.location
				+ '</div>' +
				'</div>' +
				'</div>';
			//添加导航按钮
			containerHtml = containerHtml + '<div id="pagination"></div>';
			//添加初始化内容
			container.innerHTML = containerHtml;
			//导航按钮容器
			let paginationContainer = container.querySelector('#pagination');
			//文字容器
			let slideTitleEl = container.querySelector('#slide-title');
			let slideStatusEl = container.querySelector('#slide-status');
			//页面尺寸
			let renderWidth = container.clientWidth;
			let renderHeight = container.clientHeight;
			let renderer = new THREE.WebGLRenderer({
				antialias: false
			});

			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setClearColor(0x23272A, 1.0);
			renderer.setSize(renderWidth, renderHeight, false);
			container.appendChild(renderer.domElement);

			let loader = new THREE.TextureLoader();
			loader.crossOrigin = "anonymous";
			//加载图片
			images.forEach(function (img, index) {
				image = loader.load(img.src);
				image.magFilter = image.minFilter = THREE.LinearFilter;
				image.anisotropy = renderer.capabilities.getMaxAnisotropy();
				sliderImages.push(image);
				//添加导航按钮
				let buttonElement = document.createElement('button');
				buttonElement.setAttribute('data-slide', index.toString());
				buttonElement.setAttribute('data-name', img.name);
				paginationContainer.appendChild(buttonElement);
			});
			//设置第一个按钮类为active
			paginationContainer.firstChild.className = 'active';

			let scene = new THREE.Scene();
			scene.background = new THREE.Color(0x23272A);
			let camera = new THREE.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, 1, 1000);

			camera.position.z = 1;

			let mat = new THREE.ShaderMaterial({
				uniforms: {
					dispFactor: {type: "f", value: 0.0},
					currentImage: {type: "t", value: sliderImages[0]},
					nextImage: {type: "t", value: sliderImages[1]}
				},
				vertexShader: vertex,
				fragmentShader: fragment,
				transparent: true,
				opacity: 1.0
			});

			let geometry = new THREE.PlaneBufferGeometry(container.offsetWidth, container.offsetHeight, 1);
			let object = new THREE.Mesh(geometry, mat);
			object.position.set(0, 0, 0);
			scene.add(object);

			let isAnimating = false;

			let render = function (slideId) {
				pageIndex = slideId;
				if (!isAnimating) {
					isAnimating = true;
					paginationContainer.querySelector('.active').className = '';
					paginationContainer.querySelectorAll('button')[pageIndex].className = 'active';
					mat.uniforms.nextImage.value = sliderImages[slideId];
					mat.uniforms.nextImage.needsUpdate = true;

					TweenMax.to(mat.uniforms.dispFactor, 1, {
						value: 1,
						ease: 'Expo.easeInOut',
						onComplete: function onComplete() {
							mat.uniforms.currentImage.value = sliderImages[slideId];
							mat.uniforms.currentImage.needsUpdate = true;
							mat.uniforms.dispFactor.value = 0.0;
							isAnimating = false;
						}
					});

					let nextSlideTitle = images[slideId]['position'];
					let nextSlideStatus = images[slideId]['location'];

					TweenMax.fromTo(slideTitleEl, 0.5, {
						autoAlpha: 1,
						filter: 'blur(0px)',
						y: 0
					}, {
						autoAlpha: 0,
						filter: 'blur(10px)',
						y: 20,
						ease: 'Expo.easeIn',
						onComplete: function onComplete() {
							slideTitleEl.innerHTML = nextSlideTitle;

							TweenMax.to(slideTitleEl, 0.5, {
								autoAlpha: 1,
								filter: 'blur(0px)',
								y: 0
							});
						}
					});

					TweenMax.fromTo(slideStatusEl, 0.5, {
						autoAlpha: 1,
						filter: 'blur(0px)',
						y: 0
					}, {
						autoAlpha: 0,
						filter: 'blur(10px)',
						y: 20,
						ease: 'Expo.easeIn',
						onComplete: function onComplete() {
							slideStatusEl.innerHTML = nextSlideStatus;

							TweenMax.to(slideStatusEl, 0.5, {
								autoAlpha: 1,
								filter: 'blur(0px)',
								y: 0,
								delay: 0.1
							});
						}
					});
				}
			};
			let pageIndex = 0;
			let loop = function () {
				let existInterval = webGLCarouselComponent.state.interval;
				if (existInterval) {
					clearInterval(existInterval);
				}
				let pagButtons = Array.from(paginationContainer.querySelectorAll('button'));
				let interval = setInterval(function () {
					pageIndex++;
					pageIndex = parseInt(pageIndex % pagButtons.length);
					render(pageIndex);
				}, 5000);
				webGLCarouselComponent.setState({
					interval: interval
				});
			};
			let addEvents = function addEvents() {
				let pagButtons = Array.from(paginationContainer.querySelectorAll('button'));
				pagButtons.forEach(function (el) {
					el.addEventListener('click', function () {
						let slideId = parseInt(this.dataset.slide, 10);
						render(slideId);
						loop();
					});
				});
			};

			addEvents();

			window.addEventListener('resize', function (e) {
				renderer.setSize(renderWidth, renderHeight);
			});

			let animate = function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			};
			animate();
			loop();
		};

		let sliderContainer = document.getElementById('slider');
		let carouselImages = sliderContainer.querySelectorAll('img');
		ImagesLoaded(carouselImages, function () {
			new displacementSlider({
				container: sliderContainer,
				images: webGLCarouselComponent.state.carousel
			});
		});
	}

	componentDidMount() {
		this.renderCarousel();
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	render() {
		return (
			<div className="section row carousel" id="slider">
				<div id="image-list">
				</div>
			</div>
		);
	}
}

export default WebGlCarousel;