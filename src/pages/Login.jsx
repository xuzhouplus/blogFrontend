import React from 'react';
import LoginComponent from '../components/Login/Login';
import './Login.css';

class Login extends React.Component {
	render() {
		return (
			<div className="login-content container d-flex">
				<LoginComponent/>
			</div>
		);
	}
}

export default Login;