import $ from 'jquery';
import 'bootstrap-fileinput/js/fileinput';
import 'bootstrap-fileinput/themes/explorer-fas/theme.css';
import 'bootstrap-fileinput/css/fileinput.css'
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
		theme: 'fas'
	};
	const mergeOptions = $.extend(defaultOptions, options);
	$(picker).fileinput(mergeOptions);
}
