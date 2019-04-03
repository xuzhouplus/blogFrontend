import React, {Component} from 'react';

import About from './components/About/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Navibar from "./components/Navibar/Navibar";
import BlogList from "./pages/BlogList";
import Login from "./pages/Login";
import BlogManager from './pages/BlogManager'
import BlogEditor from "./pages/BlogEditor";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
	render() {
		return (
			<Router>
				<Navibar/>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/home" exact component={Home}/>
					<Route path="/blog" exact component={BlogList}/>
					<Route path="/blog/manage" exact component={BlogManager}/>
					<Route path="/blog/edit" exact component={BlogEditor}/>
					<Route path="/blog/edit/:type" component={BlogEditor}/>
					<Route path="/about" component={About}/>
					<Route path="/login" component={Login}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
