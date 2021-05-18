import styled from 'styled-components';
import { get } from '../util/Storage';

const Nav = styled.nav`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: #212121;
`;

const Button = styled.button`
    padding: 15px;
    color: ${props => props.selected ? '#ffffff' : '#616161'};
    border-style: none;
    text-align: left;
    background-color: #212121;

    &:hover {
        background-color: #424242;
        cursor: pointer;
    }
`;

export default function HomeNav(props) {
    const { cLogKeys, cLog, select } = props;

    return (
        <Nav>
        {cLogKeys.map(key => {
            const log = get(key);
            const boxes = get(`boxes-${key}`);
            return (
                <Button key={log.id}
                    selected={log.id === cLog.id}
                    onClick={() => select(log, boxes)}>
                    {log.title}
                </Button>
            );
        })}
        </Nav>
    );
}