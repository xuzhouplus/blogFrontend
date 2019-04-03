import React from 'react';
import LinkList from "../List/LinkList";
class SectionType extends React.Component{
	render() {
		return (
			<div className="card">
				<div className="card-header bg-dark text-white">
					类型
				</div>
				<div className="card-body">
					<LinkList list={this.props.sectionTypes} active={this.props.active}/>
				</div>
			</div>
		);
	}
}

export default SectionType;