import React from "react";
import { useNavigate } from "react-router-dom";
import { TbBrandDolbyDigital } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import "./Navbar.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function logOut() {
    try {
      setOpen(false);
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="Navbar">
        <div className="container">
          <div className="banner">
            <TbBrandDolbyDigital className="logo1" />
            <h2>DigitalFlake</h2>
          </div>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              <CgProfile />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to log out?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={logOut} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="sideBar">
        <div className="container">
          <div className="left-part">
            <div className="home">
              <span>
                <AiOutlineHome /> <span>Home</span>
              </span>
              <BsArrowRightSquareFill className="arrow" />
            </div>
            <div className="home">
              <span>
                <BiCategory /> <span>Category</span>
              </span>
              <BsArrowRightSquareFill />
            </div>
            <div className="home">
              <span>
                <MdProductionQuantityLimits /> <span>Products</span>{" "}
              </span>
              <BsArrowRightSquareFill />
            </div>
          </div>

          <div className="right-part"></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
