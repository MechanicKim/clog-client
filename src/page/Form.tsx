import React, { useState, useEffect } from 'react';
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

export default function CLogForm({
    history,
    match,
}: RouteComponentProps<{ id: string }>) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [days, setDays] = useState('');
    const [total, setTotal] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const cLogId = match.params.id;
        if (!cLogId) return;
        requestCLog(cLogId);
    }, []);

    const requestCLog = async (cLogId: string) => {
        try {
            const cLog = await getCLog(cLogId);
            setTitle(cLog.title);
            setDesc(cLog.desc);
            setDays(cLog.days);
            setTotal(cLog.total);
            setUpdate(true);
        } catch (err) {
            console.error(err);
        }
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };

    const onChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDays(e.target.value);
    };

    const onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotal(e.target.value);
    };

    const validateForm = () => {
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

    const createChallenge = async () => {
        if (!validateForm()) return;

        try {
            await createCLog(title, desc, +days, +total);
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    const updateChallenge = async () => {
        if (!validateForm()) return;

        const cLogId = match.params.id;
        const cLog = await getCLog(cLogId);
        try {
            await updateCLog({
                ...cLog,
                title,
                desc,
            });
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Page>
            <Form>
                <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="제목"
                />
                <Textarea
                    name="desc"
                    value={desc}
                    onChange={onChangeDesc}
                    rows={5}
                    placeholder="간단한 설명"
                ></Textarea>
                <Input
                    type="number"
                    name="days"
                    value={days}
                    onChange={onChangeDays}
                    placeholder="챌린지 일수(최대 30일)"
                    readOnly={update}
                />
                <Input
                    type="number"
                    name="total"
                    value={total}
                    onChange={onChangeTotal}
                    placeholder="챌린지 횟수"
                    readOnly={update}
                />
                <Group>
                    <Button onClick={() => history.goBack()}>취소</Button>
                    {!update && (
                        <Button onClick={() => createChallenge()}>도전!</Button>
                    )}
                    {update && (
                        <Button onClick={() => updateChallenge()}>수정</Button>
                    )}
                </Group>
            </Form>
        </Page>
    );
}
