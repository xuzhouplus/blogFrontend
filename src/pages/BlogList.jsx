import React from 'react';
import Masonry from 'masonry-layout';
import BlogComponent from '../components/Blog/BlogBox';
import './BlogList.css';
import ImagesLoaded from "imagesloaded";
import {modalPage} from '../components/Modal/ModalPage';
import Loadable from "react-loadable";
import Loading from "../components/Loading/Loading";

class BlogList extends React.Component {
	constructor(props) {
		super(props);
		let blog = [
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
		this.blog = blog;
		this.boxClickHandler = this.boxClickHandler.bind(this);
		this.BlogPage = Loadable({
			loader: () => import('../components/Blog/BlogPage'),
			loading: Loading
		});
	}

	boxClickHandler(data, event) {
		let BlogPage = this.BlogPage;
		let width = 20;
		if (data.width) {
			width = width * data.width;
		}
		modalPage({
			html: <BlogPage id={data.id}/>,
			showCloseButton: false,
			showConfirmButton: false,
			width: width + '%'
		}).then(r => {
			console.log(r);
		})
	}

	componentDidMount() {
		let elem = document.querySelector('.grid');
		const imageLoaded = ImagesLoaded(elem);
		imageLoaded.on('progress', function (instance, image) {
			new Masonry(elem, {
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				gutter: 15,
				fitWidth: true,
				percentPosition: true
			});
		});
	}


	render() {
		const itemList = this.blog.map((item) => <BlogComponent data={item} key={item.id}
																onClick={this.boxClickHandler}/>)
		return (
			<div className="container-body container blog-content">
				<div className="grid">
					<div className="grid-sizer">
					</div>
					{itemList}
				</div>
			</div>
		);
	}
}

export default BlogList;