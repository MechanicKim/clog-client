import React from 'react';
import styled from 'styled-components';

const Empty = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 150%;
`;

export default function HomeEmpty() {
    return (
        <Empty>
            생성한 챌린지가 없습니다.<br />좌측 상단의 &apos;New&apos;를 눌러 만들어주세요.
        </Empty>
    );
}