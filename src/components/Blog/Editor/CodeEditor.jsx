import React from 'react';
import $ from 'jquery';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/theme/idea.css';
import {hideValidformError, initValidform, showValidformError} from '../../Validform/validform';
import '../../Validform/validformStyle.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import './CodeMirrorFullpage.css';
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";
import {alertTypes, modalAlert} from "../../Modal/ModalAlert";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faCloudUploadAlt} from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			title: '示例代码',
			code: 'console.log("code editor")',
			codeType: 'JavaScript',
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

	renderCodeMirror() {
		let codeEditorComponent = this;
		let codeEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			scrollbarStyle: 'simple',
			mode: {name: this.codeTypes[this.state.codeType], globalVars: true},
			theme: 'idea',
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"F11": function (cm) {
					$(cm.getInputField()).closest('.card').toggleClass('full-screen');
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function (cm) {
					if (cm.getOption("fullScreen")) {
						$(cm.getInputField()).closest('.card').removeClass('full-screen');
						cm.setOption("fullScreen", false);
					}
				}
			}
		});
		$('.full-screen-button').on('click', function () {
			$(this).closest('.card').toggleClass('full-screen');
			codeEditor.setOption("fullScreen", !codeEditor.getOption("fullScreen"));
		});
		$('.codeType').on('click', 'a[role="menuitem"]', function () {
			let modelName = $(this).attr('model');
			codeEditorComponent.setState({codeType: modelName});
		});
		codeEditor.on('focus', function () {
			$('.CodeMirror').css('background-color', '');
		});
		codeEditor.on('blur', function () {
			// result = validform.check(false, $('textarea[name="code"]'));
			// if (!result) {
			// 	$('.CodeMirror').css('background-color', '#ffe7e7');
			// }
		});
		this.codeEditor = codeEditor;
	}

	changeModel(mode) {
		this.codeEditor.setOption('mode', this.codeTypes[mode]);
	}

	codeChangeEvent() {
	}

	componentWillMount() {
		this.codeTypes = {
			"JavaScript": "javascript",
			"C++": "clike",
			"PHP": "php",
			"GO": "go",
			"Python": "python",
			"VUE": "vue",
			"SQL": "sql",
			"HTML": "htmlmixed",
			"XML": "xml",
			"CSS": "css",
		};
	}

	componentDidMount() {
		this.renderCodeMirror();
		this.initialiseValidform($('form'));
		if (JSON.stringify(this.props.user) === '{}') {
			this.props.setUser({
				id: 1,
				username: 'xuzhou',
				email: 'xuzhouplus@gmail.com'
			});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.changeModel(this.state.codeType)
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
					代码
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
								<label className="control-label" htmlFor="code">代码</label>
								<div className="card">
									<div className="card-header bg-dark p-0">
										<div className="row">
											<div className="dropdown col-6 codeType">
												<input name="codeType" type="hidden"
													   value={this.state.codeType} datatype="*"
													   nullmsg="请选择代码语言"/>
												<a href="#" className="btn dropdown-toggle text-light"
												   id="dropdownMenu1"
												   data-toggle="dropdown">
													<span className="text">{this.state.codeType}</span>
													<span className="caret"></span>
												</a>
												<ul className="dropdown-menu p-0" role="menu"
													aria-labelledby="dropdownMenu1">
													<li className="dropdown-item" role="presentation">
														<a className="non-text-decoration" role="menuitem"
														   tabIndex="-1"
														   href="javascript:void(0);"
														   model="Java">Java</a>
													</li>
													<li className="dropdown-item" role="presentation">
														<a className="non-text-decoration" role="menuitem"
														   tabIndex="-1"
														   href="javascript:void(0);"
														   model="JavaScript">JavaScript</a>
													</li>
													<li className="dropdown-item" role="presentation">
														<a className="non-text-decoration" role="menuitem"
														   tabIndex="-1"
														   href="javascript:void(0);"
														   model="C++">C++</a>
													</li>
													<li className="dropdown-item" role="presentation">
														<a className="non-text-decoration" role="menuitem"
														   tabIndex="-1"
														   href="javascript:void(0);"
														   model="PHP">PHP</a>
													</li>
												</ul>
												<div className="info">
													<span className="Validform_checktip"></span>
													<span className="dec">
														<s className="dec1">&#9670;</s>
														<s className="dec2">&#9670;</s>
													</span>
												</div>
											</div>
											<div className="text-right col-md-6 operateBar">
												<a href="javascript:void(0);"
												   className="btn text-light upload-code-button"
												   title="上传">
													<FontAwesomeIcon icon={faCloudUploadAlt}/>
												</a>
												<a href="javascript:void(0);"
												   className="btn text-light import-code-button"
												   title="导入">
													<FontAwesomeIcon icon={faFileImport}/>
												</a>
												<a href="javascript:void(0);"
												   className="btn text-light full-screen-button"
												   title="全屏">
													<FontAwesomeIcon icon={faExpandArrowsAlt}/>
												</a>
											</div>
										</div>
									</div>
									<div className="card-body p-0">
										<textarea id="code" name="code" datatype="*" value={this.state.code}
												  onChange={this.codeChangeEvent}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);