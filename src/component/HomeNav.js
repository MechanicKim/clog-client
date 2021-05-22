import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCLog } from '../util/Storage';

const Nav = styled.nav`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #eeeeee;
    resize: horizontal;
    overflow: auto;
`;

const Button = styled.button`
    padding: 15px;
    color: ${(props) => (props.selected ? '#212121' : '#757575')};
    border-style: none;
    text-align: left;
    background-color: ${(props) => (props.selected ? '#eeeeee' : '#ffffff')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

export default function HomeNav(props) {
    const { cLogKeys, cLog, select } = props;

    return (
        <Nav>
            {cLogKeys.map((key) => {
                const log = getCLog(key);
                return (
                    <Button
                        key={log.id}
                        selected={log.id === cLog.id}
                        onClick={() => select(log.id)}
                    >
                        {log.title}
                    </Button>
                );
            })}
        </Nav>
    );
}

HomeNav.propTypes = {
    cLogKeys: PropTypes.arrayOf(PropTypes.string),
    cLog: PropTypes.object,
    select: PropTypes.func,
};
