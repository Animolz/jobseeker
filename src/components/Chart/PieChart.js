import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

const PieChart = (props) => {
    const { data } = props

    return (
        <Pie data={data} width={ props?.width }
        height={ props?.height }/>
    );
}

export default PieChart