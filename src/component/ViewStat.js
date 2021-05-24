import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const Stat = styled.article`
    width: 100%;
    line-height: 150%;
`;

const Wrap = styled.div`
    padding: 25px 15px;
`;

const Desc = styled.div`
    flex: 1;
    font-size: 25px;
    line-height: 150%;
    color: #212121;
`;

const StatDays = styled.div`
    padding: 10px 15px 0 15px;
    color: #212121;
`;

const StatCount = styled.div`
    padding: 10px 15px;
    color: #212121;
`;

export default function HomeStat(props) {
    const { cLog } = props;
    const leftDays =
        moment(cLog.end, 'YYYY.MM.DD').startOf('days').diff(moment(), 'days') +
        1;
    const progress = Math.round((cLog.count / cLog.total) * 100);

    return (
        <Stat>
            <Wrap>
                <Desc>{cLog.title}</Desc>
                <Desc>{cLog.desc}</Desc>
            </Wrap>
            <StatDays>
                {cLog.start} ~ {cLog.end} ({leftDays}일 남음)
            </StatDays>
            <StatCount>
                {cLog.count || 0} / {cLog.total} ({progress}% 달성)
            </StatCount>
        </Stat>
    );
}

HomeStat.propTypes = {
    cLog: PropTypes.object,
    updateLog: PropTypes.func,
    deleteLog: PropTypes.func,
};
