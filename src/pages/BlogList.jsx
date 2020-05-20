import React from 'react';
import Masonry from 'masonry-layout';
import BlogComponent from '../components/Blog/BlogBox';
import './BlogList.css';
import ImagesLoaded from "imagesloaded";
import {modalPage} from '../components/Modal/ModalPage';
import Loadable from "react-loadable";
import Loading from "../components/Loading/Loading";

class BlogList extends React.Component {
    constructor(props) {
        super(props);
        let blog = [
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
        this.blog = blog;
        this.boxClickHandler = this.boxClickHandler.bind(this);
        this.BlogPage = Loadable({
            loader: () => import('../components/Blog/BlogPage'),
            loading: Loading
        });
    }

    boxClickHandler(data, event) {
        let BlogPage = this.BlogPage;
        let width = 20;
        if (data.width) {
            width = width * data.width;
        }
        modalPage({
            html: <BlogPage id={data.id}/>,
            showCloseButton: false,
            showConfirmButton: false,
            width: width + '%'
        }).then(r => {
            console.log(r);
        })
    }

    componentDidMount() {
        let elem = document.querySelector('.grid');
        const imageLoaded = ImagesLoaded(elem);
        imageLoaded.on('progress', function (instance, image) {
            new Masonry(elem, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: 10,
                fitWidth: true,
                percentPosition: true
            });
        });
    }


    render() {
        const itemList = this.blog.map((item) => <BlogComponent data={item} key={item.id}
                                                                onClick={this.boxClickHandler}/>)
        return (
            <div className="container-body container blog-content">
                <div className="grid">
                    <div className="grid-sizer">
                    </div>
                    {itemList}
                </div>
            </div>
        );
    }
}

export default BlogList;