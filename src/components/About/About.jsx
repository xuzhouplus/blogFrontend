import React from 'react';
import './About.css'

class About extends React.Component {
	render() {
		return (
			<div className="section row  justify-content-center about">
				<div className="row align-items-center justify-content-md-center note-info">
					<div className="col col-4">
						<h3>
							<p>&emsp;&emsp;不管怎么说，在里面这几个钟头啊，决定了两人一生的命运，人这一辈子啊有一些情境啊有一些经历啊，真的不知道怎么一些很奇怪的对话就会决定你一生的命运。</p>
							<p>《刘汉臣之死》&nbsp;阎景俞</p>
						</h3>
					</div>
				</div>
				<div className="container-fluid fixed-bottom border-top pt-2 pb-2 base-on">
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
			</div>
		);
	}
}

export default About;