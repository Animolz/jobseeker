import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = (props) => {
    return (
        <Bar 
            data={ props?.data }
            width={ props?.width }
            height={ props?.height }
        />
    );
}

export default BarChart