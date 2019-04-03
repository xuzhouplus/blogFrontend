import React from 'react';

class BlogBox extends React.Component {

	render() {
		return (
			<div className="card grid-item">
				<img className="card-img-top img-fluid" src={this.props.data.thumbnail} alt="Blog Image"/>
				<div className="card-body">
					<h5 className="card-title">{this.props.data.name}</h5>
					<p className="card-text">{this.props.data.note}</p>
				</div>
			</div>
		);
	}
}

export default BlogBox;