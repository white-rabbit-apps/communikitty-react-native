import React from "react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import Avatar from "./avatar";
import Summary from "./summary";

const ActivityItem = ({
  activity,
  onClickPhoto
}) => {
  const { owner, createdAt } = activity;

  const formatDate = date => {
    return moment(moment.utc(date, 'YYYY-MM-DD HH:mm:ss').local().toDate(), 'YYYY-MM-DD HH:mm:ss zz').fromNow();
  }

  return (
    <View style={styles.container}>
      <Avatar url={owner.avatarUrl} />
      <View style={styles.summaryContainer}>
        <Text style={styles.date}>{formatDate(createdAt)}</Text>
        <Summary
          data={activity}
        />
      </View>
      {/* <Feed.Content>
        <Feed.Date>{formatDate(createdAt)}</Feed.Date>
        <Feed.Summary>
          <Feed.User>
            <Link href={`/hooman/${owner?.slug}`}>
              { owner?.fullName }
            </Link>
          </Feed.User>
          <StyledSpan>
            { getType() } { getTrackableType() }
          </StyledSpan>
          <Link href={getTrackableUrl()}>
            { trackable?.name || "-" }
          </Link>
          {recipient && (
            <>
              <StyledSpan>
                for {recipientType.toLowerCase()}
              </StyledSpan>
              <Link href={getRecipientUrl()}>
                { recipient?.name }
              </Link>
            </>
          )}
          <StyledSpan>
            { parameters.animalName && `of ${parameters.animalName}`}
          </StyledSpan>
        </Feed.Summary>
        {!!photos?.length && (
          <Feed.Extra images>
            {photos.map(({id, thumbnailUrl}, i) =>
              <img src={thumbnailUrl} key={i} alt="" onClick={() => onClickPhoto(id)} />
            )}
          </Feed.Extra>
        )}
      </Feed.Content> */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 3,
    margin: 3
  },
  summaryContainer: {
    flex: 1,
    paddingLeft: 5
  },
  date: {
    flex: 1,
    fontSize: 10,
    color: "rgba(0,0,0,.4)"
  }
})

export default ActivityItem;