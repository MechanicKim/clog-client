import React from 'react';
import PropTypes from 'prop-types';
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

export default function HomeNav(props) {
    const { cLogs, select } = props;

    return (
        <Nav>
            <List>
                {cLogs.map((cLog) => {
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

HomeNav.propTypes = {
    cLogs: PropTypes.arrayOf(PropTypes.object),
    select: PropTypes.func,
};
