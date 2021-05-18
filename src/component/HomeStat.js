import styled from 'styled-components';
import moment from 'moment';

const Stat = styled.article`
    margin-bottom: 10px;
    line-height: 150%;
`;

const Wrap = styled.div`
    padding: 30px 15px;
    display: flex;
    flex-direction: row;
    background-color: #263238;
`;

const Desc = styled.span`
    flex: 1;
    font-size: 30px;
    color: #ffffff;
`;

const Button = styled.button`
    font-size: 17px;
    color: #616161;
    border-style: none;
    background-color: transparent;

    &:hover {
        color: #ffffff;
        cursor: pointer;
    }
`;

const StatDays = styled.div`
    padding: 10px 15px;
    color: #212121;
    background-color: #eceff1;
`;

const StatCount = styled.div`
    padding: 10px 15px;
    color: #212121;
    background-color: #eceff1;
`;

export default function HomeStat(props) {
    const { cLog, updateLog, deleteLog } = props;
    const leftDays = moment(cLog.end, 'YYYY.MM.DD').startOf('days').diff(moment(), 'days') + 1;
    const progress = Math.round((cLog.count / cLog.total) * 100);

    return (
        <Stat>
            <Wrap>
                <Desc>{cLog.desc}</Desc>
                <Button onClick={() => updateLog()}>Update</Button>
                <Button onClick={() => deleteLog()}>Delete</Button>
            </Wrap>
            <StatDays>{cLog.start} ~ {cLog.end} ({leftDays}일 남음)</StatDays>
            <StatCount>{cLog.count || 0} / {cLog.total} ({progress}% 달성)</StatCount>
        </Stat>
    );
}