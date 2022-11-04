import React, { useState, useEffect, useContext } from "react";
import { Box, Tabs, Tab, Button, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddProductDialog from "./AddProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import { GetAdminProductList } from "../../services/apiservices/adminprofile";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Context as AuthContext } from "../../context/authContext/authContext";

const ProductList = () => {
  const { flagLoader, permissions } = useContext(AuthContext).state;

  const [addProductDialogControl, setAddProductDialogControl] = useState({
    status: false,
    id: null,
    name: "",
    type: "",
  });
  const [DeleteProductDialogControl, setDeleteProductDialogControl] = useState({
    status: false,
    id: null,
    type: ""
  });
  const [value, setValue] = useState('ProductList');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [AdminProductList, setAdminProductList] = useState([]);
  useEffect(() => {
    GetAdminProductList(
      {},
      (res) => {
        if (res.status === 200) {
          setAdminProductList(res?.data?.products);
          //
        }
      },
      (err) => {
        console.log("Printing Error", err);
        //
      }
    );
  }, [addProductDialogControl.status, DeleteProductDialogControl.status]);
  const handleClose = () => {
    setDeleteProductDialogControl({
      ...DeleteProductDialogControl,
      status: false,
    });
    setAddProductDialogControl({ ...addProductDialogControl, status: false, id: null });
  };
  return (
    <>
      <TabContext value={value}>
        <div className="add_product_button py-3">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="ProductList" label="ProductList" />
            <Tab value="MachineList" label="MachineList" />
          </Tabs>
          {permissions?.editProduct && <Button
            onClick={() => {
              setAddProductDialogControl({
                ...addProductDialogControl,
                status: true,
              });
            }}
            // variant="contained"
            className="main_button"
          >
            + Add Product
          </Button>}
        </div>
        <Box className="product_list_section bg-body">
          <TabPanel value="ProductList">
            <div className="p-2 h-75">
              <Box className="h-75">
                {AdminProductList.map((row) => {
                  return (
                    <>
                      {row.type === "PRODUCT" && (
                        <Box className="setting_cards">
                          <Typography variant="span">{row.name}</Typography>
                          <Box className="product_buttons">
                            {permissions?.editProduct && <EditRoundedIcon
                              onClick={() => {
                                setAddProductDialogControl({
                                  ...addProductDialogControl,
                                  id: row.id,
                                  status: true,
                                  name: row.name,
                                  type: row.type,
                                });
                              }}
                            />}
                            {permissions?.deleteProduct && <DeleteRoundedIcon
                              onClick={() => {
                                setDeleteProductDialogControl({
                                  ...DeleteProductDialogControl,
                                  id: row.id,
                                  status: true,
                                  type: row.type,
                                });
                              }}
                            />}
                          </Box>
                        </Box>
                      )}
                    </>
                  );
                })}
              </Box>
            </div>
          </TabPanel>
          <div>
            <TabPanel value="MachineList">
              <Box className="p-2 h-75">
                {AdminProductList.map((row) => {
                  return (
                    <>
                      {row.type === "MACHINE" && (
                        <Box className="setting_cards">
                          <Typography variant="span">{row.name}</Typography>
                          <Box className="product_buttons">
                            {permissions?.editProduct && <EditRoundedIcon
                              onClick={() => {
                                setAddProductDialogControl({
                                  ...addProductDialogControl,
                                  id: row.id,
                                  status: true,
                                  name: row.name,
                                  type: row.type,
                                });
                              }}
                            />}
                            {permissions?.deleteProduct && <DeleteRoundedIcon
                              onClick={() => {
                                setDeleteProductDialogControl({
                                  ...DeleteProductDialogControl,
                                  id: row.id,
                                  status: true,
                                  type: row.type,
                                });
                              }}
                            />}
                          </Box>
                        </Box>
                      )}
                    </>
                  );
                })}
              </Box>
            </TabPanel>
          </div>
        </Box>
      </TabContext >
      <AddProductDialog
        addProductDialogControl={addProductDialogControl}
        handleClose={handleClose}
      />
      <DeleteProductDialog
        DeleteProductDialogControl={DeleteProductDialogControl}
        handleClose={handleClose}
      />
    </>
  );
};

export default ProductList;
