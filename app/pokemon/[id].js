import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener detalles:", error));
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.info}>Altura: {pokemon.height / 10} m</Text>
      <Text style={styles.info}>Peso: {pokemon.weight / 10} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
});
