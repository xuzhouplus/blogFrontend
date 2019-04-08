import $ from 'jquery';
import videojs from "video.js";
import './MediaPlayer.css'

export function mediaPlayer(ele, options) {
	const defaultOptions = {
		language: 'zh-CN',
		controls: false,
		nativeTextTracks: false
	};
	const mergeOptions = $.extend({}, defaultOptions, options);
	return videojs(ele, mergeOptions, function () {

	});
}