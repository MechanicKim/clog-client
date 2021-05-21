import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const Chart = styled.article`
`;

export default function HomeChart(props) {
    const { boxes } = props;

    return (
        <Chart>
            <Bar
                data={{
                    labels: boxes.map(b => {
                        return `${b.date}`;
                    }),
                    datasets: [{
                        label: '실천 횟수',
                        borderWidth: 1,
                        data: boxes.map(b => b.count),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)'
                    }]
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    maintainAspectRatio: false 
                }}
            />
        </Chart>
    );
}

HomeChart.propTypes = {
    boxes: PropTypes.arrayOf(PropTypes.object)
};