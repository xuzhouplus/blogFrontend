import React from 'react';

class Dependence extends React.Component {
	render() {
		return (
				<div className="container-fluid fixed-bottom border-top pt-2 pb-2 based-on">
					<div className="row justify-content-center">
						<div className="col col-auto">
							<a href="https://reactjs.org/">
								React
							</a>
						</div>
						<div className="col col-auto">
							<a href="http://getbootstrap.com">
								Bootstrap
							</a>
						</div>
						<div className="col col-auto">
							<a href="http://www.jq22.com/jquery-info19046">
								WebGL滑块
							</a>
						</div>
					</div>
				</div>
		);
	}
}

export default Dependence;