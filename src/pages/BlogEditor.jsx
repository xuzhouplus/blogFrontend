import React from 'react';
import Loadable from 'react-loadable';
import Loading from "../components/Loading/Loading";
import SectionType from "../components/Blog/SectionType";
import {connect} from "react-redux";
import {mapStateToProps} from '../redux/MapStateToProps';
import {mapDispatchToProps} from "../redux/MapDispatchToProps";

class BlogEditor extends React.Component {
	componentWillMount() {
		this.sectionTypes = [
			{
				key: 'article',
				value: '文章',
				to: '/blog/edit/article'
			},
			{
				key: 'video',
				value: '视频',
				to: '/blog/edit/video'
			},
			{
				key: 'audio',
				value: '音频',
				to: '/blog/edit/audio'
			},
			{
				key: 'image',
				value: '图片',
				to: '/blog/edit/image'
			},
			{
				key: 'text',
				value: '文本',
				to: '/blog/edit/text'
			},
			{
				key: 'code',
				value: '代码',
				to: '/blog/edit/code'
			}
		];
	}

	componentDidMount() {
	}

	render() {
		let EditorComponent;
		switch (this.props.match.params.type) {
			case 'video':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/VideoEditor'),
					loading: Loading
				});
				break;
			case 'audio':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/AudioEditor'),
					loading: Loading
				});
				break;
			case 'image':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/ImageEditor'),
					loading: Loading
				});
				break;
			case 'text':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/TextEditor'),
					loading: Loading
				});
				break;
			case 'code':
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/CodeEditor'),
					loading: Loading
				});
				break;
			case 'article':
			default:
				EditorComponent = Loadable({
					loader: () => import('../components/Blog/Editor/ArticleEditor'),
					loading: Loading
				});
		}
		return (
			<div className="blog-content">
				<div className="row justify-content-center">
					<div className="col col-3">
						<SectionType sectionTypes={this.sectionTypes} active={this.props.match.params.type}/>
					</div>
					<div className="col col-9 pl-0">
						<EditorComponent/>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);