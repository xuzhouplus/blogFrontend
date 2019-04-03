import React from 'react';
import Masonry from 'masonry-layout';
import BlogComponent from '../components/Blog/BlogBox';
import './BlogList.css';
import ImagesLoaded from "imagesloaded";

class BlogList extends React.Component {
	componentWillMount() {
		let blog = [
			{
				id: 1,
				name: "name",
				note: "note",
				thumbnail: '/images/Blog/1.png'
			},
			{
				id: 2,
				name: "name2",
				note: "note2",
				thumbnail: '/images/Blog/2.png'
			},
			{
				id: 3,
				name: "name3",
				note: "note3",
				thumbnail: '/images/Blog/3.png'
			},
			{
				id: 4,
				name: "name4",
				note: "note4",
				thumbnail: '/images/Blog/4.png'
			},
			{
				id: 5,
				name: "name5",
				note: "note5",
				thumbnail: '/images/Blog/5.png'
			},
			{
				id: 6,
				name: "name6",
				note: "note6",
				thumbnail: '/images/Blog/6.png'
			},
			{
				id: 7,
				name: "name7",
				note: "note7",
				thumbnail: '/images/Blog/7.png'
			}
		];
		this.blog = blog;
	}

	componentDidMount() {
		let elem = document.querySelector('.grid');
		ImagesLoaded(elem, function () {
			new Masonry(elem, {
				itemSelector: '.grid-item',
				columnWidth: 200,
				gutter: 10,
				fitWidth: true
			})
		});
	}

	render() {
		const itemList = this.blog.map((item) => <BlogComponent data={item} key={item.id}/>)
		return (
			<div className="container-body container blog-content">
				<div className="grid">
					{itemList}
				</div>
			</div>
		);
	}
}

export default BlogList;