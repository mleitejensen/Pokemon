import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface PokemonName {
  name: string;
  url: string;
}
interface Pokemon {
  name: string;
  id: number;
  other: {
    sprites: {
      front_default: string;
    };
  };
}
function Fetch() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        console.log(response.data.results);
        if (!initialized.current) {
          response.data.results?.forEach((pokemonName: PokemonName) => {
            initialized.current = true;

            axios
              .get(pokemonName.url)
              .then((response) => {
                setPokemons((Pokemons) => [
                  ...Pokemons,
                  {
                    name: response.data.name,
                    id: response.data.id,
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box
      sx={{
        display: "grid",
        maxWidth: "100%",
        gridTemplateColumns: "20% 20% 20% 20% 20%",
        margin: 5,
      }}
    >
      {pokemons?.map((pokemon: Pokemon, index) => {
        return (
          <>
            <div key={index}>
              <Card sx={{ maxWidth: "100%", margin: "5px" }}>
                <CardMedia
                  sx={{ margin: "auto", height: 200, width: 200 }}
                  image={pokemon.other.sprites.front_default}
                  title={pokemon.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    #{pokemon.id} {capitalizeFirstLetter(pokemon.name)}
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
