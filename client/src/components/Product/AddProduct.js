import React, { useState } from "react";
import "./AddProduct.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { BiImageAdd } from "react-icons/bi";

function AddProduct() {
  const { user } = useSelector((state) => state.userReducer);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  async function handleClick() {
    try {
      await axiosInstance.post("/api/product/createProduct", {
        name,
        category,
        packSize,
        price,
        status,
        image,
      });
      window.location.href = "/home/products";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-container">
      <div className="main">
        <AiOutlineArrowLeft
          className="side-logo"
          onClick={() => navigate("/home/products")}
        />
        <span className="add-product">Add Product</span>
        <div className="fields">
          <div className="all-fields">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              className="select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {user?.categories?.map((category) => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="all-fields">
            <TextField
              id="outlined-search"
              label="Product Name"
              type="search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="all-fields">
            <TextField
              id="outlined-search"
              label="Pack Size"
              type="search"
              value={packSize}
              onChange={(e) => setPackSize(e.target.value)}
            />
          </div>

          <div className="all-fields">
            <TextField
              id="outlined-search"
              label="MRP"
              type="search"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="all-fields">
            <label htmlFor="file-input" className="cursor-pointer">
              <BiImageAdd className="file-upload-logo" /> Upload Image
            </label>
            <input
              type="file"
              onChange={onFileSelect}
              className="file-input"
              id="file-input"
            />
          </div>

          <div className="all-fields">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              className="select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </div>
        </div>

        <div className="btn">
          <div className="btn1">
            <Button
              variant="outlined"
              onClick={() => navigate("/home/products")}
            >
              Cancle
            </Button>
          </div>
          <div className="btn1">
            <Button variant="contained" onClick={handleClick}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
