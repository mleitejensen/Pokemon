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
}

interface Move {
  move: {
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
