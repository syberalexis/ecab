import * as React from "react";
import {Redirect, withRouter} from "react-router";

class LogoutPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        this.props.logout();
    }

    render() {
        return (
            <Redirect
                to={{
                    pathname: "/"
                }}
            />
        );
    }
}

export default withRouter(LogoutPage);