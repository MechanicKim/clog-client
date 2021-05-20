import styled from 'styled-components';
import { getCLog, getCLogBoxes } from '../util/Storage';

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
    color: ${props => props.selected ? '#212121' : '#757575'};
    border-style: none;
    text-align: left;
    background-color: ${props => props.selected ? '#eeeeee' : '#ffffff'};

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

export default function HomeNav(props) {
    const { cLogKeys, cLog, select } = props;

    return (
        <Nav>
        {cLogKeys.map(key => {
            const log = getCLog(key);
            const boxes = getCLogBoxes(`boxes-${key}`);
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