import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const Chart = styled.article`
    max-width: 800px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 10px;
`;

export default function HomeChart(props) {
    const { cLogDays } = props;

    return (
        <Chart>
            <Bar
                data={{
                    labels: cLogDays.map((b) => {
                        return `${b.date}`;
                    }),
                    datasets: [
                        {
                            label: '실천 횟수',
                            borderWidth: 1,
                            data: cLogDays.map((b) => b.count),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        },
                    ],
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    maintainAspectRatio: false,
                }}
            />
        </Chart>
    );
}

HomeChart.propTypes = {
    cLogDays: PropTypes.arrayOf(PropTypes.object),
};
