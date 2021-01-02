import React from "react";

import { useQuery }  from "@apollo/client";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { GET_ANIMALS } from "../graphql/query/animal";
import { filterStatuses, ORDERSTATUSES } from "../helper/status";
import { startCase } from "lodash";

import Loader from "../components/Loader";
import Kittehs from "../components/Kittehs";

const EXCLUDE_STATUSES = ["in_foster"];

const KittehsScreen = (props) => {
  const { loading, error, data } = useQuery(GET_ANIMALS);
  if (loading || error) {
    return <Loader />;
  }

  const { animals, statuses } = filterStatuses(data.animals, EXCLUDE_STATUSES);

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          statuses.map((status, i) => {
            return (
              <View key={status} style={styles.section}>
                <Text style={styles.header}> {ORDERSTATUSES[status] || `${startCase(status)} Kittehs`} </Text>
                <Kittehs data={animals[status]} />
                {i !== statuses.length - 1 && <View/>}
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  selfi: {
    position: "absolute",
    height: 50,
    width: 90,
    right: 0,
    top: 5
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  },
  section: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 20,
  }
})

export default KittehsScreen;