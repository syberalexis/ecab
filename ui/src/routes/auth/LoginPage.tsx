import * as React from "react";
import {withRouter} from "react-router-dom";
import {Container} from "semantic-ui-react";
import LoginForm from "../../components/forms/LoginForm";

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Container>
                <LoginForm login={this.props.login}/>
            </Container>
        );
    }
}

export default withRouter(LoginPage);