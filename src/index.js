import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {mapStateToProps} from './redux/MapStateToProps';
import {mapDispatchToProps} from './redux/MapDispatchToProps';
import {userReducer} from "./redux/Reducer";
import thunk from "redux-thunk";

const store = createStore(userReducer,compose(applyMiddleware(thunk),window.devToolsExtens?window.devToolsExtens():f=>f));


//连接组件
const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);


ReactDOM.render(
	<Provider store={store}>
		<AppComponent/>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
