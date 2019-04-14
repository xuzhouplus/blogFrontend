import $ from 'jquery';
import 'bootstrap-fileinput';
import 'bootstrap-fileinput/css/fileinput.css'
import 'bootstrap-fileinput/themes/explorer-fas/theme.css';
import './FileUploader.css';

/**
 * @link http://fex.baidu.com/webuploader/doc/index.html#WebUploader_Uploader
 */
export function fileUploader(picker, options) {
	const defaultOptions = {
		language: 'zh',
		uploadUrl: '',
		allowedFileExtensions: ['jpg', 'png', 'gif'],
		showUpload: false, //是否显示上传按钮
		showCaption: false,
		browseClass: "btn btn-dark",
		theme: 'fas',
		dropZoneEnabled: false,
		browseLabel: '选择附件',                            // 浏览按钮内容
		showRemove: false,
	};
	const mergeOptions = $.extend({}, defaultOptions, options);
	$(picker).fileinput(mergeOptions);
}
