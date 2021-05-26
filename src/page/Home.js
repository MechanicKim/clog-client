import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCLogs } from '../util/Api';

import Header from '../component/Header';
import HomeNav from '../component/HomeNav';
import HomeEmpty from '../component/HomeEmpty';

const Page = styled.div``;

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cLogs: [],
        };
    }

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

    selectCLog = (id) => {
        this.props.history.push(`/view/${id}`);
    };
}

Home.propTypes = {
    history: PropTypes.object,
};
