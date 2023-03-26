import * as React from "react";
import {Contest} from "../../model/Contest";
import {ContestItem} from "../../components/contest/ContestItem";
import {Card, Container, Loader} from "semantic-ui-react";
import autobind from "autobind-decorator";
import {ContestService} from "../../services/ContestService";

type State = {
    contests: Array<Contest>
}

export class ContestsPage extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = { contests: null };
    }

    componentDidMount(): void {
        new ContestService().getAll().then((contests) => {
            this.setState({
                contests: contests
            });
        });
    }

    @autobind
    participate(contest: Contest) : Promise<boolean> {
        console.log("participate");
        return new ContestService().participate(contest);
    }

    render() {
        return (
            <Container>
                <Card.Group itemsPerRow={1}>
                    {this.state.contests == null ?
                        (<Loader active={this.state.contests == null} inline={'centered'}>Loading</Loader>) :
                        this.state.contests.length == 0 ?
                            (<span>No contest</span>):
                            this.state.contests.map((contest: Contest, index: number) => {
                            return (
                                <ContestItem key={index} contest={contest} participate={this.participate}/>
                            );
                    })}
                </Card.Group>
            </Container>
        );
    }
}