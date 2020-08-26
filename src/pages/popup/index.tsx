import React, { Component } from 'react';

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

export default Popup;