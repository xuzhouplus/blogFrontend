import React from 'react';
import Loadable from 'react-loadable';
import Loading from "../components/Loading/Loading";
import SectionType from "../components/Blog/SectionType";

class BlogManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sectionType: 'blog'
		};
	}

	componentWillMount() {
		const sectionTypes = [
			{
				key: 'article',
				value: '文章'
			},
			{
				key: 'video',
				value: '视频'
			},
			{
				key: 'audio',
				value: '音频'
			},
			{
				key: 'image',
				value: '图片'
			},
			{
				key: 'text',
				value: '文本'
			},
			{
				key: 'code',
				value: '代码'
			}
		];
		this.sectionTypes = sectionTypes;
		this.sectionType = 'article';
	}

	render() {
		let EditorComponent;
		switch (this.sectionType) {
			case 'video':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
				break;
			case 'audio':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
				break;
			case 'image':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
				break;
			case 'text':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
				break;
			case 'code':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
				break;
			case 'article':
			default:
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Manager/ArticleManager'),
					loading: Loading
				});
		}
		return (
			<div className="container-body container blog-content">
				<div className="row justify-content-center">
					<div className="col col-3">
						<SectionType sectionTypes={this.sectionTypes}/>
					</div>
					<div className="col col-9 pl-0">
						<EditorComponent/>
					</div>
				</div>
			</div>
		);
	}
}

export default BlogManager;