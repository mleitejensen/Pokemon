import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
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
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/kanto")}
          label="Gen 1"
          icon={<CatchingPokemonIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/kanto")}
          label="Coming soon"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
