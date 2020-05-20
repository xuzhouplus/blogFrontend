import React from 'react';

class BlogPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        let blogs = [
            {
                id: 1,
                name: "name",
                note: "note",
                thumbnail: '/images/Blog/1.png'
            },
            {
                id: 2,
                name: "name2",
                note: "note2",
                thumbnail: '/images/Blog/2.png',
                width: 2
            },
            {
                id: 3,
                name: "name3",
                note: "note3",
                thumbnail: '/images/Blog/3.png'
            },
            {
                id: 4,
                name: "name4",
                note: "note4",
                thumbnail: '/images/Blog/4.png'
            },
            {
                id: 5,
                name: "name5",
                note: "note5",
                thumbnail: '/images/Blog/5.png',
                width: 3
            },
            {
                id: 6,
                name: "name6",
                note: "note6",
                thumbnail: '/images/Blog/6.png'
            },
            {
                id: 7,
                name: "name7",
                note: "note7",
                thumbnail: '/images/Blog/7.png'
            }
        ];
        for (let blog of blogs) {
            if (blog.id == this.props.id) {
                this.blog = {
                    id: blog.id,
                    title: blog.name,
                    subtitle: blog.name,
                    description: blog.note,
                    tags: ['t', 'e', 's', 't'],
                    thumbnail: blog.thumbnail
                };
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="img-thumbnail">
                    <img className="card-img-top img-fluid" src={this.blog.thumbnail} alt={this.blog.name}/>
                </div>
                <div className="img-description">
                    {this.blog.description}
                </div>
            </div>
        );
    }
}

export default BlogPage;