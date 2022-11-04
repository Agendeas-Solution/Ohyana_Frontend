import React from 'react'
import { Box, Typography } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './index.css'
const Statistics = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [age, setAge] = React.useState('');

    const handleChangeSelect = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Box className="main_section">
                <Box className="statistics_title">
                    <Typography variant="span">Product</Typography>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Item One" value="1" />
                                <Tab label="Item Two" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                    </TabContext>
                    <FormControl>
                        <Select
                            value={age}
                            onChange={handleChangeSelect}
                        >
                            <MenuItem selected value={2}>1 Month</MenuItem>
                            <MenuItem value={20}>3 Month</MenuItem>
                            <MenuItem value={30}>1 Year</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </>
    )
}

export default Statistics