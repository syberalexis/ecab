import {RouteComponentProps, RouteProps} from "react-router";
import * as React from "react";


export interface CustomRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    props?: any;
}