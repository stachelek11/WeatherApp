import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const DetailItem = ({ title, value }) => (
  <View style={detailStyle.container}>
    <Text style={detailStyle.text}>{title}:</Text>
    <Text style={detailStyle.text}>{value}</Text>
  </View>
);

DetailItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const detailStyle = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: "#ffffff",
  },
});

export default DetailItem;
