import $ from 'jquery';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import './MediaPlayer.css'

export function mediaPlayer(ele, options) {
	const defaultOptions = {
		language: 'zh-CN',
		controls: false,
		nativeTextTracks: false
	};
	const mergeOptions = $.extend({}, defaultOptions, options);
	console.log(mergeOptions);
	return videojs(ele, mergeOptions, function () {

	});
}