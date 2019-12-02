import React from 'react';

class BlogPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.blog = {
			id: this.props.id,
			title: 'title',
			subtitle: 'subtitle',
			description: 'description',
			tags: ['t', 'e', 's', 't'],
			thumbnail: '/images/Blog/7.png'
		};
	}

	render() {
		return (
			<div>
				<img className="card-img-top img-fluid" src={this.blog.thumbnail} alt={this.blog.name}/>
				{this.blog.id}
			</div>
		);
	}
}

export default BlogPage;