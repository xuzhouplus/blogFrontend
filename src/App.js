import React, {Component} from 'react';

import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import Navibar from './components/Navibar/Navibar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Loadable from "react-loadable";
import Loading from "./components/Loading/Loading";

class App extends Component {
    render() {
        const Home = Loadable({
            loader: () => import('./pages/Home'),
            loading: Loading
        });
        const BlogList = Loadable({
            loader: () => import('./pages/BlogList'),
            loading: Loading
        });
        const BlogManager = Loadable({
            loader: () => import('./pages/BlogManager'),
            loading: Loading
        });
        const BlogEditor = Loadable({
            loader: () => import('./pages/BlogEditor'),
            loading: Loading
        });
        const About = Loadable({
            loader: () => import('./components/About/About'),
            loading: Loading
        });
        const Login = Loadable({
            loader: () => import('./pages/Login'),
            loading: Loading
        });
        return (
            <Router>
                <Navibar/>
                <div className="container-body container-fluid">
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
