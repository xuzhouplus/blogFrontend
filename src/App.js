import React, {Component, lazy, Suspense} from 'react';

import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import Navibar from './components/Navibar/Navibar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from "./components/Loading/Loading";

class App extends Component {
	render() {
		const Home = lazy(() => import('./pages/Home'));
		const BlogList = lazy(() => import('./pages/BlogList'));
		const BlogManager = lazy(() => import('./pages/BlogManager'));
		const BlogEditor = lazy(() => import('./pages/BlogEditor'));
		const About = lazy(() => import('./pages/About'));
		const Login = lazy(() => import('./pages/Login'));
		return (
			<Router>
				<Navibar/>
				<div className="container-body container-fluid">
					<Switch>
						<Suspense fallback={<Loading/>}>
							<Route path="/" exact component={Home}/>
							<Route path="/home" exact component={Home}/>
							<Route path="/blog" exact component={BlogList}/>
							<Route path="/blog/manage" exact component={BlogManager}/>
							<Route path="/blog/edit" exact component={BlogEditor}/>
							<Route path="/blog/edit/:type" component={BlogEditor}/>
							<Route path="/about" component={About}/>
							<Route path="/login" component={Login}/>
						</Suspense>
					</Switch>
				</div>
				<div className="row justify-content-center fixed-bottom navbar navbar-dark bg-dark">
					<ul className="navbar-nav">
						<li className="nav-item home">
							<a href="http://www.beian.miit.gov.cn/" target="_blank"
							   className="nav-link">蜀ICP备18021274号</a>
						</li>
					</ul>
				</div>
			</Router>
		);
	}
}

export default App;
