import React, { useState, useEffect } from 'react'
import { Box, Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Filter from '../../assets/img/Filter.svg';
import PJPScheduleTable from './PJPScheduleTable';
import { GetPJPList, CreatePJP } from '../../services/apiservices/teamcall';
import AddPJPDialog from './AddPJPDialog';
const PJPDetail = () => {
    let path = window.location.pathname;
    console.log("Printing Path of ", path);
    console.log("Printing ", path.split("/").pop());
    path = path.split("/").pop();
    const [value, setValue] = useState("TODAY");
    const [pjpList, setPjpList] = useState([]);
    const [addPJPDetail, setAddPJPdetail] = useState({
        dialogStatus: false,
        date: "2022 - 10 - 05",
        name: "",
        contact_number: "",
        city: "",
        business: "",
        state:"",
        teamId: path,
        description:"",
        latitude:"",
        longitude:""
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCloseDialog = () => {
        setAddPJPdetail({ ...addPJPDetail, dialogStatus: false })
    }
    const getLocation = () => {
        if (!window.navigator.geolocation) {
        //   setStatus('Geolocation is not supported by your browser');
        } else {
        //   setStatus('Locating...');
          window.navigator.geolocation.getCurrentPosition((position) => {
            // setStatus(null);
            setAddPJPdetail({...addPJPDetail,latitude:position.coords.latitude,longitude:position.coords.longitude});
            // setAddPJPdetail({...addPJPDetail,dialogStatus:true})
            debugger;
        }
        , () => {
            // setStatus('Unable to retrieve your location');
          });
        }
      }
    useEffect(() => {

        GetPJPList(
            {
                teamId: path,
                day: value
            },
            (res) => {
                if (res.status === 200) {
                    setPjpList(res?.data?.pjps);
                    debugger;
                }
            },
            (err) => {
                console.log("Printing ", err);
            }
        );
    }, [value])
    useEffect(()=>{
        console.log("Printing Add PJP detail",addPJPDetail);
        debugger;
    },[addPJPDetail])
    const handleAddPJPDetail = () => {
        let pjpDetail=addPJPDetail;
        delete pjpDetail.dialogStatus;
        CreatePJP(pjpDetail, (res) => {
            debugger;
        }, (err) => {
            debugger;
        })
    }
    return (
        <>
            <Box>
                <TabContext value={value}>
                    <Box className="tab_row">
                        <TabList
                            className="client_profile_tab mb-2"
                            onChange={handleChange}
                        >
                            <Tab label="Today" value="TODAY" />
                            <Tab label="Tomorrow" value="TOMORROW" />
                            <Tab label="All" value="ALL" />
                        </TabList>
                        <Box>
                            <Button
                                onClick={() => setAddPJPdetail({ ...addPJPDetail, dialogStatus: true })}
                                className="common_button">+ Create</Button>
                            <img src={Filter} alt="Filter" />
                        </Box>
                    </Box>
                    <TabPanel value="TODAY">
                        <PJPScheduleTable pjpList={pjpList} />
                    </TabPanel>
                    <TabPanel value="TOMORROW">
                        <PJPScheduleTable pjpList={pjpList} />
                    </TabPanel>
                    <TabPanel value="ALL">
                        <PJPScheduleTable pjpList={pjpList} />
                    </TabPanel>
                </TabContext>
            </Box>
            <AddPJPDialog addPJPDetail={addPJPDetail} setAddPJPdetail={setAddPJPdetail} handleCloseDialog={handleCloseDialog} handleAddPJPDetail={handleAddPJPDetail} getLocation={getLocation} />
        </>
    )
}

export default PJPDetail