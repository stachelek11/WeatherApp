import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import { shortMonths, days } from "../context/NameDateTables";

const OneDayWeather = ({ dailyIndex }) => {
  const { daily } = useSelector((state) => state.fetchFewDaysWeather);
  const { temp, weather, dt } = daily[dailyIndex];
  const { icon, description } = weather[0];
  const date = new Date(dt * 1000);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.lightText}>
          {days[date.getDay()]}, {shortMonths[date.getMonth()]} {date.getDate()}
        </Text>
        <Text style={styles.darkText}>{description}</Text>
      </View>
      <View style={styles.WeatherInfo}>
        <Image
          style={styles.icon}
          source={{
            uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
        <View style={styles.temperature}>
          <Text style={styles.lightText}>{Math.round(temp.max)}°C</Text>
          <Text style={styles.darkText}>{Math.round(temp.min)}°C</Text>
        </View>
      </View>
    </View>
  );
};

OneDayWeather.propTypes = {
  dailyIndex: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "#4a7cc8",
  },
  WeatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  temperature: {
    alignItems: "center",
  },
  lightText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  darkText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#dbdbdb",
  },
});

export default OneDayWeather;
