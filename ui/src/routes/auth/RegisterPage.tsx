import * as React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import {Container} from "semantic-ui-react";

export class RegisterPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <RegisterForm register={this.props.register}/>
            </Container>
        );
    }
}