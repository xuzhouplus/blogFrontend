import React from 'react';

class BlogBox extends React.Component {
	render() {
        let gridItemClass = "card grid-item ";
        if (this.props.data.width) {
            gridItemClass = gridItemClass + 'grid-item--width' + this.props.data.width;
        }
        return (
            <div className={gridItemClass}>
                <img className="card-img-top img-fluid" src={this.props.data.thumbnail} alt={this.props.data.name}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.data.name}</h5>
                    <p className="card-text">{this.props.data.note}</p>
                </div>
            </div>
        );
    }
}

export default BlogBox;