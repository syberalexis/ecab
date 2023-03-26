import * as React from "react";
import {Container} from "semantic-ui-react";
import {Contest} from "../../model/Contest";
import {Participation} from "../../model/Participation";
import autobind from "autobind-decorator";
import {ContestService} from "../../services/ContestService";
import {ContestDetails} from "../../components/contest/ContestDetails";

type Props = {
    id: number;
}

type State = {
    contest: Contest;
    participation: Participation;
}

export class ContestPage extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            contest: null,
            participation: null
        };
    }

    componentDidMount(): void {
        new ContestService().get(this.props.id).then(contest => {
            this.setState({contest: contest});
        });
    }

    @autobind
    participate() : Promise<boolean> {
        return new ContestService().participate(this.state.contest);
    }

    render() {
        return (
            <Container>
                <ContestDetails contest={this.state.contest} participation={this.state.participation} participate={this.participate}/>
            </Container>
        );
    }
}