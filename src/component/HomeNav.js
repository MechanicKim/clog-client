import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCLog } from '../util/Storage';

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
    const { cLogKeys, select } = props;

    return (
        <Nav>
            <List>
                {cLogKeys.map((key) => {
                    const log = getCLog(key);
                    return (
                        <ListItem key={log.id} onClick={() => select(log.id)}>
                            <Button>{log.title}</Button>
                        </ListItem>
                    );
                })}
            </List>
        </Nav>
    );
}

HomeNav.propTypes = {
    cLogKeys: PropTypes.arrayOf(PropTypes.string),
    select: PropTypes.func,
};
