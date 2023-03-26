import * as React from "react";
import {Redirect, Route} from "react-router";
import {CustomRoute} from "./CustomRoute";
import {LoggedRouteProps} from "./LoggedRouteProps";

/**
 * Route to render a ComponentPage that requires registration
 *
 * @param logged
 * @param redirect
 * @param Component
 * @param rest
 * @constructor
 */
export class LoggedRoute extends CustomRoute<LoggedRouteProps> {
    constructor(props: LoggedRouteProps) {
        super(props);
    }

    render() {
        return this.props.logged ? (
            <CustomRoute {...this.props} component={this.props.component} />
        ) : (
            <Route
                render={props =>
                    <Redirect
                        to={{
                            pathname: this.props.redirect,
                            state: { from: this.props.location }
                        }}
                    />
                }
            />
        );
    }
}