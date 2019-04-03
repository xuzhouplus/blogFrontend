import React from 'react';
import * as Ladda from 'ladda';
import swal from 'sweetalert2';
import $ from 'jquery';
import {initValidform} from '../Validform/validform';
import '../Validform/validformStyle.css';
import './Login.css';
import {alertTypes, modalAlert} from "../Modal/ModalAlert";

class Login extends React.Component {
	sendMail(id, token) {
		$.ajax({
			url: '/user/mail',
			type: 'post',
			data: '_token=' + token + '&id=' + id,
			dataType: 'json',
			success: function (res) {
				console.log(res);
				if (res.code === 200) {
					swal({
						title: '',
						text: '我们已经向注册邮箱\n' + res.result + '\n发送激活邮件，\n请登录邮箱完成激活',
						allowEscapeKey: false,
						type: 'success',
						closeOnCancel: true,
						closeOnConfirm: true
					});
				} else {
					swal({
						title: '',
						text: '发送邮件失败，请稍候重试',
						allowEscapeKey: false,
						type: 'error',
						closeOnCancel: true,
						closeOnConfirm: true
					});
				}
			},
			error: function () {
				swal({
					title: '',
					text: '发送邮件失败，请稍候重试',
					allowEscapeKey: false,
					type: 'error',
					closeOnCancel: true,
					closeOnConfirm: true
				});
			}
		});
	}

	initialValidform(formObj) {
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
		})
	}

	componentDidMount() {
		let loader = Ladda.create(document.querySelector('.ladda-button'))
		var validform = this.initialValidform($('form'));
	}

	render() {
		return (
			<div className="row justify-content-center align-items-center align-middle">
				<div className="col-6">
					<div className="card">
						<div className="card-header bg-dark text-white">
							登录
						</div>
						<div className="card-body">
							<form action="/user/login" className="form-horizontal" method="post">
								<div className="col-12">
									<div className="form-group">
										<label className="control-label" htmlFor="username">邮箱</label>
										<input className="form-control" name="username" type="email" datatype="e"
											   id="email"/>
										<div className="info">
											<span className="Validform_checktip"></span>
											<span className="dec">
												<s className="dec1">&#9670;</s>
												<s className="dec2">&#9670;</s>
											</span>
										</div>
									</div>
									<div className="form-group">
										<label className="control-label" htmlFor="password">密码</label>
										<input className="form-control" name="password" type="password" datatype="*"
											   id="password"/>
										<div className="info">
											<span className="Validform_checktip"></span>
											<span className="dec">
												<s className="dec1">&#9670;</s>
												<s className="dec2">&#9670;</s>
											</span>
										</div>
									</div>
									<div className="form-group d-flex justify-content-center">
										<button
											className="col-4 btn btn-dark btn-submit ladda-button"
											data-style="slide-up" data-spinner-color="black">
											<span className="ladda-label">登录</span></button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;