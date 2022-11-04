import React from "react";
import DonutChart from 'react-donut-chart';


import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import "./index.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

const Dashboard = () => {
  const [value, setValue] = React.useState("All");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = {
    labels: ["I", "II", "III", "IIII"],
    datasets: [
      {
        data: [500, 500, 500, 500],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      <Box className="main_section">
        <Box className="attendance_buttons">
          <Box>
            <Typography variant="span">Today’s Present</Typography>
          </Box>
          <Box>
            <Button className="common_button">
              Check In
            </Button>
            <Button className="common_button">
              Break In
            </Button>
            <Button className="common_button">
              Break Out
            </Button>
            <Button className="common_button">
              Check Out
            </Button>
          </Box>
        </Box>
        <Box className="inquiry_sales_statistics">
          <Box className="inquiry_overview">
            <Box>
              <Typography variant="span">Inquiries Overview</Typography>
            </Box>
            <Box className="common_row">
              <Box className="platform_data_detail row">
                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                    <Typography variant="span">
                      IndiaMart
                    </Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">100</Typography>
                    <Typography variant="span">100</Typography>
                  </Box>
                  <Typography variant="span">Last Month : 85</Typography>
                </Box>
                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                    <Typography variant="span">
                      IndiaMart
                    </Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">100</Typography>
                    <Typography variant="span">100</Typography>
                  </Box>
                  <Typography variant="span">Last Month : 85</Typography>
                </Box>
                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                    <Typography variant="span">
                      IndiaMart
                    </Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">100</Typography>
                    <Typography variant="span">100</Typography>
                  </Box>
                  <Typography variant="span">Last Month : 85</Typography>
                </Box>
                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                    <Typography variant="span">
                      IndiaMart
                    </Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">100</Typography>
                    <Typography variant="span">100</Typography>
                  </Box>
                  <Typography variant="span">Last Month : 85</Typography>
                </Box></Box>
              <Box className="doughnut_chart_inquiry">
                <DonutChart
                  height={200}
                  width={200}
                  legend={false}
                  emptyOffset={false}
                  strokeColor={false}
                  toggledOffset={false}
                  data={[
                    {
                      label: "hello",
                      value: 20,
                    },
                    {
                      label: "hello1",
                      value: 20,
                    }, {
                      label: "hello",
                      value: 25,
                    }, {
                      label: "hello",
                      value: 35,
                    },
                  ]}
                />

              </Box>
            </Box>
            <Box>

            </Box>
          </Box>
          <Box className="sales_statistics">
            <Typography className="sales_statistics_heading" variant="span">Sales Statistics</Typography>
            <Box className="sales_statistics_data">
              <Typography variant="span">Total</Typography>
              <Box className="sales_parameter">
                <Typography variant="span">280</Typography>
                <Typography variant="span"><TrendingUpRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Total</Typography>
              <Box className="sales_parameter">
                <Typography >280</Typography>
                <Typography ><TrendingDownRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Total</Typography>
              <Box className="sales_parameter">
                <Typography >280</Typography>
                <Typography ><TrendingDownRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Total</Typography>
              <Box className="sales_parameter">
                <Typography >280</Typography>
                <Typography ><TrendingDownRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Total</Typography>
              <Box className="sales_parameter">
                <Typography >280</Typography>
                <Typography ><TrendingDownRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box> <Box className="sales_statistics_data">
              <Typography>Total</Typography>
              <Box className="sales_parameter">
                <Typography >280</Typography>
                <Typography ><TrendingDownRoundedIcon className="common_icon" /> 5%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="team_overview">
          <Box className="team_overview_heading">
            <Typography variant="span">Team Overview</Typography>
            <Button className="view_all_button"> View All > </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} >
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Points</TableCell>
                  <TableCell align="right">Performance</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      row.name
                    </TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"><Button className="common_button">View</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>

        <Box className="team_overview">
          <Box className="team_overview_heading">
            <Typography variant="span">Order Overview</Typography>
            <Button className="view_all_button"> View More > </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} >
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">Order Of</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Delivery</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      row.name
                    </TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"> row.name</TableCell>
                    <TableCell align="right"><Button className="common_button">View</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
