import React from "react";
import { View, ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";
import { startCase } from "lodash";
import { colors } from "../../screens/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("screen");

const Info = ({animal}) => {
  const renderHeader = (image, title) => {
    return <View style={styles.left}>
      <Image source={image} style={styles.logo}/>
      <Text style={styles.label}>{title}</Text>
    </View>
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.listItem}>
          {renderHeader(require("../../assets/images/form_username/form_username.png"), "Username")}
          <View style={styles.right}>
            <Text style={styles.value}>{ animal.username }</Text>
          </View>
        </View>
        {
          !!animal.intro &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_intro/form_intro.png"), "Intro")}
            <View style={styles.right}>
              <Text style={styles.value}>{ animal.intro }</Text>
            </View>
          </View>
        }
        {
          animal.gender &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_gender/form_gender.png"), "Gender")}
            <View style={styles.right}>
              <Text style={styles.value}>{ startCase(animal.gender) }</Text>
            </View>
          </View>
        }
        {
          animal.age &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_birthdate/form_birthdate.png"), "Age")}
            <View style={styles.right}>
              <Text style={styles.value}>{ animal.age }</Text>
            </View>
          </View>
        }
        {
          animal.city &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_hometown/form_hometown.png"), "Hometown")}
            <View style={styles.right}>
              <Text style={styles.value}>{ animal.city.name }, { animal.city.state }</Text>
            </View>
          </View>
        }
        {
          animal.breed &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_breed/form_breed.png"), "Breed")}
            <View style={styles.right}>
              <Text style={styles.value}>{ animal.breed.name }</Text>
            </View>
          </View>
        }
        {
          animal.coat &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_coat/form_coat.png"), "Coat")}
            <View style={styles.right}>
              <Image source={{uri: animal.coat.imageUrl}} style={{width: 35, height: 20, marginRight: 5 }} />
              <Text style={styles.value}>{ animal.coat.name }</Text>
            </View>
          </View>
        }
        {
          animal.colors.length > 0 &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_color/form_color.png"), "Colors")}
            <View style={styles.right}>
              {
                animal.colors.map((color, index) => {
                  return (
                  <View style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }} key={index}>
                    <Ionicons
                      name="ios-ellipse"
                      size={10}
                      color={colors[color.name]}
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: colors[color.name],
                        marginRight: 5
                      }}
                    />
                    <Text>{startCase(color.name)}</Text>
                  </View>
                  )
                })
              }
            </View>
          </View>
        }
        {
          animal.hairLength &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_length/form_length.png"), "Hair Length")}
            <View style={styles.right}>
              <Text style={styles.value}>{ startCase(animal.hairLength) }</Text>
            </View>
          </View>
        }
        {
          animal.traits && animal.traits.length > 0 &&
            <View style={styles.listItem}>
              {renderHeader(require("../../assets/images/form_traits/form_traits.png"), "Traits")}
              <View style={styles.right}>
                {
                  animal.traits.map((trait, index) => {
                    return <View key={index} style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                      <Image source={{uri: trait.image}} style={{width: 20, height: 20}} />
                      <Text>{trait.name}</Text>
                    </View>
                  })
                }
              </View>
            </View>
        }
        {
          animal.loves && animal.loves.length > 0 &&
            <View style={styles.listItem}>
              {renderHeader(require("../../assets/images/form_loves/form_loves.png"), "Loves")}
              <View style={[styles.right, styles.list]}>
                {
                  animal.loves.map((love, index) => {
                    return <View key={index} style={styles.rightListItem}>
                      <Ionicons
                        name="ios-ellipse"
                        size={6}
                        style={{
                          marginRight: 10
                        }}
                      />
                      <Text>{love.text}</Text>
                    </View>
                  })
                }
              </View>
            </View>
        }
        {
          animal.hates && animal.hates.length > 0 &&
            <View style={styles.listItem}>
              {renderHeader(require("../../assets/images/form_hates/form_hates.png"), "Hates")}
              <View style={[styles.right, styles.list]}>
                {
                  animal.hates.map((hate, index) => {
                    return <View key={index} style={styles.rightListItem}>
                      <Ionicons
                        name="ios-ellipse"
                        size={6}
                        style={{
                          marginRight: 10
                        }}
                      />
                      <Text>{hate.text}</Text>
                    </View>
                  })
                }
              </View>
            </View>
        }

        {
          animal.statuses && animal.statuses.length > 0 &&
            <View style={styles.listItem}>
              {renderHeader(require("../../assets/images/form_status/form_status.png"), "Status")}
              <View style={[styles.right, styles.list]}>
                {
                  animal.statuses.map((status, index) => {
                    return <View key={index} style={styles.rightListItem}>
                      <Ionicons
                        name="ios-ellipse"
                        size={6}
                        style={{
                          marginRight: 10
                        }}
                      />
                      <Text>{startCase(status)}</Text>
                    </View>
                  })
                }
              </View>
            </View>
        }
        {
          !!animal.rescueAnimalId &&
          <View style={styles.listItem}>
            {renderHeader(require("../../assets/images/form_rescue/form_rescue.png"), "Rescue Animal ID")}
            <View style={styles.right}>
              <Text>{animal.rescueAnimalId}</Text>
            </View>
          </View>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  left: {
    display: "flex",
    flexDirection: "row",
    width: width / 2,
    paddingLeft: 5,
    borderRightWidth: 1,
    borderRightColor: "gray",
    paddingTop: 10,
    paddingBottom: 10
  },
  right: {
    display: "flex",
    flexDirection: "row",
    width: width / 2,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: "wrap"
  },
  logo: {
    width: 25,
    height: 25
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  value: {
    fontSize: 16
  },
  list: {
    flexDirection: "column"
  },
  rightListItem: {flex: 1, flexDirection: "row", alignItems: "center"}
});

export default Info;