import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import "./style/Header.css";
import PersonIcon from "@mui/icons-material/Person";

const pages = ["For Families ", "For Nannies"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = ({ handleClick, families }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleHeaderButtons = (event) => {
    const linkTo = event.target.innerText;
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  const handleClickButton = () => {
    // handleClick();
    console.log(families, "families");

    console.log(handleClick, "typeof");
  };
  return (
    <AppBar className="header_container" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              NannyShare
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleHeaderButtons}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleHeaderButtons}>
                <Link to="/families">
                  {" "}
                  <Button variant="text" onClick={() => handleClick()}>
                    Families
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleHeaderButtons}>
                <Link to="/nannies">
                  {" "}
                  <Button variant="text">Nannies</Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/">NannyShare</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem onClick={handleHeaderButtons}>
              <Link to="/families">
                {" "}
                <Button onClick={handleClickButton} variant="text">
                  Families
                </Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleHeaderButtons}>
              <Link to="/nannies">
                {" "}
                <Button variant="text">Nannies</Button>
              </Link>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <Button
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                startIcon={<PersonIcon />}
                aria-haspopup="true"
              >
                <Typography>My Profile</Typography>
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link to="/families/my_profile">
                  <Button sx={{ mt: 1 }}>View Profile</Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/dashboard">
                  <Button sx={{ mt: 1 }}>Dashboard</Button>
                </Link>
              </MenuItem>
              {error && <Alert severity="warning">{error}</Alert>}
              <MenuItem onClick={handleLogout}>
                <Button sx={{ mt: 1 }} onClick={handleLogout}>
                  Log out
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
