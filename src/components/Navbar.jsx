import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooksBySearch } from "../actions/books";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setMobileOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(getBooksBySearch({ searchTerm }));
      navigate(`/books/search?searchQuery=${searchTerm}`);
    } else {
      navigate("/");
    }
    setMobileOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Mobile drawer content (without search)
  const drawer = (
    <Box sx={{ width: 250, padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#02495c" }}>
          Libe Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        <ListItem button onClick={() => handleNavigation("/")}>
          <ListItemText primary="Home" />
        </ListItem>
        
        <ListItem button onClick={() => handleNavigation("/about")}>
          <ListItemText primary="About" />
        </ListItem>

        {/* Admin only options */}
        {user?.isAdmin && (
          <>
            <ListItem button onClick={() => handleNavigation("/userslist")}>
              <ListItemText primary="Users" />
            </ListItem>
            
            <ListItem button onClick={() => handleNavigation("/checkedout-books")}>
              <ListItemText primary="Checked Out" />
            </ListItem>
            
            <ListItem button onClick={() => handleNavigation("/addbook")}>
              <ListItemText primary="Add Book" />
            </ListItem>
          </>
        )}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {/* User section */}
      <Box sx={{ p: 2 }}>
        {user ? (
          <>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
              Welcome, {user.username}
            </Typography>
            <Button
              onClick={handleLogout}
              variant="contained"
              fullWidth
              sx={{
                fontSize: "0.85rem",
                fontWeight: 400,
                backgroundColor: "#04857a",
                "&:hover": { backgroundColor: "#03665c" },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleNavigation("/login")}
            variant="contained"
            fullWidth
            sx={{
              fontSize: "0.85rem",
              fontWeight: 400,
              backgroundColor: "#04857a",
              "&:hover": { backgroundColor: "#03665c" },
            }}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#02495c", height: 80, justifyContent: 'center'}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: 'bold',
              fontSize: "2rem",
              
            }}
          >
            Libe
          </Typography>

          {/* Mobile Search - Centered */}
          <Box sx={{ 
            display: { xs: "flex", md: "none" }, 
            alignItems: "center", 
            backgroundColor: "white", 
            borderRadius: 1, 
            px: 1,
            mx: 1,
            flexGrow: 1,
            maxWidth: 230
          }}>
            <TextField
              variant="standard"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{ 
                disableUnderline: true, 
                sx: { fontSize: "0.9rem" } 
              }}
              sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleSearch} size="small">
              <SearchIcon sx={{ fontSize: "1.1rem", color: "black" }} />
            </IconButton>
          </Box>

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Button component={RouterLink} to="/" sx={{ color: "white", fontSize: "0.8rem", fontWeight: 200 }}>
              Home
            </Button>
            <Button sx={{ color: "white", fontSize: "0.8rem", fontWeight: 200 }}>
              About
            </Button>

            {/* Admin only */}
            {user?.isAdmin && (
              <>
                <Button component={RouterLink} to="/userslist" sx={{ color: "white", fontSize: "0.8rem", fontWeight: 200 }}>
                  Users
                </Button>
                <Button component={RouterLink} to="/checkedout-books" sx={{ color: "white", fontSize: "0.8rem", fontWeight: 200 }}>
                  Checked Out
                </Button>
                <Button
                  component={RouterLink}
                  to="/addbook"
                  variant="contained"
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 300,
                    backgroundColor: "#ad8d0a",
                    "&:hover": { backgroundColor: "#8c7208" },
                  }}
                >
                  Add Book
                </Button>
              </>
            )}

            {/* Desktop Search */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 1,
                px: 1,
                ml: 1,
              }}
            >
              <TextField
                variant="standard"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                InputProps={{ disableUnderline: true, sx: { fontSize: "1rem" } }}
                sx={{ minWidth: 150 }}
              />
              <IconButton onClick={handleSearch} size="small">
                <SearchIcon sx={{ fontSize: "1.1rem", color: "black" }} />
              </IconButton>
            </Box>
          </Box>

          {/* Right Section - Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5, alignItems: "center" }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: "white", textTransform: "uppercase", fontWeight: 500 }}
                >
                  {user.username}
                </Typography>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    backgroundColor: "#04857a",
                    "&:hover": { backgroundColor: "#03665c" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  backgroundColor: "#04857a",
                  "&:hover": { backgroundColor: "#03665c" },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}