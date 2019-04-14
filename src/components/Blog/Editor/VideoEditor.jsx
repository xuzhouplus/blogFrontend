import React from 'react';
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";
import {hideValidformError, initValidform, showValidformError} from "../../Validform/validform";
import $ from "jquery";
import {alertTypes, modalAlert} from "../../Modal/ModalAlert";
import {fileUploader} from "../../FileUploader/FileUploader";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt} from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";
import cloudUploadSvg from "../../../images/Other/cloud-upload-alt-solid.svg";

class VideoEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			title: '示例代码',
			video: '',
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

	initialiseUploader() {
		fileUploader('#upload-video-input', {
			language: 'zh',
			uploadUrl: '',
			allowedFileExtensions: ['mp4'],
			showUpload: false, //是否显示上传按钮
			showCaption: false,
			showCancel: false,
			showClose: false,
			minFileCount: 1,
			maxFileCount: 1,
			maxFileSize: 20*1024,
			autoReplace: false,
			browseLabel: '',
			browseIcon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-upload-alt" class="svg-inline--fa fa-cloud-upload-alt fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path></svg>',
			theme: 'explorer-fas',
			required: true,
			layoutTemplates: {
				main1: '<div class="card">' +
					'<div class="card-header">' +
					'' +
					'</div>' +
					'<div class="card-body">' +
					'{preview}' +
					'<div class="kv-upload-progress hide"></div>' +
					'{remove}{cancel}{upload}{browse}' +
					'</div>' +
					'</div>',
				main2: '<div class="card">' +
					'<div class="card-header  bg-dark p-0">' +
					'<div class="row">' +
					'<div class="text-right col-md-12 operateBar">' +
					'{browse}' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="card-body p-0">' +
					'{preview}' +
					'<div class="kv-upload-progress hide"></div>' +
					'</div>' +
					'</div>',
				preview: '<div class="file-preview {class}">' +
					'<div class="file-preview-thumbnails">' +
					'</div>' +
					'</div>'
			},
			previewClass: 'file-video d-block p-0',
			previewSettings: {
				video: {width: '100%', height: '400px'}
			},
			previewTemplates: {
				video: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" title="{caption}">\n' +
					'   <div class="kv-file-content">' +
					'       <video class="kv-preview-data file-preview-video" controls {style}>\n' +
					'           <source src="{data}" type="{type}">' +
					'       </video>\n' +
					'   </div>\n' +
					'</div>\n'
			}
		});
	}

	componentDidMount() {
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
					视频
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
								<label className="control-label" htmlFor="audio">视频</label>
								<input type="file" id="upload-video-input" className="btn btn-dark" title="上传"/>
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
												<button className="btn btn-dark d-flex align-middle"
														type="button" onClick={this.addTagEvent}>
													<FontAwesomeIcon icon={faPlus}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditor);