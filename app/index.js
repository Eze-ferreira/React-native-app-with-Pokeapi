import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Pressable } from 'react-native';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
      .then((response) => response.json())
      .then((data) => {
        const pokemonWithImages = data.results.map((pokemon) => {
          const id = pokemon.url.split("/")[6];
          return {
            ...pokemon,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
        setPokemonList(pokemonWithImages);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener Pokémon:", error));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.pokemonContainer} 
              onPress={() => {
                console.log(`Navigating to: /pokemon/${item.id}`);
                router.push(`/pokemon/${item.id}`)}}
            >
              <Image source={{ uri: item.image }} style={styles.pokemonImage} />
              <Text style={styles.pokemonName}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  pokemonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});
