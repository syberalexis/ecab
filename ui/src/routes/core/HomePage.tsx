import * as React from "react";
import {Contest} from "../../model/Contest";
import {User} from "../../model/User";
import {Accordion, Container, Divider, Grid} from "semantic-ui-react";
import autobind from "autobind-decorator";
import {UserService} from "../../services/UserService";
import {ContestService} from "../../services/ContestService";
import {UserStatistics} from "../../components/user/UserStatistics";
import {ContestList} from "../../components/contest/ContestList";
import {UserCard} from "../../components/user/UserCard";

type Props = {
    userId: number;
}

type State = {
    user: User;
    startedContests: Array<Contest>;
    endedContests: Array<Contest>;
    activeAccordion: number
}

export class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: null,
            startedContests: null,
            endedContests: null,
            activeAccordion: 1
        };
    }

    componentDidMount(): void {
        new UserService().getMyUser().then((user) => {
            this.setState({
                user: user
            });
        });
        new ContestService().getStarted(this.props.userId).then((contests) => {
            this.setState({
                startedContests: contests
            });
        });
        new ContestService().getEnded(this.props.userId).then((contests) => {
            this.setState({
                endedContests: contests
            });
        });
    }

    @autobind
    private handleClick(e: any, titleProps: any): any{
        let newIndex = this.state.activeAccordion === titleProps.index ? -1 : titleProps.index;

        this.setState({ activeAccordion: newIndex })
    }

    render() {
        return (
            <Container>
                <Grid verticalAlign='middle'>
                    <Grid.Row columns={2}>
                        <Grid.Column mobile={16} tablet={16} computer={4}>
                            <UserCard user={this.state.user}/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={12}>
                            <UserStatistics user={null}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Accordion>
                                <Accordion.Title active={this.state.activeAccordion === 1} index={1} onClick={this.handleClick}>
                                    <Divider horizontal>Started contests</Divider>
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeAccordion === 1}>
                                    <ContestList contests={this.state.startedContests}/>
                                </Accordion.Content>
                                <Accordion.Title active={this.state.activeAccordion === 2} index={2} onClick={this.handleClick}>
                                    <Divider horizontal>Ended contests</Divider>
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeAccordion === 2}>
                                    <ContestList contests={this.state.endedContests}/>
                                </Accordion.Content>
                            </Accordion>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}