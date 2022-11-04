import React, { useState } from 'react'
import { Box, Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Filter from '../../assets/img/Filter.svg';
import PJPScheduleTable from './PJPScheduleTable';
const PJPDetail = () => {
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box>
                <TabContext value={value}>
                    <Box className="tab_row">
                        <TabList
                            className="client_profile_tab mb-2"
                            onChange={handleChange}
                        >
                            <Tab label="Today" value="3" />
                            <Tab label="Tomorrow" value="1" />
                            <Tab label="All" value="2" />
                        </TabList>
                        <Box>
                            <Button className="common_button">+ Create</Button>
                            <img src={Filter} alt="Filter" />
                        </Box>
                    </Box>
                    <TabPanel value="1">
                        {/* <StaffDetail adminProfileDetail={adminProfileDetail} /> */}
                        <PJPScheduleTable />
                    </TabPanel>
                    <TabPanel value="2">
                        {/* <StaffAttendance /> */}
                        <PJPScheduleTable />

                    </TabPanel>
                    <TabPanel value="3">
                        {/* <PJPDetail /> */}
                        <PJPScheduleTable />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default PJPDetail