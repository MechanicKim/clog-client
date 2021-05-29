import React from 'react';
import styled from 'styled-components';
import { getCLogs } from '../util/Api';
import { CLog } from '../type/CLogTypes';

import Header from '../component/Header';
import HomeNav from '../component/HomeNav';
import HomeEmpty from '../component/HomeEmpty';
import { RouteComponentProps } from 'react-router-dom';

const Page = styled.div``;

type HomeState = {
    cLogs: Array<CLog>;
};

export default class Home extends React.Component<
    RouteComponentProps<{}>,
    HomeState
> {
    state: HomeState = {
        cLogs: [],
    };

    async componentDidMount() {
        try {
            this.setState({
                cLogs: await getCLogs(),
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { cLogs } = this.state;

        return (
            <Page>
                <Header />
                {cLogs.length > 0 && (
                    <HomeNav cLogs={cLogs} select={this.selectCLog} />
                )}
                {cLogs.length === 0 && <HomeEmpty />}
            </Page>
        );
    }

    selectCLog = (id: string) => {
        this.props.history.push(`/view/${id}`);
    };
}
