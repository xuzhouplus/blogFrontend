import React from 'react';
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";

class ArticleEditor extends React.Component {
	render() {
		return (
			<div className="card">
				<div className="card-header bg-dark text-white">
					文章
				</div>
				<div className="card-body">
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);