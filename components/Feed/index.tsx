import React from "react";
import { StyleSheet, FlatList, Dimensions, Text, View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_ACTIVITY_FEEDS } from "../../graphql/query/feed";
import Loader from "../Loader";

import Item from "./item";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Feed = () => {
  const [loadMore, setLoadMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { loading, error, data, fetchMore } = useQuery(GET_ACTIVITY_FEEDS, {
    variables: {
      scope: 'current_user',
      sortBy: "created_at",
      sortDir: "desc",
      page,
      pageSize: 10
    }
  });

  const loadMoreData = () => {
    setLoadMore(true);
    setPage(page + 1);
    fetchMore({
      variables: {
        scope: 'current_user',
        sortBy: "created_at",
        sortDir: "desc",
        page: page,
        pageSize: 10
      }
    }).then(({data: {activityFeeds}}) => {
      if (activityFeeds.length < 10) {
        setLoadMore(false);
      }
    });
  }

  const onClickPhoto = (item: Object) => {};

  const renderFooter = () => {
    return loadMore ? (
        <Loader />
      ) : null;
  };

  const renderItem = ({ item }: any) => (
    <Item
      activity={item}
      onClickPhoto={onClickPhoto} />
  );
  if (loading) {
    return <Loader/>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data && data.activityFeeds ? data.activityFeeds : []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    minHeight: windowHeight,
    paddingTop: 70,
    paddingBottom: 70
  },
  list: {
    width: windowWidth,
    display: "flex"
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
})
export default Feed;