import styled from 'styled-components';
import moment from 'moment';

const Stat = styled.article`
    margin-bottom: 10px;
    line-height: 150%;
`;

const Desc = styled.div`
    padding: 30px 15px;
    font-size: 30px;
    color: #ffffff;
    background-color: #263238;
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
    const { cLog } = props;
    const leftDays = moment(cLog.end, 'YYYY.MM.DD').startOf('days').diff(moment(), 'days') + 1;
    const progress = Math.round((cLog.count / cLog.total) * 100);

    return (
        <Stat>
            <Desc>{cLog.desc}</Desc>
            <StatDays>{cLog.start} ~ {cLog.end} ({leftDays}일 남음)</StatDays>
            <StatCount>{cLog.count || 0} / {cLog.total} ({progress}% 달성)</StatCount>
        </Stat>
    );
}