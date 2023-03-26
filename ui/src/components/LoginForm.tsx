import * as React from "react";
import {Link, Route} from 'react-router-dom';
import {Button, Form, Header} from "semantic-ui-react";
import autobind from "autobind-decorator";
import {SyntheticEvent} from "react";

type Props = {
    login: Function;
}

type State = {
    login: string;
    password: string;
}

export default class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        }
    }

    @autobind
    private handleChange(event: SyntheticEvent<HTMLInputElement>) {
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        switch (name) {
            case "login": {
                this.setState({
                    login: value
                });
                break;
            }
            case "password": {
                this.setState({
                    password: value
                });
                break;
            }
        }
    }

    render() {
        return (
            <Form onSubmit={() => this.props.login(this.state.login, this.state.password)}>
                <Header dividing>Connexion</Header>
                <Form.Field>
                    <label htmlFor="login">Login</label>
                    <Form.Input type="text" id="login" name="login" placeholder="Email or username" onChange={this.handleChange} required/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <Form.Input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                </Form.Field>
                <Form.Field>
                    <Button type="submit" floated={"right"}>Login</Button>
                    <Button floated={"right"}><Link to='/register'>Register</Link></Button>
                </Form.Field>
            </Form>
        );
    }
}