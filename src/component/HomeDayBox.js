import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
    width: 70px;
    height: 70px;
    padding: 10px;
    margin: 0 5px;
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #eeeeee;
    border-radius: 35px;
    background-color: ${props => props.passed ? '#9e9e9e' : '#ffffff'};

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

const Day = styled.span`
    font-size: 14px;
    text-align: center;
    color: #212121;
`;

const Count = styled.span`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #212121;
`;

export default function HomeDayBox(props) {
    const { boxes, dayNum, select } = props;

    return (
        <>
        {boxes.map((box, i) => (
            <Box key={i} passed={i < dayNum} onClick={() => select(i)}>
                <Day>{box.date}</Day>
                <Count>{box.count}</Count>
            </Box>
        ))}
        </>
    );
}

HomeDayBox.propTypes = {
    boxes: PropTypes.arrayOf(PropTypes.object),
    dayNum: PropTypes.number,
    select: PropTypes.func
};