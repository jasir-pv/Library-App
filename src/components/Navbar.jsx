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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(getBooksBySearch({ searchTerm }));
      navigate(`/books/search?searchQuery=${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#02495c", height: 80, justifyContent: 'center'}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 'bold', // lighter than bold
            fontSize: "2rem", // smaller than default h5
          }}
        >
          Libe
        </Typography>

        {/* Links */}
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

          {/* Search */}
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

        {/* Right Section */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
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
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
