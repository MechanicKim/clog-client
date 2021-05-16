import React from 'react';
import styled from 'styled-components';

import { get, set } from '../util/Storage';
import * as moment from 'moment';

const Page = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #212121;
    justify-content: center;
    align-items: center;
`;

const Form = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
`;

const Textarea = styled.textarea`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    resize: none;
    box-sizing: border-box;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    background-color: #212121;
    color: #424242;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        color: #ffffff;
    }
`;

export default class CLogForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desc: '',
            days: '',
            total: ''
        };
    }

    render() {
        const { title, desc, days, total } = this.state;

        return (
            <Page>
                <Form>
                    <Input type="text" name="title" value={title} onChange={this.onChange} placeholder="제목" />
                    <Textarea type="text" name="desc" value={desc} onChange={this.onChange} rows="5" placeholder="간단한 설명"></Textarea>
                    <Input type="number" name="days" value={days} onChange={this.onChange} placeholder="챌린지 일수" />
                    <Input type="number" name="total" value={total} onChange={this.onChange} placeholder="챌린지 횟수" />
                    <Button onClick={() => this.createChallenge()}>도전!</Button>
                </Form>
            </Page>
        );
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createChallenge = () => {
        const { title, desc, days, total } = this.state;

        if (!title) {
            alert('제목을 입력하세요.');
            return;
        }

        if (!desc) {
            alert('설명을 입력하세요.');
            return;
        }

        if (!days) {
            alert('일수를 입력하세요.');
            return;
        }

        if (!total) {
            alert('횟수을 입력하세요.');
            return;
        }

        const start = moment().locale('ko').startOf('days');
        const end = moment(start).add(parseInt(days), 'days');

        const id = moment().locale('ko').format('YYYYMMDDHHmmss');
        
        let cLogs = get('cLogs');
        if (!cLogs) cLogs = [];
        cLogs.push(id);
        set('cLogs', cLogs);

        let cLog = {
            id, title, desc,
            days: parseInt(days),
            start: start.format('YYYY.MM.DD'),
            end: end.format('YYYY.MM.DD'),
            total: parseInt(total),
            count: 0
        };
        set(id, cLog);

        let dayBoxes = [];
        for (let d = 1; d <= cLog.days; d++) {
            dayBoxes.push({
                day: d,
                count: 0
            });
        }
        set(`boxes-${id}`, dayBoxes);

        this.props.history.goBack();
    }

}