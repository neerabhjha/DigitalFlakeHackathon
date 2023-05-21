import React, { useState } from "react";
import "../Category/Category.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdProductionQuantityLimits } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

function Product() {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete() {
    try {
      setOpen(false);
      await axiosInstance.delete("/api/product/deleteProduct", {
        productId,
      });
      window.location.href = "/home/products";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="main-div">
        <div className="side-logo-div">
          <MdProductionQuantityLimits className="side-logo" />
          <h3>Products</h3>
        </div>
        <TextField id="outlined-search" label="Search" type="search" />
        {/* // Add new product */}
        <Button
          variant="contained"
          onClick={() => navigate("/home/addProduct")}
        >
          Add New
        </Button>
      </div>
      {/* // Product List */}
      <div className="table">
        <table>
          <tr className="table-title">
            <th>ID</th>
            <th>Name</th>
            <th>Pack Size</th>
            <th>Category</th>
            <th>MRP</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
          {user?.products?.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.packSize}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={product.image}
                  alt="product-img"
                  className="product-img"
                />
              </td>
              <td>{product.status}</td>
              {product.status === "Active" ? (
                <td>
                  <div onClick={handleClickOpen}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setProductId(product._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleDelete} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              ) : (
                <td>
                  <IconButton aria-label="delete" disabled color="primary">
                    <DeleteIcon />
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Product;
