import React from 'react';

class TextList extends React.Component {

	render() {
		const listGroup = this.props.list.map((item) => <div className="list-group-item"
															 data-key={item.key}>{item.value}</div>);
		return (
			<ul className="list-group text-list">
				{listGroup}
			</ul>
		);
	}
}

export default TextList;