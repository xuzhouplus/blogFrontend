import React from 'react';
import {NavLink} from "react-router-dom";
import './LinkList.css'

class LinkList extends React.Component {

	render() {
		const listGroup = this.props.list.map((item) => {
			let liClassName = "nav-item list-group-item";
			let linkClassName = "d-flex text-secondary";
			if (item.key === this.props.active) {
				liClassName = liClassName + " bg-dark";
				linkClassName = "d-flex text-light";
			}
			return (
				<li className={liClassName} key={item.key} data-key={item.key}>
					<NavLink exact to={item.to ? item.to : '/'} className={linkClassName}>{item.value}</NavLink>
				</li>);
		});
		return (
			<ul className="nav list-group link-list">
				{listGroup}
			</ul>
		);
	}
}

export default LinkList;