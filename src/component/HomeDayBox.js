import styled from 'styled-components';

const Box = styled.div`
    width: 70px;
    height: 70px;
    padding: 10px;
    display: inline-flex;
    flex-direction: column;
    border: 1px solid #eeeeee;
    background-color: ${props => props.passed ? '#9e9e9e' : '#ffffff'};

    &:hover {
        background-color: #eeeeee;
        cursor: pointer;
    }
`;

const Day = styled.span`
    font-size: 15px;
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
            <Box key={i} passed={box.day <= dayNum} onClick={() => select(i)}>
                <Day>Day{box.day}</Day>
                <Count>{box.count}</Count>
            </Box>
        ))}
        </>
    );
}