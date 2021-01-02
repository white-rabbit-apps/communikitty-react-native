import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Weight from "./Weight";
import Length from "./Length";
import History from "./History";

const Health = ({animal}) => {
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'weight', title: 'Weight', icon: "ios-information-circle" },
    { key: 'length', title: 'Length', icon: "ios-list-circle" },
    { key: 'history', title: 'History', icon: "ios-list-circle" }
  ];

  const renderScene = SceneMap({
    weight: () => <Weight data={animal.weightMeasurements}/>,
    length: () => <Length data={animal.lengthMeasurements}/>,
    history: () => <History data={animal} />
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
        <Text style={[styles.label, labelStyle]}>{route.title}</Text>
      </View>
    )
  }

  const renderTabBar = (props) =>
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue' }}
      style={{backgroundColor: "#ffffff", display: "flex",}}
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
    color: '#000000',
    fontWeight: 'bold'
  },
  inactive: {
    color: 'gray',
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
    color: "black"
  },
});

export default Health;