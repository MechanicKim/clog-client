import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Popup = styled.div`
    width: 200px;
    padding: 20px;
    border-radius: 5px;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    color: #ffffff;
`;

const Input = styled.input`
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    background-color: #ffffff;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-style: none;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    color: #ffffff;
    background-color: #212121;

    &:hover {
        cursor: pointer;
    }
`;

type PopupProps = {
    count: string;
    regist: Function;
};

type PopupState = {
    count: string;
};

export default class ViewPopup extends React.Component<PopupProps, PopupState> {
    state: PopupState = {
        count: this.props.count,
    };

    render() {
        const { count } = this.state;
        const { regist } = this.props;
        return (
            <Wrap>
                <Popup>
                    <Title>횟수를 입력하세요.</Title>
                    <Input
                        value={count}
                        onChange={this.onChangeCount}
                        type="number"
                    />
                    <Button onClick={() => regist(count)}>확인</Button>
                </Popup>
            </Wrap>
        );
    }

    onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            count: e.target.value,
        });
    };
}
