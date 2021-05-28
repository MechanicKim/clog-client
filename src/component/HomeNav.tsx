import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    width: 100%;
    text-align: center;
`;

const List = styled.ul`
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    padding: 20px 0;
    list-style: none;

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

const Button = styled.a`
    color: #212121;
    text-decoration: none;
`;

type NavProps = {
    cLogs: Array<any>;
    select: Function;
};

export default function HomeNav({ cLogs, select }: NavProps) {
    return (
        <Nav>
            <List>
                {cLogs.map((cLog: any) => {
                    return (
                        <ListItem key={cLog.id} onClick={() => select(cLog.id)}>
                            <Button>{cLog.title}</Button>
                        </ListItem>
                    );
                })}
            </List>
        </Nav>
    );
}
