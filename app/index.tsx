import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "../src/styles/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      
        {loading ? (<ActivityIndicator size={50} color="#0000ff"/>) : (
          <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
          />
        )}
    </View>
  );
}
