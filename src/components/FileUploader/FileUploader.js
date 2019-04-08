import $ from 'jquery';
import WebUploader from 'webuploader'
import 'webuploader/dist/webuploader.css';
import './FileUploader.css';

/**
 * @link http://fex.baidu.com/webuploader/doc/index.html#WebUploader_Uploader
 */
export function fileUploader(options) {
	const defaultOptions = {
		dnd: true,
		disableGlobalDnd: true,
		pick: '#filePicker',
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		},
		onFileQueued: function (file) {
		},
		onUploadProgress: function (file, percentage) {
		},
		onUploadSuccess: function (file) {
		},
		onUploadError: function (file) {
		},
		onUploadComplete: function (file) {
		}
	};
	const mergeOptions = $.extend(defaultOptions, options);
	return new WebUploader.Uploader(mergeOptions);
}
