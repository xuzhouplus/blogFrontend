import React from 'react';
import Portrait from '../../images/About/default.jpeg';
import Logo from '../../images/Logo/logo.png'
import Background from '../../images/Background/background.jpg'

class About extends React.Component {
	render() {
		return (
			<div className="section row  justify-content-center about">
				{/*<div className="row align-items-center justify-content-md-center">*/}
				{/*<div className="col col-4 picture">*/}
				{/*<img src={Portrait} width="300px"/>*/}
				{/*<iframe frameBorder="no" border="0" marginWidth="0" marginHeight="0" width="3*/}
				{/*00" height="50"*/}
				{/*src="//music.163.com/outchain/player?type=2&id=1342327438&auto=0&height=32"></iframe>*/}
				{/*</div>*/}
				{/*<div className="col col-4 note">*/}
				{/*<h3>*/}
				{/*<p>&emsp;&emsp;不管怎么说，在里面这几个钟头啊，决定了两人一生的命运，人这一辈子啊有一些情境啊有一些经历啊，真的不知道怎么一些很奇怪的对话就会决定你一生的命运。</p>*/}
				{/*<p className="justify-content-start">《刘汉臣之死》&nbsp;阎景俞</p>*/}
				{/*</h3>*/}
				{/*</div>*/}
				{/*</div>*/}
				<div>
					<img alt="background" src={Background}/>
				</div>
				<div className="container-fluid fixed-bottom border-top pt-2 pb-2">
					<div className="row justify-content-center">
						<div className="col col-auto">
							<a href="https://laravel.com/">
								<span className="logo-container">
									<img
										src="https://iocaffcdn.phphub.org//uploads/communities/WtC3cPLHzMbKRSZnagU9.png"/>
								</span>
								Laravel
							</a>
						</div>
						<div className="col col-auto">
							<a href="http://www.jq22.com/jquery-info19046">
								<span className="logo-container">
									<img src="http://www.jq22.com/img/logo.png"/>
								</span>
								WebGL滑块
							</a>
						</div>
						<div className="col col-auto">
							<a href="http://getbootstrap.com">
								<span className="logo-container">
									<img
										src="https://camo.githubusercontent.com/a5f1061fb7cedc496c697e46448c39a1e6540184/68747470733a2f2f676574626f6f7473747261702e636f6d2f646f63732f342e332f6173736574732f6272616e642f626f6f7473747261702d736f6c69642e737667"/>
								</span>
								Bootstrap
							</a>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col col-auto">
							<a href="/">xuzhouplus.com.cn</a>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col col-auto">
							<a href="http://www.miibeian.gov.cn">蜀ICP备18021274号</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;