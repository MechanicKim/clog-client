import React from 'react';
import styled from 'styled-components';

const Empty = styled.section`
    margin-top: 25%;
    text-align: center;
    line-height: 150%;
`;

export default function HomeEmpty() {
    return (
        <Empty>
            생성한 챌린지가 없습니다.
            <br />
            우측 상단의 &apos;New&apos;를 눌러 만들어주세요.
        </Empty>
    );
}
