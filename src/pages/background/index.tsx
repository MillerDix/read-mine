import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Login from './login/index';

interface BackgroundPropsType {

}

interface BackgroundStateType {

}

class Background extends Component<BackgroundPropsType, BackgroundStateType> {
    constructor(props: BackgroundPropsType) {
        super(props);
    }

    state: BackgroundStateType = {};

    componentDidMount() {
        console.log('background has the floor');
    }

    render() {
        return (
            <div>
                background has the floor
                <Login />
            </div>
        );
    }
}

ReactDOM.render(<Background />, document.getElementById('root'));