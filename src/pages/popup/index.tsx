import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Login from './login/index';

interface PopupProps {

}

interface PopupState {

}

class Popup extends Component<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props);
    }

    state: PopupState = {};

    render() {
        return <div>react webasdfpack bdddabel<Login /></div>
    }
}

ReactDom.render(<Popup />, document.getElementById('root'));