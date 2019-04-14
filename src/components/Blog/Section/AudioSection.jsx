import React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/MapStateToProps";
import {mapDispatchToProps} from "../../../redux/MapDispatchToProps";

class AudioSection extends React.Component {
	componentDidMount() {
	}

	render() {
		return (
			<div>
				AudioSection<br/>
				{this.props.section}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioSection);