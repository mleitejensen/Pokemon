import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface PokemonName {
  name: string;
  url: string;
}
interface Pokemon {
  name: string;
  other: {
    sprites: {
      front_default: string;
    };
  };
}
function Fetch() {
  const [pokemonNames, setPokemonNames] = useState<[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        console.log(response.data.results);
        setPokemonNames(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    pokemonNames?.forEach((pokemonName: PokemonName) => {
      axios
        .get(pokemonName.url)
        .then((response) => {
          let contains = false;
          pokemons.forEach((pokemon: Pokemon) => {
            console.log(pokemon.name);
            console.log(response.data.name);
            if (pokemon.name == response.data.name) {
              contains = true;
            }
          });
          if (!contains)
            setPokemons((Pokemons) => [
              ...Pokemons,
              {
                name: response.data.name,
                other: {
                  sprites: {
                    front_default: response.data.sprites.front_default,
                  },
                },
              },
            ]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [pokemonNames, pokemons]);

  useEffect(() => {
    console.log("Images " + pokemons);
  }, [pokemons]);
  return (
    <Box
      sx={{
        display: "grid",
        maxWidth: "100%",
        gridTemplateColumns: "20% 20% 20% 20% 20%",
        margin: 5,
      }}
    >
      {pokemons?.map((custompokemon: Pokemon, index) => {
        return (
          <>
            <div key={index}>
              <Card sx={{ maxWidth: "100%" }}>
                <CardMedia
                  sx={{ height: 200, width: 200 }}
                  image={custompokemon.other.sprites.front_default}
                  title={custompokemon.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {custompokemon.name}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </>
        );
      })}
    </Box>
  );
}

export default Fetch;
