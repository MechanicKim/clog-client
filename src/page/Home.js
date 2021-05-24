import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCLogKeys } from '../util/Storage';

import Header from '../component/Header';
import HomeNav from '../component/HomeNav';
import HomeEmpty from '../component/HomeEmpty';

const Page = styled.div``;

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        const cLogKeys = getCLogKeys();

        if (!cLogKeys) {
            this.state = {
                cLogKeys: [],
            };
        } else {
            this.state = {
                cLogKeys,
            };
        }
    }

    render() {
        const { cLogKeys } = this.state;

        return (
            <Page>
                <Header />
                {cLogKeys.length > 0 && (
                    <HomeNav cLogKeys={cLogKeys} select={this.selectCLog} />
                )}
                {cLogKeys.length === 0 && <HomeEmpty />}
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
