import * as React from "react";
import {Route} from "react-router";
import {CustomRouteProps} from "./CustomRouteProps";

/**
 * Route with props to set the rendered component props
 *
 * @param Component
 * @param rest
 * @param props
 * @constructor
 */

export class CustomRoute<T extends CustomRouteProps = CustomRouteProps> extends React.Component<T, any> {
    constructor(props: T) {
        super(props);
    }

    render() {
        const {component: Component, ...rest}: CustomRouteProps = this.props; // Indispensable pour faire fonctionner le render
        return (
            <Route
                location={this.props.location}
                path={this.props.path}
                exact={this.props.exact}
                sensitive={this.props.sensitive}
                strict={this.props.strict}
                render={(routeComponentProps) => <Component {...rest.props} {...routeComponentProps}/>}
            />
        );
    }
}