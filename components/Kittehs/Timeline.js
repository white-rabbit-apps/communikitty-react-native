import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { useQuery } from "@apollo/client";
import { GET_ANIMAL_STORIES } from "../../graphql/query/story";

import Loaded from "../../components/Loader";
import { getIcon } from "../../helper/utils";
import { startCase } from 'lodash';

const {width} = Dimensions.get("screen");

const event_icon = (s) => {
  let icons = {
    'birth': require('../../assets/images/timeline_born/timeline_born.png'),
    'adoption': require('../../assets/images/timeline_adopted/timeline_adopted.png'),
    'foster': require('../../assets/images/timeline_foster/timeline_foster.png')
  }
  return icons[s];
}

const TimelineView = ({animal}) => {
  const [selected, setSelected] = useState();

  const {loading, data, refetch, error} = useQuery(GET_ANIMAL_STORIES, { variables: { animalSlug: animal.slug }, fetchPolicy: "cache-and-network" });

  const onRefresh = () => {
    refetch();
  }

  if (loading) {
    return <Loaded/>;
  }
  const records = data.animalStories.map(story => ({
    time: story.date,
    title: story.title,
    description: story.body,
    lineColor: '#009688',
    imageUrl: story.thumbnailUrl,
    icon: getIcon(story.event),
    event: story.event,
    medicalProcedure: story.medicalProcedure
  }));

  const onEventPress = (data) => setSelected(data);

  const renderDetail = (rowData, sectionID, rowID) => {
    return (
      <View style={{flex:1, backgroundColor:'#BBDAFF', borderRadius: 10, padding: 5}}>
        <Image source={event_icon(rowData.event) ? event_icon(rowData.event) : {uri: rowData.imageUrl}} style={styles.image}/>
        <View style={[styles.title]}>
          {rowData.medicalProcedure ? <Image source={require('../../assets/images/tab_icon_health/tab_icon_health.png')} style={{ width: 26, margin: 10 }}  /> : null }
          <Text>{rowData.medicalProcedure ? rowData.medicalProcedure.name : rowData.title}</Text>
          {rowData.event && <Text>{startCase(rowData.event)}</Text>}
        </View>
        <Text style={[styles.textDescription]}>{rowData.description}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Timeline 
        style={styles.list}
        data={records}
        circleSize={20}
        circleColor='rgba(0,0,0,0)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{minWidth:52, marginTop: -5}}
        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
        descriptionStyle={{color:'gray'}}
        options={{
          style:{paddingTop:5},
          refreshControl: (
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />
          )
        }}
        innerCircle={'icon'}
        onEventPress={onEventPress}
        renderDetail={renderDetail}
        columnFormat='two-column'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  list: {
    flex: 1
  },
  title:{
    fontSize:16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: (width - 60)/2,
    height: (width - 60)/2,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});

export default TimelineView;