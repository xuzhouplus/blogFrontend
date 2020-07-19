import React from 'react';
import fullpage from 'fullpage.js';
import {Configs} from '../configs/Configs';
import Message from '../components/About/Message';
import Dependence from '../components/About/Dependence';
import Introduction from '../components/About/Introduction';
import './About.css'

class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullPageInstance: null
		};
	}

	componentDidMount() {
		const fullPageInstance = new fullpage('#fullpage', {
			licenseKey: Configs.fullpageLicenseKey,
			navigation: true,
		});
		this.setState({
			'fullPageInstance': fullPageInstance
		});
	}

	componentWillUnmount() {
		if (this.state.fullPageInstance) {
			this.state.fullPageInstance.destroy(true);
		}
	}

	render() {
		return (
			<div className="container-fluid justify-content-center h-100 about" id="fullpage">
				<div className="section">
					<Message/>
					<Dependence/>
				</div>
				<div className="section">
					<Introduction></Introduction>
				</div>
			</div>
		);
	}
}

export default About;