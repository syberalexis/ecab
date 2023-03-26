import * as React from "react";
import autobind from "autobind-decorator";
import {Button, Container, Form, Input, Message, Segment} from "semantic-ui-react";
import {User} from "../../model/User";
import {SyntheticEvent} from "react";
import {UserService} from "../../services/UserService";

type Props = {
    user: User;
}

type State = {
    user: User;
    password: string;
    passwordIsOk: boolean;
}

export class AccountPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: this.props.user,
            password: "",
            passwordIsOk: false
        }
    }

    @autobind
    private handleChange(event: SyntheticEvent<HTMLInputElement>) {
        this.setState({password: event.currentTarget.value});
    }

    @autobind
    private confirmPassword(event: SyntheticEvent<HTMLInputElement>) {
        this.setState({passwordIsOk: event.currentTarget.value === this.state.password});
    }

    @autobind
    private changePassword(): any {
        if (this.state.passwordIsOk) {
            new UserService().changePassword().then(() => {

            }).catch(() => {

            });
        }
    }

    render() {
        return (
            <Container>
                <Segment vertical>
                    <Button content={"Back"} icon={"angle left"} labelPosition={"left"} onClick={() => history.back()}/>
                </Segment>
                <Form onSubmit={() => this.changePassword}>
                    <Form.Field>
                        <label htmlFor="password">Password</label>
                        <Input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="passwordConfirm">Confirmation</label>
                        <Input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmation" required
                               onChange={this.confirmPassword} error={this.state.password != "" && !this.state.passwordIsOk}/>
                    </Form.Field>
                    <Button type={"submit"} floated={"right"}>Register</Button>
                </Form>
            </Container>
        );
    }
}