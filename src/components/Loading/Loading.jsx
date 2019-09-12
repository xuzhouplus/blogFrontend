import React from 'react';
import * as Ladda from 'ladda';

class Loading extends React.Component {
    componentDidMount() {
        this.loader = Ladda.create(document.querySelector('.loading'));
        this.loader.start();
    }

    componentWillUnmount() {
        this.loader.remove();
    }

    render() {
        return (
            <div className="container-fluid loading justify-content-center">
            </div>
        );
    }
}

export default Loading;