import React from 'react';
import 'bootstrap/dist/js/bootstrap.js'
import Logo from '../../images/Logo/logo.png'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Navibar extends React.Component {
	constructor(props){
		super(props);
		this.loggedIn = (JSON.stringify(this.props.user) === '{}');
	}

	render() {
		return (
			<nav className="top-bar navbar-expand-lg navbar navbar-dark bg-dark fixed-top" role="navigation">
				<NavLink to="/" className="navbar-brand">
					<span className="logo-container">
							<img className="App-logo" alt="logo" src={Logo}/>
					</span>
					<span className="logo-text">xuzhouplus.com.cn</span>
				</NavLink>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="example-navbar-collapse">
					<ul className="navbar-nav">
						<li className="nav-item home">
							<NavLink to="/home" className="nav-link">
								主页
							</NavLink>
						</li>
						<li className="nav-item dropdown article" hidden={this.loggedIn}>
							<NavLink className="nav-link dropdown-toggle" to="/blog" id="navbarDropdown" role="button"
									 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								文章
							</NavLink>
							<div className="dropdown-menu py-0" aria-labelledby="navbarDropdown"
								 style={{overflow: "hidden"}}>
								<NavLink to="/blog/manage" className="dropdown-item"
										 activeClassName="bg-dark text-light">
									管理
								</NavLink>
								<NavLink to="/blog/edit" className="dropdown-item"
										 activeClassName="bg-dark text-light">
									编辑
								</NavLink>
							</div>
						</li>
						<li className="nav-item dropdown article" hidden={!this.loggedIn}>
							<NavLink to="/blog" className="nav-link">
								文章
							</NavLink>
						</li>
						{/*<li className="nav-item activate">*/}
						{/*<NavLink to="/activate" className="nav-link">*/}
						{/*激活*/}
						{/*</NavLink>*/}
						{/*</li>*/}
						<li className="nav-item login" hidden={!this.loggedIn}>
							<NavLink to="/login" className="nav-link">
								登录
							</NavLink>
						</li>
						{/*<li className="nav-item register">*/}
						{/*<NavLink to="/register" className="nav-link">*/}
						{/*注册*/}
						{/*</NavLink>*/}
						{/*</li>*/}
						<li className="nav-item about">
							<NavLink to="/about" className="nav-link">
								关于
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

//映射Redux state到组件的属性
function mapStateToProps(state) {
	return {user: state.user}
}

export default connect(mapStateToProps)(Navibar);
