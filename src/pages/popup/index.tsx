import React, { Component } from 'react';
import ReactDom from 'react-dom';

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
        return <div>react typescript webpack babel</div>
    }
}

ReactDom.render(<Popup />, document.getElementById('root'));