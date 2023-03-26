import {CustomRouteProps} from "./CustomRouteProps";

export interface LoggedRouteProps extends CustomRouteProps {
    redirect: string;
    logged: boolean;
}