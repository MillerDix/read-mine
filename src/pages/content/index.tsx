import React, { Component } from 'react';
import ReactDom from 'react-dom';

interface ContentPropsType {

}

interface ContentStateType {

}

class Content extends Component<ContentPropsType, ContentStateType> {
    constructor(props: ContentPropsType) {
        super(props);
    }

    state: ContentStateType = {};

    render() {
        return (
            <div>react typescript webpack babel -- content page</div>
        );
    }
}

ReactDom.render(<Content />, document.getElementById('root'));