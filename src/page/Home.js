import React from 'react';
import styled from 'styled-components';

import { get, set } from '../util/Storage';

import HomeHeader from '../component/HomeHeader';
import HomeNav from '../component/HomeNav';
import HomeStat from '../component/HomeStat';

const Page = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #212121;
`;

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const Section = styled.section`
    flex: 1;
    padding: 15px;
`;

const Box = styled.div`
    width: 70px;
    height: 70px;
    padding: 10px;
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #eeeeee;
    background-color: #ffffff;

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

const BoxDay = styled.span`
    font-size: 15px;
    color: #212121;
`;

const BoxCount = styled.span`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #212121;
`;

const PopupWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7)
`;

const Popup = styled.div`
    width: 200px;
    padding: 20px;
    border-radius: 5px;
`;

const PopupTitle = styled.h3`
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    color: #ffffff;
`;

const PopupInput = styled.input`
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    background-color: #ffffff;
`;

const PopupButton = styled.button`
    width: 100%;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    color: #424242;
    background-color: transparent;

    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
`;

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        const cLogKeys = get('cLogs');

        this.state = {
            cLogKeys,
            cLog: get(cLogKeys[0]),
            boxes: get(`boxes-${cLogKeys[0]}`),
            boxIndex: -1,
            popOn: false,
            count: ''
        };
    }

    render() {
        const { cLogKeys, cLog, boxes, popOn, count } = this.state;

        return (
            <Page>
                <HomeHeader />
                <Body>
                    <HomeNav cLogKeys={cLogKeys} cLog={cLog} select={this.selectCLog} />
                    <Section>
                        <HomeStat cLog={cLog} />
                        <article>
                        {boxes.map((box, i) => {
                            return (
                                <Box key={i} onClick={() => this.selectBox(i)}>
                                    <BoxDay>Day{box.day}</BoxDay>
                                    <BoxCount>{box.count}</BoxCount>
                                </Box>
                            );
                        })}
                        </article>
                    </Section>
                </Body>
                {popOn && (
                    <PopupWrap>
                        <Popup>
                            <PopupTitle>횟수를 입력하세요.</PopupTitle>
                            <PopupInput value={count} onChange={this.onChangeCount} type="number" />
                            <PopupButton onClick={() => this.registCount()}>확인</PopupButton>
                        </Popup>
                    </PopupWrap>
                )}
            </Page>
        );
    }

    selectCLog = (cLog, boxes) => {
        this.setState({ cLog, boxes });
    }

    selectBox = boxIndex => {
        const { boxes } = this.state;
        this.setState({ boxIndex, popOn: true, count: boxes[boxIndex].count });
    }

    onChangeCount = e => {
        this.setState({ count: e.target.value });
    }

    registCount = () => {
        const { cLog, boxes, boxIndex, count } = this.state;

        if (!count) {
            alert('달성 횟수를 입력하세요.');
            return;
        }

        boxes[boxIndex].count = parseInt(count);
        set(`boxes-${cLog.id}`, boxes);

        let totalCount = 0;
        boxes.forEach(box => {
            totalCount += box.count;
        });
        cLog.count = totalCount;
        set(cLog.id, cLog);
        
        this.setState({ cLog, boxes, boxIndex: -1, count: '', popOn: false });
    }

}