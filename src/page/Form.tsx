import React from 'react';
import styled, { css } from 'styled-components';

import { createCLog, updateCLog, getCLog } from '../util/Api';
import { RouteComponentProps } from 'react-router-dom';

const Page = styled.div`
    padding-top: 100px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #212121;
`;

const Form = styled.div`
    width: 300px;
    margin: 0 auto;
`;

const inputStyle = css`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
`;

const Input = styled.input`
    ${inputStyle}
`;

const Textarea = styled.textarea`
    ${inputStyle}
    resize: none;
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

type FormState = {
    title: string;
    desc: string;
    days: string;
    total: string;
    update: boolean;
};

export default class CLogForm extends React.Component<
    RouteComponentProps<{ id: string }>,
    FormState
> {
    state: FormState = {
        title: '',
        desc: '',
        days: '',
        total: '',
        update: false,
    };
    cLog: any;

    async componentDidMount() {
        const cLogId: any = this.props.match.params.id;
        if (!cLogId) return;

        try {
            this.cLog = await getCLog(cLogId);
            this.setState({
                title: this.cLog.title,
                desc: this.cLog.desc,
                days: String(this.cLog.days),
                total: String(this.cLog.total),
                update: true,
            });
        } catch (err) {
            console.error(err);
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
                        onChange={this.onChangeTitle}
                        placeholder="제목"
                    />
                    <Textarea
                        name="desc"
                        value={desc}
                        onChange={this.onChangeDesc}
                        rows={5}
                        placeholder="간단한 설명"
                    ></Textarea>
                    <Input
                        type="number"
                        name="days"
                        value={days}
                        onChange={this.onChangeDays}
                        placeholder="챌린지 일수(최대 30일)"
                        readOnly={update}
                    />
                    <Input
                        type="number"
                        name="total"
                        value={total}
                        onChange={this.onChangeTotal}
                        placeholder="챌린지 횟수"
                        readOnly={update}
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

    onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.target.value,
        });
    };

    onChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            desc: e.target.value,
        });
    };

    onChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            days: e.target.value,
        });
    };

    onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            total: e.target.value,
        });
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

    createChallenge = async () => {
        if (!this.validateForm()) return;

        try {
            const { title, desc, days, total } = this.state;
            await createCLog(title, desc, +days, +total);
            this.props.history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    updateChallenge = async () => {
        if (!this.validateForm()) return;

        const { title, desc } = this.state;

        this.cLog.title = title;
        this.cLog.desc = desc;

        try {
            await updateCLog(this.cLog);
            this.props.history.goBack();
        } catch (err) {
            console.error(err);
        }
    };
}
