import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createCLog, updateCLog, getCLog } from '../util/Storage';

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

const Group = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    background-color: #212121;
    color: #bdbdbd;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        color: #ffffff;
    }
`;

export default class CLogForm extends React.Component {
    constructor(props) {
        super(props);

        const cLogId = this.props.match.params.id;
        if (cLogId) {
            const cLog = getCLog(cLogId);
            this.state = {
                title: cLog.title,
                desc: cLog.desc,
                days: cLog.days,
                total: cLog.total,
                update: true,
            };
        } else {
            this.state = {
                title: '',
                desc: '',
                days: '',
                total: '',
                update: false,
            };
        }
    }

    render() {
        const { title, desc, days, total, update } = this.state;

        return (
            <Page>
                <Form>
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.onChange}
                        placeholder="제목"
                    />
                    <Textarea
                        type="text"
                        name="desc"
                        value={desc}
                        onChange={this.onChange}
                        rows="5"
                        placeholder="간단한 설명"
                    ></Textarea>
                    <Input
                        type="number"
                        name="days"
                        value={days}
                        onChange={this.onChange}
                        placeholder="챌린지 일수(최대 30일)"
                        disabled={update}
                    />
                    <Input
                        type="number"
                        name="total"
                        value={total}
                        onChange={this.onChange}
                        placeholder="챌린지 횟수"
                        disabled={update}
                    />
                    <Group>
                        <Button onClick={() => this.props.history.goBack()}>
                            취소
                        </Button>
                        {!update && (
                            <Button onClick={() => this.createChallenge()}>
                                도전!
                            </Button>
                        )}
                        {update && (
                            <Button onClick={() => this.updateChallenge()}>
                                수정
                            </Button>
                        )}
                    </Group>
                </Form>
            </Page>
        );
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validateForm = () => {
        const { title, desc, days, total } = this.state;

        if (!title) {
            alert('제목을 입력하세요.');
            return false;
        }

        if (!desc) {
            alert('설명을 입력하세요.');
            return false;
        }

        if (!days) {
            alert('일수를 입력하세요.');
            return false;
        }

        if (parseInt(days) > 30) {
            alert('일수는 30일을 넘을 수 없습니다.');
            return false;
        }

        if (!total) {
            alert('횟수를 입력하세요.');
            return false;
        }

        return true;
    };

    createChallenge = () => {
        if (!this.validateForm()) return;

        const { title, desc, days, total } = this.state;
        createCLog(title, desc, days, total);
        this.props.history.goBack();
    };

    updateChallenge = () => {
        if (!this.validateForm()) return;

        const { title, desc } = this.state;
        updateCLog(this.props.match.params.id, title, desc);
        this.props.history.goBack();
    };
}

CLogForm.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};
