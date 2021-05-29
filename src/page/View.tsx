import React from 'react';
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

type ViewState = {
    cLog: any;
    cLogDays: Array<CLogDay>;
    cLogDayIndex: number;
    popOn: Boolean;
    count: string;
};

export default class View extends React.Component<
    RouteComponentProps<{ id: string }>,
    ViewState
> {
    state: ViewState = {
        cLog: {},
        cLogDays: [],
        cLogDayIndex: -1,
        popOn: false,
        count: '',
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        try {
            let cLog = await getCLog(id);
            const cLogDays = await getCLogDays(id);
            cLog.count = 0;
            cLogDays.forEach((day: CLogDay) => {
                cLog.count += day.count;
            });

            this.setState({
                cLog,
                cLogDays,
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { cLog, cLogDays, popOn, count } = this.state;
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
                            select={this.selectBox}
                        />
                        <Chart cLogDays={cLogDays} />
                    </Wrap>
                    <Group>
                        <Button onClick={() => this.props.history.goBack()}>
                            목록
                        </Button>
                        <Button onClick={() => this.updateLog()}>수정</Button>
                        <Button onClick={() => this.deleteLog()}>삭제</Button>
                    </Group>
                </Section>
                {popOn && <Popup count={count} regist={this.registCount} />}
            </Page>
        );
    }

    updateLog = () => {
        const { cLog } = this.state;
        this.props.history.push(`/form/${cLog.id}`);
    };

    deleteLog = async () => {
        const confirmed = window.confirm(
            '해당 챌린지의 모든 기록이 삭제됩니다. 삭제할까요?',
        );
        if (confirmed) {
            const { cLog } = this.state;
            alert(await deleteCLog(cLog.id));
            this.props.history.goBack();
        }
    };

    selectBox = (cLogDayIndex: number) => {
        const { cLogDays } = this.state;
        this.setState({
            cLogDayIndex,
            popOn: true,
            count: String(cLogDays[cLogDayIndex].count),
        });
    };

    registCount = (count: string) => {
        const { cLogDays, cLogDayIndex } = this.state;
        cLogDays[cLogDayIndex].count = +count;

        try {
            updateCLogDay(cLogDays[cLogDayIndex]);
            this.setState({
                cLogDays,
                cLogDayIndex: -1,
                count: '',
                popOn: false,
            });
        } catch (err) {
            console.error(err);
        }
    };
}
