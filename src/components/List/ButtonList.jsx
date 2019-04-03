import React from 'react';
import {Link} from "react-router-dom";

class ButtonList extends React.Component {
	render() {
		const buttonGroup = this.props.list.map((item) => <Link to={item.url}
																className="btn btn-secondary"
																data-key={item.key}>{item.value}</Link>);
		return (
			<div className="btn-group-vertical w-100">
				{buttonGroup}
			</div>
		);
	}
}

export default ButtonList;