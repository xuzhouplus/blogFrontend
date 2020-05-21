import React from 'react';
import WebGLCarousel from "../components/Carousel/WebGLCarousel";
import './Home.css';

class Home extends React.Component {
	render() {
		return (
			<div className="home-content">
				<WebGLCarousel/>
			</div>
		);
	}
}

export default Home;