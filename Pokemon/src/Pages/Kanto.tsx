import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
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

  const [isLoading, setIsLoading] = useState(true);

  const initialState: Areas = { locations: [] };
  const [areas, setAreas] = useState<Areas>(initialState);

  const navigate = useNavigate();

  const handleOpen = (area: string) => {
    setSelectedArea(area);
    console.log(area);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
    setIsLoading(false);
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
        aria-labelledby="scroll-modal-title"
        aria-describedby="scroll-modal-description"
      >
        <Box sx={style} maxHeight={800} className="areaBox">
          <Typography
            id="scroll-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            {selectedArea && capitalizeFirstLetter(selectedArea)}
          </Typography>
          <Typography
            className="grid"
            id="scroll-modal-description"
            sx={{ mt: 2 }}
          >
            {selectedArea && (
              <>
                {areas.locations
                  .filter((location: Area) =>
                    location.name.includes(selectedArea)
                  ) // Match all locations with similar area names
                  .flatMap((location: Area) => location.pokemon) // Flatten the Pokémon arrays from all matched areas into one array
                  .reduce<Pokemon[]>((unique, poke) => {
                    // Filter Pokémon based on unique name
                    if (!unique.some((p) => p.name === poke.name)) {
                      unique.push(poke);
                    }
                    return unique;
                  }, [])
                  .sort((a, b) => a.id - b.id)
                  .map((poke: Pokemon) => (
                    <Card
                      className="gridItem"
                      key={poke.id}
                      sx={{ maxWidth: "100%", margin: "5px" }}
                    >
                      <CardActionArea
                        sx={{ height: "100%" }}
                        onClick={() => navigate("/pokemon/" + poke.name)}
                      >
                        <CardMedia
                          sx={{
                            margin: "auto",
                            minHeight: 200,
                            minWidth: 200,
                          }}
                          image={poke.image}
                          title={poke.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            #{poke.id} {capitalizeFirstLetter(poke.name)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
              </>
            )}
          </Typography>
        </Box>
      </Modal>

      <h1>Kanto</h1>
      {isLoading && (
        <Skeleton width={900} height={883} sx={{ margin: "auto" }}></Skeleton>
      )}

      {!isLoading && (
        <div className="imageDiv">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3bddf750-53a0-4a9f-872f-8d13685a758f/d3c4hsg-5acbd78f-c4cb-4f40-a87a-05700ac859a4.png/v1/fill/w_900,h_883,q_80,strp/labeled_map_of_kanto_by_rythos_d3c4hsg-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODgzIiwicGF0aCI6IlwvZlwvM2JkZGY3NTAtNTNhMC00YTlmLTg3MmYtOGQxMzY4NWE3NThmXC9kM2M0aHNnLTVhY2JkNzhmLWM0Y2ItNGY0MC1hODdhLTA1NzAwYWM4NTlhNC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VhSNiL_oKJgugWzSc1MX-qJ2zPGcgwOHyEzjI9LlM-E"
            alt=""
          ></img>
          <Tooltip title="Indigo Plateau">
            <div
              onClick={() => handleOpen("indigo-plateau")}
              className="indigoPlateau area"
            ></div>
          </Tooltip>
          <Tooltip title="Victory Road">
            <div
              onClick={() => handleOpen("victory-road")}
              className="victoryRoad area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 23">
            <div
              onClick={() => handleOpen("route-23")}
              className="route23 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 22">
            <div
              onClick={() => handleOpen("route-22")}
              className="route22 area"
            ></div>
          </Tooltip>
          <Tooltip title="Viridian City">
            <div
              onClick={() => handleOpen("viridian-city")}
              className="viridianCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 1">
            <div
              onClick={() => handleOpen("route-1")}
              className="route1 area"
            ></div>
          </Tooltip>
          <Tooltip title="Pallet Town">
            <div
              onClick={() => handleOpen("pallet-town")}
              className="palletTown area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 21">
            <div
              onClick={() => handleOpen("route-21")}
              className="route21 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 2">
            <div
              onClick={() => handleOpen("route-2")}
              className="route2 area"
            ></div>
          </Tooltip>
          <Tooltip title="Viridian Forest">
            <div
              onClick={() => handleOpen("viridian-forest")}
              className="viridianForest area"
            ></div>
          </Tooltip>
          <Tooltip title="Pewter City">
            <div
              onClick={() => handleOpen("pewter-city")}
              className="pewterCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 3">
            <div
              onClick={() => handleOpen("route-3")}
              className="route3 area"
            ></div>
          </Tooltip>
          <Tooltip title="Mount Moon">
            <div
              onClick={() => handleOpen("mt-moon")}
              className="mountainMoon area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 4">
            <div
              onClick={() => handleOpen("route-4")}
              className="route4 area"
            ></div>
          </Tooltip>
          <Tooltip title="Cerulean City">
            <div
              onClick={() => handleOpen("cerulean-city")}
              className="ceruleanCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 24">
            <div
              onClick={() => handleOpen("route-24")}
              className="route24 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 25">
            <div
              onClick={() => handleOpen("route-25")}
              className="route25 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 5">
            <div
              onClick={() => handleOpen("route-5")}
              className="route5 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 6">
            <div
              onClick={() => handleOpen("route-6")}
              className="route6 area"
            ></div>
          </Tooltip>
          <Tooltip title="Vermilion City">
            <div
              onClick={() => handleOpen("vermilion-city")}
              className="vermilionCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 7">
            <div
              onClick={() => handleOpen("route-7")}
              className="route7 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 11">
            <div
              onClick={() => handleOpen("route-11")}
              className="route11 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 12">
            <div
              onClick={() => handleOpen("route-12")}
              className="route12 area"
            ></div>
          </Tooltip>
          <Tooltip title="Lavender Town">
            <div
              onClick={() => handleOpen("lavender-town")}
              className="lavenderTown area"
            ></div>
          </Tooltip>
          <Tooltip title="Rock Tunnel">
            <div
              onClick={() => handleOpen("rock-tunnel")}
              className="rockTunnel area"
            ></div>
          </Tooltip>
          <Tooltip title="Power Plant">
            <div
              onClick={() => handleOpen("power-plant")}
              className="powerPlant area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 9">
            <div
              onClick={() => handleOpen("route-9")}
              className="route9 area"
            ></div>
          </Tooltip>
          <Tooltip title="Celadon City">
            <div
              onClick={() => handleOpen("celadon-city")}
              className="celadonCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 8">
            <div
              onClick={() => handleOpen("route-8")}
              className="route8 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 16">
            <div
              onClick={() => handleOpen("route-16")}
              className="route16 area"
            ></div>
          </Tooltip>
          <Tooltip title="Cycling Road">
            <div
              onClick={() => handleOpen("cycling-road")}
              className="cyclingRoad area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 18">
            <div
              onClick={() => handleOpen("route-18")}
              className="route18 area"
            ></div>
          </Tooltip>
          <Tooltip title="Safari Zone">
            <div
              onClick={() => handleOpen("safari-zone")}
              className="safariZone area"
            ></div>
          </Tooltip>
          <Tooltip title="Fuchsia City">
            <div
              onClick={() => handleOpen("fuchsia-city")}
              className="fuchsiaCity area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 13">
            <div
              onClick={() => handleOpen("route-13")}
              className="route13 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 14">
            <div
              onClick={() => handleOpen("route-14")}
              className="route14 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 15">
            <div
              onClick={() => handleOpen("route-15")}
              className="route15 area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 19">
            <div
              onClick={() => handleOpen("route-19")}
              className="route19 area"
            ></div>
          </Tooltip>
          <Tooltip title="Seafoam Islands">
            <div
              onClick={() => handleOpen("seafoam-islands")}
              className="seafoamIslands area"
            ></div>
          </Tooltip>
          <Tooltip title="Route 20">
            <div
              onClick={() => handleOpen("route-20")}
              className="route20 area"
            ></div>
          </Tooltip>
          <Tooltip title="Cinnabar Island">
            <div
              onClick={() => handleOpen("cinnabar-island")}
              className="cinnabarIsland area"
            ></div>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Kanto;
