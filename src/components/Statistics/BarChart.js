import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Box } from '@mui/material'
const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.3,
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 13,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 13,
        },
      },
    },
  },
  maintainAspectRatio: false,
  layout: {
    padding: { bottom: 20, right: 20, left: 20 },
  },
  plugins: {
    legend: {
      align: 'end',
      position: 'top',
      display: true,
      labels: {
        boxWidth: 18,
        padding: 25,
        font: {
          size: 16,
          family: 'Arial',
        },
        boxBorderWidth: 0,
      },
      margin: {
        top: 0,
        bottom: 0,
        right: 10,
        left: 10,
        y: 0,
      },
    },
  },
}
function BarChart({ chartData }) {
  return <Bar options={options} data={chartData} />
}

export default BarChart
