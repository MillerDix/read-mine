import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Login from './login/index';

import styles from './index.module.scss';

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
        return <div className={styles.test}>react webasdfpack bdddabel<Login /></div>
    }
}

ReactDom.render(<Popup />, document.getElementById('root'));