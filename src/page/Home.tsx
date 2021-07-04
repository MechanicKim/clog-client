import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCLogs } from '../util/Api';

import Header from '../component/Header';
import HomeList from '../component/HomeList';
import HomeEmpty from '../component/HomeEmpty';
import { RouteComponentProps } from 'react-router-dom';

const Page = styled.div``;

export default function Home({ history }: RouteComponentProps) {
    const [cLogs, setCLogs] = useState([]);

    useEffect(() => {
        requestCLogs();
    }, []);

    const requestCLogs = async () => {
        setCLogs(await getCLogs());
    };

    const viewCLog = (id: string) => {
        history.push(`/view/${id}`);
    };

    return (
        <Page>
            <Header />
            {cLogs.length > 0 && <HomeList cLogs={cLogs} select={viewCLog} />}
            {cLogs.length === 0 && <HomeEmpty />}
        </Page>
    );
}
