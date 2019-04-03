import React from 'react';
import * as Ladda from 'ladda';
class Loading extends React.Component{
	componentDidMount() {
		let loader = Ladda.create(document.querySelector('.loading'));
		loader.start();
	}

	render() {
		return (
			<div className="container-fluid loading justify-content-center">
			</div>
		);
	}
}

export default Loading;