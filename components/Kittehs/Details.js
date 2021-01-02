import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import Info from "./Info";
import Timeline from "./Timeline";
import Health from "./Health";

const Details = ({animal}) => {
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'info', title: 'Info', icon: "ios-information-circle" },
    { key: 'timeline', title: 'Timeline', icon: "ios-list-circle" },
    { key: 'health', title: 'Health', icon: "ios-medical" }
  ];

  const renderScene = SceneMap({
    info: () => <Info animal={animal}/>,
    timeline: () => <Timeline animal={animal}/>,
    health: () => <Health animal={animal}/>
  });

  const getActiveInfo = ({icon, key}) => {
    const activeIndex = routes.findIndex(r => r.key === key);
    return {
      icon: activeIndex === index ? icon : `${icon}-outline`,
      labelStyle: activeIndex === index ? styles.active : styles.inactive
    }
  }

  const renderLabelText = ({route}) => {
    const {icon, labelStyle} = getActiveInfo(route);
    return (
      <View style={styles.bar}>
        <Ionicons
          name={icon}
          size={26}
          style={[styles.icon, labelStyle]}
        />
        <Text style={[styles.label, labelStyle]}>{route.title}</Text>
      </View>
    )
  }

  const renderTabBar = (props) =>
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{backgroundColor: "#009387", display: "flex",}}
      getLabelText={renderLabelText}
    />

  return (
    <View style={{ height: '100%' }}>
      <TabView
        navigationState={{
          index,
          routes
        }}
        renderScene={renderScene}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: '800'
  },
  active: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  inactive: {
    color: '#ffffff',
  },
  icon: {
    height: 26,
    width: 26,
    color: "#fff",
    marginRight: 5
  },
  label: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
    color: "white"
  },
});

export default Details;