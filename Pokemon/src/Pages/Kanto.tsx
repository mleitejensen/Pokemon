import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Areas {
  locations: Array<Area>;
}
interface Area {
  name: string;
  pokemon: Array<Pokemon>;
}

interface Pokemon {
  name: string;
  id: number;
  image: string;
}

const Kanto = () => {
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>();

  const initialState: Areas = { locations: [] };
  const [areas, setAreas] = useState<Areas>(initialState);

  const handleOpen = (area: string) => {
    setSelectedArea(area);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getLocations = async () => {
    const locationMap: { [key: string]: Area } = {};

    for (let i = 1; i <= 150; i++) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${i}/encounters`
        );
        const json: Array<{ location_area: { name: string } }> =
          await response.json();

        const detailsResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokemonDetails = await detailsResponse.json();
        const newPokemon: Pokemon = {
          name: pokemonDetails.name,
          id: pokemonDetails.id,
          image: pokemonDetails.sprites.front_default,
        };

        json.forEach((element) => {
          const locationName = element.location_area.name;
          if (
            locationName.includes("kanto") ||
            locationName.includes("viridian") ||
            locationName.includes("cinnabar") ||
            locationName.includes("indigo") ||
            locationName.includes("mt-moon") ||
            locationName.includes("seafoam") ||
            locationName.includes("rock-tunnel") ||
            locationName.includes("kanto-safari-zone")
          ) {
            if (!locationMap[locationName]) {
              locationMap[locationName] = { name: locationName, pokemon: [] };
            }

            if (
              !locationMap[locationName].pokemon.some(
                (p) => p.id === newPokemon.id
              )
            ) {
              locationMap[locationName].pokemon.push(newPokemon);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const newLocations = Object.values(locationMap);
    console.log(newLocations);
    setAreas({ locations: newLocations });
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedArea}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            List of pokemon in area here...
          </Typography>
        </Box>
      </Modal>

      <h1>Kanto</h1>
      <div className="imageDiv">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3bddf750-53a0-4a9f-872f-8d13685a758f/d3c4hsg-5acbd78f-c4cb-4f40-a87a-05700ac859a4.png/v1/fill/w_900,h_883,q_80,strp/labeled_map_of_kanto_by_rythos_d3c4hsg-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODgzIiwicGF0aCI6IlwvZlwvM2JkZGY3NTAtNTNhMC00YTlmLTg3MmYtOGQxMzY4NWE3NThmXC9kM2M0aHNnLTVhY2JkNzhmLWM0Y2ItNGY0MC1hODdhLTA1NzAwYWM4NTlhNC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VhSNiL_oKJgugWzSc1MX-qJ2zPGcgwOHyEzjI9LlM-E"
          alt=""
        ></img>
        <Tooltip title="Indigo Plateau">
          <div
            onClick={() => handleOpen("Indigo Plateau")}
            className="indigoPlateau area"
          ></div>
        </Tooltip>
        <Tooltip title="Victory Road">
          <div
            onClick={() => handleOpen("Victory Road")}
            className="victoryRoad area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 23">
          <div
            onClick={() => handleOpen("Route 23")}
            className="route23 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 22">
          <div
            onClick={() => handleOpen("Route 22")}
            className="route22 area"
          ></div>
        </Tooltip>
        <Tooltip title="Viridian City">
          <div
            onClick={() => handleOpen("Viridian City")}
            className="viridianCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 1">
          <div
            onClick={() => handleOpen("Route 1")}
            className="route1 area"
          ></div>
        </Tooltip>
        <Tooltip title="Pallet Town">
          <div
            onClick={() => handleOpen("Pallet Town")}
            className="palletTown area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 21">
          <div
            onClick={() => handleOpen("Route 21")}
            className="route21 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 2">
          <div
            onClick={() => handleOpen("Route 2")}
            className="route2 area"
          ></div>
        </Tooltip>
        <Tooltip title="Viridian Forest">
          <div
            onClick={() => handleOpen("Viridian Forest")}
            className="viridianForest area"
          ></div>
        </Tooltip>
        <Tooltip title="Pewter City">
          <div
            onClick={() => handleOpen("Pewter City")}
            className="pewterCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 3">
          <div
            onClick={() => handleOpen("Route 3")}
            className="route3 area"
          ></div>
        </Tooltip>
        <Tooltip title="Mount Moon">
          <div
            onClick={() => handleOpen("Mount Moon")}
            className="mountainMoon area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 4">
          <div
            onClick={() => handleOpen("Route 4")}
            className="route4 area"
          ></div>
        </Tooltip>
        <Tooltip title="Cerulean City">
          <div
            onClick={() => handleOpen("Cerulean City")}
            className="ceruleanCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 24">
          <div
            onClick={() => handleOpen("Route 24")}
            className="route24 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 25">
          <div
            onClick={() => handleOpen("Route 25")}
            className="route25 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 5">
          <div
            onClick={() => handleOpen("Route 5")}
            className="route5 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 6">
          <div
            onClick={() => handleOpen("Route 6")}
            className="route6 area"
          ></div>
        </Tooltip>
        <Tooltip title="Vermilion City">
          <div
            onClick={() => handleOpen("Vermilion City")}
            className="vermilionCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 7">
          <div
            onClick={() => handleOpen("Route 7")}
            className="route7 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 11">
          <div
            onClick={() => handleOpen("Route 11")}
            className="route11 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 12">
          <div
            onClick={() => handleOpen("Route 12")}
            className="route12 area"
          ></div>
        </Tooltip>
        <Tooltip title="Lavender Town">
          <div
            onClick={() => handleOpen("Lavender Town")}
            className="lavenderTown area"
          ></div>
        </Tooltip>
        <Tooltip title="Rock Tunnel">
          <div
            onClick={() => handleOpen("Rock Tunnel")}
            className="rockTunnel area"
          ></div>
        </Tooltip>
        <Tooltip title="Power Plant">
          <div
            onClick={() => handleOpen("Power Plant")}
            className="powerPlant area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 9">
          <div
            onClick={() => handleOpen("Route 9")}
            className="route9 area"
          ></div>
        </Tooltip>
        <Tooltip title="Celadon City">
          <div
            onClick={() => handleOpen("Celadon City")}
            className="celadonCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 8">
          <div
            onClick={() => handleOpen("Route 8")}
            className="route8 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 16">
          <div
            onClick={() => handleOpen("Route 16")}
            className="route16 area"
          ></div>
        </Tooltip>
        <Tooltip title="Cycling Road">
          <div
            onClick={() => handleOpen("Cycling Road")}
            className="cyclingRoad area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 18">
          <div
            onClick={() => handleOpen("Route 18")}
            className="route18 area"
          ></div>
        </Tooltip>
        <Tooltip title="Safari Zone">
          <div
            onClick={() => handleOpen("Safari Zone")}
            className="safariZone area"
          ></div>
        </Tooltip>
        <Tooltip title="Fuchsia City">
          <div
            onClick={() => handleOpen("Fuchsia City")}
            className="fuchsiaCity area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 13">
          <div
            onClick={() => handleOpen("Route 13")}
            className="route13 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 14">
          <div
            onClick={() => handleOpen("Route 14")}
            className="route14 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 15">
          <div
            onClick={() => handleOpen("Route 15")}
            className="route15 area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 19">
          <div
            onClick={() => handleOpen("Route 19")}
            className="route19 area"
          ></div>
        </Tooltip>
        <Tooltip title="Seafoam Islands">
          <div
            onClick={() => handleOpen("Seafoam Islands")}
            className="seafoamIslands area"
          ></div>
        </Tooltip>
        <Tooltip title="Route 20">
          <div
            onClick={() => handleOpen("Route 20")}
            className="route20 area"
          ></div>
        </Tooltip>
        <Tooltip title="Cinnabar Island">
          <div
            onClick={() => handleOpen("Cinnabar Island")}
            className="cinnabarIsland area"
          ></div>
        </Tooltip>
      </div>
    </>
  );
};

export default Kanto;
