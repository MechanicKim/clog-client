import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { getCLog, getCLogBoxes, writeCount, deleteCLog } from '../util/Storage';

import Header from '../component/Header';
import Stat from '../component/ViewStat';
import DayBox from '../component/ViewDayBox';
import Chart from '../component/ViewChart';
import Popup from '../component/ViewPopup';

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

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        const { id } = this.props.match.params;
        this.state = {
            cLog: getCLog(id),
            boxes: getCLogBoxes(id),
            boxIndex: -1,
            popOn: false,
            count: '',
        };
    }

    render() {
        const { cLog, boxes, popOn, count } = this.state;
        const dayNum = moment().diff(
            moment(cLog.start, 'YYYY.MM.DD').startOf('days'),
            'days',
        );

        return (
            <Page>
                <Header />
                <Section>
                    <Stat
                        cLog={cLog}
                        updateLog={this.updateLog}
                        deleteLog={this.deleteLog}
                    />
                    <Wrap>
                        <DayBox
                            boxes={boxes}
                            dayNum={dayNum}
                            select={this.selectBox}
                        />
                        <Chart boxes={boxes} />
                    </Wrap>
                    <Group>
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

    deleteLog = () => {
        const confirmed = window.confirm(
            '해당 챌린지의 모든 기록이 삭제됩니다. 삭제할까요?',
        );
        if (confirmed) {
            const { cLog } = this.state;
            deleteCLog(cLog);
            this.props.history.goBack();
            alert('삭제했습니다.');
        }
    };

    selectCLog = (id) => {
        this.setState({
            cLog: getCLog(id),
            boxes: getCLogBoxes(id),
        });
    };

    selectBox = (boxIndex) => {
        const { boxes } = this.state;
        this.setState({
            boxIndex,
            popOn: true,
            count: String(boxes[boxIndex].count),
        });
    };

    registCount = (count) => {
        const { cLog, boxes, boxIndex } = this.state;
        const result = writeCount(count, boxes, boxIndex, cLog);
        this.setState({ ...result, boxIndex: -1, count: '', popOn: false });
    };
}

Home.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};