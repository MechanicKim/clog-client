import React from 'react';
import styled from 'styled-components';
import {
    getCLogKeys,
    getCLog,
    getCLogBoxes,
    writeCount,
    deleteCLog
} from '../util/Storage';

import HomeHeader from '../component/HomeHeader';
import HomeNav from '../component/HomeNav';
import HomeStat from '../component/HomeStat';
import HomeDayBox from '../component/HomeDayBox';
import HomeChart from '../component/HomeChart';
import HomePopup from '../component/HomePopup';

const Page = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const Empty = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 150%;
`;

const Section = styled.section`
    flex: 1;
`;

const Wrap = styled.article`
    display: inline-block;
    padding: 0 15px;
`;

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        const cLogKeys = getCLogKeys();

        if (!cLogKeys) {
            this.state = {
                cLogKeys: [],
                cLog: {},
                boxes: [],
                boxIndex: -1,
                popOn: false,
                count: ''
            }
        } else {
            this.state = {
                cLogKeys,
                cLog: getCLog(cLogKeys[0]),
                boxes: getCLogBoxes(cLogKeys[0]),
                boxIndex: -1,
                popOn: false,
                count: ''
            };
        }
    }

    render() {
        const { cLogKeys, cLog, boxes, popOn, count } = this.state;

        return (
            <Page>
                <HomeHeader />
                {cLogKeys.length > 0 && (
                    <Body>
                        <HomeNav cLogKeys={cLogKeys} cLog={cLog} select={this.selectCLog} />
                        <Section>
                            <HomeStat cLog={cLog} updateLog={this.updateLog} deleteLog={this.deleteLog} />
                            <Wrap>
                                <HomeDayBox boxes={boxes} select={this.selectBox} />
                                <HomeChart boxes={boxes} />
                            </Wrap>
                        </Section>
                    </Body>
                )}
                {cLogKeys.length === 0 && (
                    <Empty>
                        생성한 챌린지가 없습니다.<br />좌측 상단에 있는 'New'를 눌러 만들어주세요.
                    </Empty>
                )}
                {popOn && (
                    <HomePopup count={count} regist={this.registCount} />
                )}
            </Page>
        );
    }

    updateLog = () => {
        alert('개발중...');
    }

    deleteLog = () => {
        const confirmed = window.confirm('해당 챌린지의 모든 기록이 삭제됩니다. 삭제할까요?');
        if (confirmed) {
            const { cLogKeys, cLog } = this.state;
            this.setState(deleteCLog(cLogKeys, cLog));
            alert('삭제했습니다.');
        }
    }

    selectCLog = (cLog, boxes) => {
        this.setState({ cLog, boxes });
    }

    selectBox = boxIndex => {
        const { boxes } = this.state;
        this.setState({ boxIndex, popOn: true, count: boxes[boxIndex].count });
    }

    registCount = count => {
        const { cLog, boxes, boxIndex } = this.state;
        const result = writeCount(count, boxes, boxIndex, cLog);
        this.setState({ ...result, boxIndex: -1, count: '', popOn: false });
    }

}