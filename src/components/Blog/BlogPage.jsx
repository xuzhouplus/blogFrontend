import React from 'react';
import './BlogPage.css';

class BlogPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		let blogs = [
			{
				id: 1,
				note: "故宫",
				thumbnail: '/images/Blog/1.png'
			},
			{
				id: 2,
				note: "故宫",
				thumbnail: '/images/Blog/2.png'
			},
			{
				id: 3,
				note: "峨眉山",
				thumbnail: '/images/Blog/3.png'
			},
			{
				id: 4,
				note: "洪崖洞",
				thumbnail: '/images/Blog/4.png'
			},
			{
				id: 5,
				note: "阆中古城",
				thumbnail: '/images/Blog/5.png',
				width: 3
			},
			{
				id: 6,
				note: "峨眉山",
				thumbnail: '/images/Blog/6.png'
			},
			{
				id: 7,
				note: "峨眉山",
				thumbnail: '/images/Blog/7.png'
			},
			{
				id: 8,
				note: "毕棚沟",
				thumbnail: '/images/Blog/bipenggou.jpg',
				width: 3
			},
			{
				id: 9,
				note: "赤水",
				thumbnail: '/images/Blog/chishui.jpeg'
			},
			{
				id: 10,
				note: "都江堰",
				thumbnail: '/images/Blog/dujiangyan.jpeg'
			},
			{
				id: 11,
				note: "黄龙溪",
				thumbnail: '/images/Blog/huanglongxi.jpeg'
			},
			{
				id: 12,
				note: "华山",
				thumbnail: '/images/Blog/huashan.jpeg'
			},
			{
				id: 13,
				note: "街子古镇",
				thumbnail: '/images/Blog/jieziguzhen.jpeg'
			},
			{
				id: 14,
				note: "遂宁",
				thumbnail: '/images/Blog/suining.jpg',
				width: 3
			},
			{
				id: 15,
				note: "天安门",
				thumbnail: '/images/Blog/tiananmen.jpeg'
			},
			{
				id: 16,
				note: "西安",
				thumbnail: '/images/Blog/xian.jpeg'
			}
		];
		for (let blog of blogs) {
			if (blog.id == this.props.id) {
				this.blog = {
					id: blog.id,
					title: blog.name,
					subtitle: blog.name,
					description: blog.note,
					tags: ['t', 'e', 's', 't'],
					thumbnail: blog.thumbnail
				};
				break;
			}
		}
	}

	render() {
		return (
			<div>
				<div className="img-thumbnail">
					<img className="card-img-top img-fluid" src={this.blog.thumbnail} alt={this.blog.name}/>
				</div>
				<div className="img-description">
					{this.blog.description}
				</div>
			</div>
		);
	}
}

export default BlogPage;