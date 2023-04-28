import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
const options = {
  layout: {
    padding: {
      left: 20, // Add 10 pixels of padding to the left side of the labels
      right: 20, // Add 10 pixels of padding to the right side of the labels
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 16,
          family: 'Arial',
          color: 'red',
        },
      },
    },
  },
}

function LineChart({ chartData }) {
  return <Line options={options} data={chartData} />
}

export default LineChart
