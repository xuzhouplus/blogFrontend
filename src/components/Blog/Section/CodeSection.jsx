import React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";

class CodeSection extends React.Component {
	componentDidMount() {
	}

	render() {
		return (
			<div>
				CodeSection<br/>
				{JSON.stringify(this.props.section)}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeSection);