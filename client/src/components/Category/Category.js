import React, { useState } from "react";
import "./Category.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "../../utils/axiosInstance";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Category() {
  const { user } = useSelector((state) => state.userReducer);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // creating category
  async function handleSubmit() {
    try {
      await axiosInstance.post("/api/category/createCategory", {
        name,
        description,
        status,
      });
      window.location.href = "/home/categories";
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  // deleting category
  async function handleDelete() {
    try {
      setOpenDelete(false);
      await axiosInstance.delete("/api/category/deleteCategory", {
        categoryId,
      });
      window.location.href = "/home/categories";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="main-div">
        <div className="side-logo-div">
          <BiCategory className="side-logo" />
          <h3>Categories</h3>
        </div>
        <TextField id="outlined-search" label="Search" type="search" />
        {/* // Add new category */}
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            Add New
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <TextField
                id="outlined-search"
                label="Category Name"
                type="search"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                id="outlined-search"
                label="Description"
                type="search"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DialogContent>
            <DialogContent>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      {/* // Cataegory List */}
      <div className="table">
        <table>
          <tr className="table-title">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {user?.categories?.map((category) => (
            <tr>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.status}</td>
              {category.status === "Active" ? (
                <td>
                  <div onClick={() => setOpenDelete(true)}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setCategoryId(category._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Dialog
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
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

export default Category;
