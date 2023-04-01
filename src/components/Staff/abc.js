;<Box sx={{ backgroundColor: '#f1f2f6' }} className="team_profile_section">
  <Box
    sx={{ marginBottom: '10px' }}
    // className="occassional_holiday_section"
    className="left_panel"
  >
    <Box className="holiday_inner_class">
      <Box sx={{ justifyContent: 'space-between' }} className="team_header">
        <Typography
          sx={{ marginRight: '58px', color: '#8E8E8E' }}
          variant="span"
          pl={1}
        >
          Detail
        </Typography>
        <FormControl variant="outlined">
          <OutlinedInput
            sx={{ marginLeft: '6px' }}
            className="search_field"
            placeholder="Search Here..."
            startAdornment={
              <InputAdornment position="start">
                <IconButton>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          // onClick={() => {
          //   setAddHolidayDetail({ ...addHolidayDetail, regular: true });
          //   setAddHolidayDialog({ ...addHolidayDialog, status: true });
          // }}
          // color="secondary"
          sx={{
            float: 'right',
            // font: '#2E3591',
            // marginRight: '2px',
            // backgroundColor: '#FFFFFF',
          }}
          className="add_team_buttn search_field"
          variant="span"
        >
          + Add Team
        </Button>
        <Toolbar>
          <IconButton
            // sx={{ marginLeft: '9px' }}
            edge="end"
            // onClick={handleDrawerOpen}
            // sx={{ ...(open && { display: 'none' }) }}
          >
            <img src={FilterIcon} alt="" />
          </IconButton>
        </Toolbar>

        <Drawer
          sx={{
            width: 2,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <Box className="d-flex justify-content-between column w-100 align-items-center">
              <Box className="d-flex column justify-content-between w-50 align-items-center">
                <IconButton
                  // sx={{ paddingRight: '10px' }}
                  // sx={{ paddingRight: '12rem' }}
                  // className="pe-5"
                  disableRipple={true}
                  onClick={handleDrawerClose}
                >
                  {/* {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                ) : (
                  <ChevronRightIcon sx={{ fontSize: '30px' }} />
                )} */}
                </IconButton>

                <Typography sx={{ fontSize: '16px', paddingRight: '80px' }}>
                  Filter By
                </Typography>
              </Box>
              <Box className=" d-flex justify-content-end row w-50">
                <Typography sx={{ textAlign: 'end' }}>Clear All</Typography>
              </Box>
            </Box>
          </DrawerHeader>
          <Divider />
          <Box className="py-3">
            <div className="row px-3">
              <div className="col-md-12 mb-1">
                <Typography variant="span">Location</Typography>
              </div>
              <div className="mb-4">
                <TextField
                  // inputProps={{
                  //   style: {
                  //     height: '50px',
                  //   },
                  // }}
                  className="w-100 h-500"
                  placeholder="Enter Location"
                  variant="outlined"
                />
              </div>
              <div className="col-md-12">
                <Typography variant="span">Customer Stage</Typography>
              </div>

              <Autocomplete
                className="mt-1 mx-2 align-items-center d-flex client_type_select justify-content-center "
                options={clientType}
                value={clientStage !== null ? clientType[clientStage] : null}
                onChange={(e, value) => {
                  console.log(value)
                  setClientStage(value?.id)
                }}
                getOptionLabel={option => option.stage}
                renderInput={params => (
                  <TextField
                    // className="m-3"
                    variant="outlined"
                    // sx={{ width: '24rem' }}
                    {...params}
                    placeholder="Confirm"
                  />
                )}
              />
            </div>
          </Box>
        </Drawer>
      </Box>
      <Box className="left_team_profile_section">
        {/* <TableContainer className="mt-2"> */}
        <TableContainer>
          <Table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '0px 8px',
              // borderRadius: '5px',
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f1f2f6' }}>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Attendance</TableCell>
                <TableCell align="left">Points</TableCell>
              </TableRow>
            </TableHead>
            <Divider
              sx={{ borderColor: '#C4C4C4' }}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <TableBody>
              {staffDetailList.map((row, index) => (
                <TableRow
                  // borderCollapse="separate"
                  // borderSpacing="0px 4px"
                  key={row.id}
                  // style={{ borderRadius: 5 }}
                  sx={{
                    // borderCollapse: 'separate',
                    // borderSpacing: '8px 8px',
                    backgroundColor: '#FFFFFF',
                    // borderCollapse: 'separate',
                    // marginBottom: '10px',
                    // border:'2px solid black'
                    // '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      // marginTop: '10px',
                      // padding: '3',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      fontSize: '15px',
                      float: 'left',
                    }}
                    // className="m-4"
                    align="left"
                  >
                    {/* <AddRoundedIcon /> */}
                    <Avatar
                      className="me-2"
                      sx={{ width: 40, height: 40 }}
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  {/* <TableCell>{row.name}</TableCell> */}
                  <TableCell align="left">{row.role.name}</TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Box>

  {/* starting of SECOND section */}
  <Box className="right_panel">
    <Box
      //  sx={{ backgroundColor: '#FFFFFF' }}
      sx={{
        // border: '1px solid black',
        borderRadius: '5px',
        height: '800px',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box className="userName_and_position">
        {/* <img src={ProfileImg} alt="profile" /> */}
        <AccountCircleRoundedIcon
          // src={BenedictPhoto}
          className="userprofile_dummy_icon"
          sx={{
            paddingTop: 2,
          }}
        />
        {/* <img
        src={BenedictPhoto}
        className="userprofile_dummy_icon"
        sx={{
          padding: 5,
        }}
      /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // marginLeft: 2,
          }}
        >
          <Typography
            // variant="span"
            sx={{
              fontWeight: 'bold',
              fontSize: '26px',
              paddingRight: '190px',
            }}
          >
            Benedict
            <img className="ml-1 p-1" alt="" />
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            {/* {clientProfileDetail?.business} */}
            Sr. Sales Person
          </Typography>
        </Box>
      </Box>

      <Box className="mt-3 mb-4 mx-2">
        <Box
          className="m-3 me-5"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography variant="span" sx={{ fontWeight: 'bold' }}>
            Contact
          </Typography>
          <Typography className="mx-5" variant="span">
            +91 8549054308
          </Typography>
          <Button
            sx={{
              backgroundColor: '#F1F2F6',
              float: 'right',
            }}
          >
            View Profile
          </Button>
        </Box>
        <Box className="m-3 me-5">
          <Typography variant="span" sx={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <Typography
            sx={{ paddingLeft: '25px' }}
            className="mx-5"
            variant="span"
          >
            benedictdfkl@gmail.com
          </Typography>
        </Box>
        <Box className="m-3  me-5">
          <Typography variant="span" sx={{ fontWeight: 'bold' }}>
            Location
          </Typography>
          <Typography className="mx-5" variant="span">
            Office
          </Typography>
        </Box>
      </Box>

      <Box
        // sx={{ display: 'flex', flexDirection: 'row' }}
        className="mt-3"
      >
        <Typography className="px-3">Inquiry Status</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '14px',
            marginLeft: '16px',
          }}
        >
          <Box className="inner_profile_details first_box m-1 p-2">
            <Typography>Total Inquiry</Typography>
            <Typography>24</Typography>
          </Box>

          <Box className="inner_profile_details middle_box m-1 p-2">
            <Typography>Attend</Typography>
            <Typography>10</Typography>
          </Box>

          <Box className="inner_profile_details last_box m-1 p-2">
            <Typography>Avg. Response</Typography>
            <Typography>5 Min</Typography>
          </Box>
        </Box>

        <Typography className="px-3">Attendance</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '14px',
            marginLeft: '16px',
          }}
        >
          <Box className="inner_profile_details first_box m-1 p-2">
            <Typography>Total Days</Typography>
            <Typography>24</Typography>
          </Box>

          <Box className="inner_profile_details middle_box m-1 p-2">
            <Typography>Absent</Typography>
            <Typography>10</Typography>
          </Box>

          <Box className="inner_profile_details  last_box m-1 p-2">
            <Typography>Late</Typography>
            <Typography>5d</Typography>
          </Box>
        </Box>

        <Typography className="px-3">Target</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '14px',
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <Box className="inner_profile_details first_box m-1 p-2">
            <Typography>Total Days</Typography>
            <Typography>24</Typography>
          </Box>

          <Box className="inner_profile_details middle_box m-1 p-2">
            <Typography>Total Order</Typography>
            <Typography>10</Typography>
          </Box>

          <Box className="inner_profile_details last_box m-1 p-2">
            <Typography>Achieved</Typography>
            <Typography>5d</Typography>
          </Box>
        </Box>

        <Typography className="px-3">Expense</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '16px' }}>
          <Box className="inner_profile_details first_box  m-1 p-2">
            <Typography>Approved</Typography>
            <Typography>24</Typography>
          </Box>

          <Box className="inner_profile_details middle_box m-1 p-2">
            <Typography>Pending</Typography>
            <Typography>10</Typography>
          </Box>

          <Box className="inner_profile_details last_box m-1 p-2">
            <Typography>Rejected</Typography>
            <Typography>5d</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
</Box>
