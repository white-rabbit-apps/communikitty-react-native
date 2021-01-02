import React from 'react';
import { useQuery } from "@apollo/client";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Loader from "../components/Loader";
import AnimalItemDetail from "../components/Kittehs/Details";

import { GET_ANIMAL } from "../graphql/query/animal";

const KittehDetailsScreen = ({route, navigation}) => {
  const { params: { slug } } = route;
  const { loading, error, data } = useQuery(GET_ANIMAL, { variables: { slug } });

  React.useEffect(() => {
    if (data?.animal) {
      const { avatarUrl } = data?.animal;
      navigation.setParams({avatarUrl});
    }
  }, [data]);

  if (loading || error) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <AnimalItemDetail animal={data?.animal} />
    </View>
  )
};

export default KittehDetailsScreen;

const styles = StyleSheet.create({
  container: {
    
  },
});
