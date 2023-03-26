import * as React from "react";
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react";

type Props = {
    logged: boolean;
}

export class MenuBar extends React.Component<Props> {
    private isActive(page: string) {
        return location.hash.indexOf(page) > 0;
    }

    render() {
        return (
            <Menu inverted fixed={"top"}>
                <Link to="/"><Menu.Item header>Conquade</Menu.Item></Link>
                <Menu.Menu position="right">
                    {this.props.logged ? [
                        <Link key={"home"} to="/home"><Menu.Item active={this.isActive("home")}>Home</Menu.Item></Link>,
                        <Link key={"contest"} to="/contests"><Menu.Item active={this.isActive("contests")}>Contests</Menu.Item></Link>,
                        <Link key={"logout"} to="/logout"><Menu.Item active={this.isActive("logout")}>Logout</Menu.Item></Link>
                    ] : [
                        <Link key={"register"} to="/register"><Menu.Item active={this.isActive("register")}>Register</Menu.Item></Link>,
                        <Link key={"login"} to="/login"><Menu.Item active={this.isActive("login")}>Login</Menu.Item></Link>
                    ]}
                </Menu.Menu>
            </Menu>
        );
    }
}
