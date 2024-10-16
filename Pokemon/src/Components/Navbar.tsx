import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate("/")}
          label="Home"
          icon={<HouseIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/Kanto")}
          label="Kanto"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/fetch")}
          label="Gen 1"
          icon={<CatchingPokemonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
