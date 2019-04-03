import React from 'react';
import LoginComponent from '../components/Login/Login';

class Login extends React.Component {
	render() {
		return (
			<div className="container-body container login-content">
				<LoginComponent/>
			</div>
		);
	}
}

export default Login;