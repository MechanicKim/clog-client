import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
    padding: 15px 10px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background-color: #212121;
`;

const Title = styled.h2`
    margin: 0;
    color: #ffffff;
`;

const Nav = styled.nav`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const MyLink = styled(Link)`
    font-size: 17px;
    color: #bdbdbd;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: #ffffff;
    }
`;

export default function HomeHeader() {
    return (
        <Header>
            <Title>CLog</Title>
            <Nav>
                <MyLink to="/form">New</MyLink>
            </Nav>
        </Header>
    );
}
