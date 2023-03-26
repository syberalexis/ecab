import * as React from "react";
import {Route, Switch, withRouter} from "react-router";
import {IntlProvider} from 'react-intl';
import {User} from "../../model/User";
import {MenuBar} from "../../components/menu/MenuBar";
import {LoggedRoute} from "../../utils/router/LoggedRoute";
import {IndexPage} from "./IndexPage";
import {CustomRoute} from "../../utils/router/CustomRoute";
import {RegisterPage} from "../auth/RegisterPage";
import LoginPage from "../auth/LoginPage";
import {HomePage} from "./HomePage";
import {ContestsPage} from "../contest/ContestsPage";
import {AccountPage} from "../user/AccountPage";
import LogoutPage from "../auth/LogoutPage";
import {ContestPage} from "../contest/ContestPage";
import {Container} from "semantic-ui-react";
import {UserService} from "../../services/UserService";
import AuthService from "../../services/AuthService";
import autobind from "autobind-decorator";

type Props = {
    language?: string;
    messages: any; // TODO trouver le type !
    history: any;
}

type State = {
    token: string;
    user: User;
    language: string;
}

class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: '',
            user: null,
            language: this.props.language
        };
    }

    componentWillMount(): void {
        new AuthService().isLogged().then((token) => {
            let loggedUser = null;
            if (token) {
                new UserService().getMyUser().then( (user) => {
                    loggedUser = user;
                }).catch(() => {
                    this.logout();
                });
            }
            this.setState({
                token: token,
                user: loggedUser
            });
        });
    }

    @autobind
    register(user: User): void {
        new AuthService().register(user).then((registered) => {

        }).catch(() => {

        });
    }

    @autobind
    login(login: string, password: string): void {
        new AuthService().login(login, password).then(() => {
            window.location.reload();
        }).catch(() => {

        });
    }

    @autobind
    logout(): void {
        new AuthService().logout().then(() => {
            window.location.reload();
        });
    }

    render() {
        let logged = false;
        if (this.state.token) {
            logged = true
        }
        return (
            <React.Fragment>
                <MenuBar logged={logged}/>
                <Container fluid className={"main"}>
                    <Switch>
                        <Route exact path='/' component={IndexPage}/>
                        <LoggedRoute exact path='/register' component={RegisterPage} redirect='/home'
                                     logged={!logged} props={{logout: this.register}}/>
                        <LoggedRoute exact path='/login' component={LoginPage} redirect='/home'
                                     logged={!logged} props={{login: this.login}}/>
                        <LoggedRoute exact path='/home' component={HomePage} redirect='/login'
                                     logged={logged}/>
                        <LoggedRoute exact path='/contests' component={ContestsPage} redirect='/login'
                                     logged={logged}/>
                        <LoggedRoute exact path='/contest/:id' component={ContestPage} redirect='/login'
                                     logged={logged}/>
                        <LoggedRoute exact path='/account' component={AccountPage} redirect='/login'
                                     logged={logged}/>
                        <CustomRoute exact path='/logout' component={LogoutPage} props={{logout: this.logout}}/>
                    </Switch>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(App);