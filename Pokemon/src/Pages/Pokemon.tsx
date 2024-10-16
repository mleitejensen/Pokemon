import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

import Divider from "@mui/material/Divider";

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string | undefined;
  };
  moves: Array<Move>;
  types: Array<Types>;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    const json = await response.json();
    setPokemon(json);
    console.log(json);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`${pokemon?.moves[index].move.name}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  const checkType = (type: string) => {
    if (type === "ground") {
      return "#70461e solid 2px";
    }
    if (type === "rock") {
      return "#515455aa solid 2px";
    }
    if (type === "electric") {
      return "yellow solid 2px";
    }
    if (type === "water") {
      return "blue solid 2px";
    }
    if (type === "fire") {
      return "red solid 2px";
    }
    if (type === "flying") {
      return "grey solid 2px";
    }
    if (type === "normal") {
      return "white solid 2px";
    }
    if (type === "poison") {
      return "purple solid 2px";
    }
    if (type === "bug") {
      return "green solid 2px";
    }
    if (type === "grass") {
      return "#0a570a solid 2px";
    }
    if (type === "fighting") {
      return "#70231e solid 2px";
    }
    if (type === "steel") {
      return "#98b6c0 solid 2px";
    }
    if (type === "ghost") {
      return "#410c41 solid 2px";
    }
    if (type === "psychic") {
      return "#f7a0ae solid 2px";
    }
    if (type === "dragon") {
      return "black solid 2px";
    }
    if (type === "ice") {
      return "#00d9ff solid 2px";
    }

    return "black solid 2px";
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <>
          <Box
            sx={{
              display: "flex",
              width: 400,
              margin: "auto",
            }}
          >
            <Card sx={{ maxWidth: "100%", margin: "5px" }}>
              <CardActionArea>
                <CardMedia
                  sx={{ margin: "auto", height: 400, width: 400 }}
                  image={pokemon.sprites.front_default}
                  title={pokemon.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    #{pokemon.id} {capitalizeFirstLetter(pokemon.name)}
                  </Typography>
                  {pokemon.types.map((type) => (
                    <Typography
                      fontSize={15}
                      gutterBottom
                      variant="h5"
                      component="div"
                      key={type.slot}
                      borderRadius="8px"
                      border={() => checkType(type.type.name)}
                    >
                      {capitalizeFirstLetter(type.type.name)}
                    </Typography>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>

          <Divider>Moves</Divider>
          <Box
            sx={{
              display: "flex",
              width: 400,
              margin: "auto",
            }}
          >
            <FixedSizeList
              height={300}
              width={400}
              itemSize={50}
              itemCount={pokemon.moves.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
          </Box>
        </>
      )}
    </>
  );
};

export default Pokemon;
