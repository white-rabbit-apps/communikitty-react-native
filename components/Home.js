import * as React from 'react';
import { StyleSheet, ScrollView, Image, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.details}>
      <Image
        style={styles.adoptedLogo}
        source={require('../assets/images/timeline_adopted/timeline_adopted.png')}
      />
      <Image
        style={styles.fostedLogo}
        source={require('../assets/images/timeline_foster/timeline_foster.png')}
      />
      <Text style={styles.title}>Welkum Hooman!</Text>
      <View>
        <Text style={styles.detailsParg}>CommuniKitty is dedicated to saving the lives of and finding homes for as many cats as possible.</Text>
        <Text style={styles.detailsParg}>
          We help by building tools to help fosters, rescues, independent rescuers, and people looking to adopt or just help finance and facilitate the rescue and homing of cats everywhere.
        </Text>
        <Text style={styles.detailsParg}>
          The CommuniKitty app is the best tool for keeping and sharing information and moments with our community and all your other social networks.
        </Text>
        <Text style={styles.detailsParg}>
          This website is currently under development and should be considered in a beta stage.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  detailsParg: {
    fontSize: 15,
    marginBottom: 5
  },
  logo: {
    height: 150,
    width: 350,
    marginTop: 20,
    marginBottom: 20
  },
  adoptedLogo: {
    position: "absolute",
    top: -100,
    left: 0,
    width: 80,
    height: 80
  },
  fostedLogo: {
    position: "absolute",
    bottom: -90,
    right: 0,
    width: 80,
    height: 80
  }
})
export default Home;