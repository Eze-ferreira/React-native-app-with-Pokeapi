import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { id } = useLocalSearchParams(); // Obtiene el ID del Pokémon desde la URL
  const [pokemon, setPokemon] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        // ✅ Cambia el título de la Navbar al nombre del Pokémon
        navigation.setOptions({ title: data.name.charAt(0).toUpperCase() + data.name.slice(1) });
      } catch (error) {
        console.error("Error al obtener los detalles del Pokémon:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "capitalize",
  },
});
