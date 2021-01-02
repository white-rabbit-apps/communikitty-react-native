import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import moment from "moment";

const Weight = ({
  data
}) => {
  const latestWeight = data[data.length-1];

  const renderItem = () => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{ latestWeight.value } { latestWeight.unit }</Text>
        <Text>(as of { moment(moment.utc(latestWeight.takenAt, 'YYYY-MM-DD HH:mm:ss').local().toDate(), 'YYYY-MM-DD HH:mm:ss zz').format("MMMM DD, YYYY") })</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.length > 0 ? renderItem() : <Text>No data</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  item: {
    flex: 1,
    alignItems: "center"
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 20
  }
})

export default Weight;