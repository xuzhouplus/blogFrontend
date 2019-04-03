import React from 'react';
import SearchIcon from '../../../images/Other/search.png'
import {Link} from "react-router-dom";

class ArticleManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '文章',
			sectionType: 'article'
		};
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="card">
				<div className="card-header bg-dark text-white">
					{this.state.title}
				</div>
				<div className="card-body">
					<div className="container-fluid">
						<div className="row">
							<form className="col-4 pl-0">
								<div className="input-group">
									<input type="text" className="form-control" placeholder="搜索文章"
										   aria-label="Recipient's username" aria-describedby="basic-addon2"/>
									<div className="input-group-append">
										<button className="btn btn-outline-secondary" type="button">
											<img alt="搜索" src={SearchIcon} style={{width:'20px'}}/>
										</button>
									</div>
								</div>
							</form>
							<div className="col-8 d-flex justify-content-end pr-0">
								<Link to="/blog/edit" className="btn btn-dark ml-1">新建</Link>
								<button type="button" className="btn btn-dark ml-1">删除</button>
							</div>
						</div>
						<div className="row">
							<table className="table table-hover mt-3">
								<thead className="thead-dark">
								<tr>
									<th><input type="checkbox" id="blankCheckbox" value="all" aria-label="all"/>标题</th>
									<th>作者</th>
									<th>是否公开</th>
									<th>创建时间</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td colSpan="5">暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ArticleManager;