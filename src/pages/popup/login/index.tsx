import React, { Component } from 'react';

interface LoginPropsType {

}

interface LoginStateType {

}

class Login extends Component<LoginPropsType, LoginStateType> {
    constructor(props: LoginPropsType) {
        super(props);
    }

    state: LoginStateType = {};

    render() {
        return (
            <div style={{ color: 'red '}}>react typescript webpack babel -- sub background Component named login</div>
        );
    }
}

export default Login;