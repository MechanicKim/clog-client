import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { getCLog, getCLogDays, updateCLogDay, deleteCLog } from '../util/Api';
import { CLogDay } from '../type/CLogTypes';

import Header from '../component/Header';
import Stat from '../component/ViewStat';
import DayBox from '../component/ViewDayBox';
import Chart from '../component/ViewChart';
import Popup from '../component/ViewPopup';
import { RouteComponentProps } from 'react-router-dom';

const Page = styled.div``;

const Section = styled.section`
    text-align: center;
`;

const Wrap = styled.article`
    margin-top: 20px;
`;

const Group = styled.article`
    margin: 50px 0;
`;

const Button = styled.button`
    font-size: 17px;
    color: #bdbdbd;
    border-style: none;
    background-color: transparent;

    &:hover {
        color: #212121;
        cursor: pointer;
    }
`;

export default function View({
    history,
    match,
}: RouteComponentProps<{ id: string }>) {
    const [cLog, setCLog] = useState<any>({});
    const [cLogDays, setCLogDays] = useState<Array<CLogDay>>([]);
    const [cLogDayIndex, setCLogDayIndex] = useState<number>(-1);
    const [popOn, setPopOn] = useState<Boolean>(false);
    const [count, setCount] = useState<string>('');

    useEffect(() => {
        const { id } = match.params;
        if (id) {
            requestCLogData(id);
        }
    }, []);

    const requestCLogData = async (id: string) => {
        let cLog = await getCLog(id);
        const cLogDays = await getCLogDays(id);
        cLog.count = 0;
        cLogDays.forEach((day: CLogDay) => {
            cLog.count += day.count;
        });

        setCLog(cLog);
        setCLogDays(cLogDays);
    };

    const updateLog = () => {
        history.push(`/form/${cLog.id}`);
    };

    const deleteLog = async () => {
        const confirmed = window.confirm(
            '해당 챌린지의 모든 기록이 삭제됩니다. 삭제할까요?',
        );
        if (confirmed) {
            alert(await deleteCLog(cLog.id));
            history.goBack();
        }
    };

    const selectBox = (cLogDayIndex: number) => {
        setCLogDayIndex(cLogDayIndex);
        setPopOn(true);
        setCount(String(cLogDays[cLogDayIndex].count));
    };

    const registCount = (count: string) => {
        const newCLogDays = [...cLogDays];
        newCLogDays[cLogDayIndex].count = +count;

        const newCLog = {
            ...cLog,
            count: 0,
        };

        newCLogDays.forEach((day: CLogDay) => {
            newCLog.count += day.count;
        });

        try {
            updateCLogDay(newCLogDays[cLogDayIndex]);

            setCLogDays(newCLogDays);
            setCLog(newCLog);
            setCLogDayIndex(-1);
            setCount('');
            setPopOn(false);
        } catch (err) {
            console.error(err);
        }
    };

    const dayNum = moment().diff(
        moment(cLog.start, 'YYYY.MM.DD').startOf('days'),
        'days',
    );

    return (
        <Page>
            <Header />
            <Section>
                <Stat cLog={cLog} />
                <Wrap>
                    <DayBox
                        cLogDays={cLogDays}
                        dayNum={dayNum}
                        select={selectBox}
                    />
                    <Chart cLogDays={cLogDays} />
                </Wrap>
                <Group>
                    <Button onClick={() => history.goBack()}>목록</Button>
                    <Button onClick={() => updateLog()}>수정</Button>
                    <Button onClick={() => deleteLog()}>삭제</Button>
                </Group>
            </Section>
            {popOn && <Popup prevCount={count} regist={registCount} />}
        </Page>
    );
}
