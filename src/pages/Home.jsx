import React from 'react';
// import FullPage from 'fullpage.js';
import WebGLCarousel from "../components/Carousel/WebGLCarousel";
// import {Configs} from "../configs/Configs";

class Home extends React.Component {
	componentDidMount() {
		// new FullPage('.container-body', {
		// 	licenseKey: Configs.fullpageLicenseKey,
		// 	loopBottom: true,
		// 	afterRender: function () {
		//
		// 	},
		// 	afterLoad: function (anchorLink, index) {
		//
		// 	}
		// });
	}

	render() {
		return (
			<div className="container-body container-fluid content">
				<WebGLCarousel/>
			</div>
		);
	}
}

export default Home;