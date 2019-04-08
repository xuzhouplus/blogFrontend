import React from 'react';
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";
import AddIcon from "../../../images/Other/add.png";
import {hideValidformError, initValidform, showValidformError} from "../../Validform/validform";
import $ from "jquery";
import {alertTypes, modalAlert} from "../../Modal/ModalAlert";
import {fileUploader} from "../../FileUploader/FileUploader";
import {mediaPlayer} from "../../MediaPlayer/MediaPlayer";

class AudioEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			title: '示例代码',
			audio: '',
			description: 'code editor example',
			inputTag: '',
			tag: ['WebGL']
		};
		this.tagInputChangeEvent = this.tagInputChangeEvent.bind(this);
		this.addTagEvent = this.addTagEvent.bind(this);
		this.removeTagEvent = this.removeTagEvent.bind(this);
	}

	tagInputChangeEvent(event) {
		if (event.target.value === '') {
			showValidformError($(event.target), '添加标签为空');
		} else {
			const existTags = this.state.tag;
			const index = existTags.indexOf(event.target.value);
			if (index > -1) {
				showValidformError($(event.target), '标签重复');
			} else {
				hideValidformError($(event.target));
			}
		}
		this.setState({
			inputTag: event.target.value
		});
	}

	addTagEvent(event) {
		event.preventDefault();
		const inputTag = this.state.inputTag;
		if (inputTag === '') {
			showValidformError($(event.target), '添加标签为空');
			return;
		}
		const existTags = this.state.tag;
		const index = existTags.indexOf(inputTag);
		if (index > -1) {
			showValidformError($(event.target), '标签已存在');
		} else {
			existTags.push(inputTag);
			this.setState({
				tag: existTags,
				inputTag: ''
			});
		}
	}

	removeTagEvent(event, tag) {
		const existTags = this.state.tag;
		const index = existTags.indexOf(tag);
		if (index > -1) {
			existTags.splice(index, 1);
			this.setState({
				tag: existTags
			});
		}
	}

	initialiseValidform(formObj) {
		return initValidform(formObj, {
			beforeCheck: function (curform) {
				console.log(curform.find('input[name="tag"]'));
				modalAlert({
					title: 'title',
					text: 'beforeCheck',
					type: alertTypes.info
				});
			},
			beforeSubmit: function (curform) {
				modalAlert({
					title: 'title',
					text: 'beforeSubmit',
					type: alertTypes.info,
				});
				return false;
			},
			callback: function (data) {
				console.log('callback');
			}
		});
	}

	initialisePlayer() {
		this.mediaPlayer = mediaPlayer('audio-player', {
			language: 'zh-CN',
			controls: false,
			src: this.state.audio
		});
	}

	initialiseUploader() {
		const audioEditorComponent = this;
		const uploader = fileUploader({
			disableGlobalDnd: true,
			pick: {
				id: '#filePicker',
				innerHTML: '点击按钮选择音频'
			},
			dnd: '#uploader .drop-zone',
			paste: document.body,
			// 只允许选择图片文件。
			accept: {
				title: 'audio',
				extensions: 'mp3',
				mimeTypes: 'audio/*'
			},
			onFileQueued: function (file) {

				let reader = new FileReader();
				let playSource = reader.readAsDataURL($(''));
				audioEditorComponent.setState({
					audio: playSource
				});
			},
			onUploadProgress: function (file, percentage) {

			},
			onUploadSuccess: function (file) {

			},
			onUploadError: function (file) {

			},
			onUploadComplete: function (file) {

			}
		});
		console.log(uploader);
	}

	componentDidMount() {
		this.initialisePlayer();
		this.initialiseUploader();
		this.initialiseValidform($('form'));
	}

	componentWillUnmount() {
		if (this.mediaPlayer) {
			this.mediaPlayer.dispose()
		}
	}

	render() {
		const tagGroup = this.state.tag.map((tag, index) => (
			<button type="button" key={index} className="btn btn-dark btn-sm mb-1"
					onClick={(event) => this.removeTagEvent(event, tag)}>
				{tag}
			</button>
		));
		return (
			<div className="card">
				<div className="card-header bg-dark text-white">
					音频
				</div>
				<div className="card-body">
					<form action="/code/add" method="post" className="form-horizontal">
						<input className="hide" name="id" type="hidden" defaultValue={this.state.id}/>
						<div className="form-group">
							<div className="col-md-12">
								<label className="control-label" htmlFor="name">名称</label>
								<input className="form-control" name="name" type="text" datatype="s1-20"
									   defaultValue={this.state.title}/>
								<div className="info">
									<span className="Validform_checktip"></span>
									<span className="dec">
										<s className="dec1">&#9670;</s>
										<s className="dec2">&#9670;</s>
									</span>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-12">
								<label className="control-label" htmlFor="audio">音频</label>
								<div className="card">
									<div className="card-body p-0">
										<div id="uploader" className="container-fluid" style={{height: "350px"}}>
											<div
												className="drop-zone h-100 d-flex align-items-center justify-content-center">
												<div id="filePicker">
												</div>
												<div className="player-content">
													<video
														id="audio-player"
														className="video-js"
														controls
														preload="auto"
														poster="//vjs.zencdn.net/v/oceans.png"
														data-setup='{}'>
														<p className="vjs-no-js">
															To view this video please enable JavaScript, and consider
															upgrading to a
															web browser that
															<a href="http://videojs.com/html5-video-support/"
															   target="_blank">
																supports HTML5 video
															</a>
														</p>
													</video>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-12">
								<label className="control-label" htmlFor="description">描述</label>
								<textarea className="form-control" id="description" name="description" datatype="*"
										  defaultValue={this.state.description}>
								</textarea>
								<div className="info">
									<span className="Validform_checktip">
									</span>
									<span className="dec">
										<s className="dec1">&#9670;</s>
										<s className="dec2">&#9670;</s>
									</span>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-12">
								<label className="control-label" htmlFor="tag">标签</label>
								<div className="card">
									<div className="card-body">
										<input type="hidden" name="tag" value={this.state.tag}/>
										<div className="btn-group" role="group" aria-label="Basic example">
											{tagGroup}
										</div>
										<div className="input-group">
											<input type="text" className="form-control" placeholder="添加标签"
												   aria-label="Recipient's username"
												   aria-describedby="basic-addon2" value={this.state.inputTag}
												   onChange={this.tagInputChangeEvent}/>
											<div className="input-group-append">
												<button className="btn btn-outline-secondary d-flex align-middle"
														type="button" onClick={this.addTagEvent}>
													<img alt="添加" src={AddIcon} style={{width: '20px'}}/>
												</button>
											</div>
										</div>
										<div className="info">
											<span className="Validform_checktip"></span>
											<span className="dec">
												<s className="dec1">&#9670;</s>
												<s className="dec2">&#9670;</s>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-12 d-flex justify-content-center">
								<button className="btn btn-dark btn-submit" type="submit">保存</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioEditor);