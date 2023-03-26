import * as React from "react";
import {Button, Form, Header} from "semantic-ui-react";
import {SyntheticEvent} from "react";
import autobind from "autobind-decorator";
import {User} from "../../model/User";

type Props = {
    register: Function;
}

type State = {
    user: User;
    errored: Array<string>
}

export default class RegisterForm extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            user: {
                id: -1,
                username: "",
                firstname: "",
                fullname: "",
                mail: "",
                phone: "",
                password: ""
            },
            errored: []
        };
    }

    @autobind
    private handleChange(event: SyntheticEvent<HTMLInputElement>): any {

    }

    @autobind
    private register(): any {
        this.props.register(this.state.user)
    }

    render() {
        return (
            <Form onSubmit={() => this.register()}>
                <Header dividing>Inscription</Header>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <Form.Input type="email" id="email" name="mail" placeholder="Email" onChange={this.handleChange} required/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="username">Username</label>
                    <Form.Input type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange} required/>
                </Form.Field>
                <Form.Group widths={"equal"}>
                    <Form.Field>
                        <label htmlFor="password">Password</label>
                        <Form.Input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="passwordConfirm">Confirmation</label>
                        <Form.Input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmation" onChange={this.handleChange} required/>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths={"equal"}>
                    <Form.Field>
                        <label htmlFor="fullname">Fullname</label>
                        <Form.Input type="text" id="fullname" name="fullname" placeholder="Fullname" onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="firstname">Firstname</label>
                        <Form.Input type="text" id="firstname" name="firstname" placeholder="Firstname" onChange={this.handleChange} required/>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label htmlFor="phone">Phone</label>
                    <Form.Input type="text" id="phone" name="phone" placeholder="Phone" onChange={this.handleChange} required/>
                </Form.Field>
                <Form.Field>
                    <Button type="submit" className="ui right floated button">Register</Button>
                </Form.Field>
            </Form>
        );
    }
}