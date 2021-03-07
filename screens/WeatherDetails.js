import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import DetailItem from "../components/DetailItem";
import { months } from "../context/NameDateTables";

const backgroundColorClouds = [
  "#71a5f4", //few clouds:
  "#175fca", //scattered clouds
];

const WeatherDetails = ({ route }) => {
  const { daily } = useSelector((state) => state.fetchFewDaysWeather);
  const cityName = useSelector((state) => state.fetchYourCityName);
  const { index } = route.params;
  const {
    temp,
    feels_like,
    pressure,
    humidity,
    wind_speed,
    wind_deg,
    clouds,
    dt,
    weather,
  } = daily[index];
  const { icon, description } = weather[0];
  const date = new Date(dt * 1000);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: backgroundColorClouds[Math.round(clouds / 100)],
        }}
      >
        {daily.length === 0 || cityName === "" ? (
          <ActivityIndicator
            style={{ marginTop: 50 }}
            size="large"
            color="#ffffff"
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.background}>
              <Text style={styles.city}>{cityName}</Text>
              <Text style={styles.date}>
                {date.getDate()} {months[date.getMonth()]}
              </Text>
              <Image
                style={styles.icon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
                }}
              />
              <Text style={styles.tempDay}>{Math.round(temp.day)}°C</Text>
              <Text style={styles.tempFeelsLike}>
                feels like {Math.round(feels_like.day)}°C
              </Text>
              <Text style={styles.tempFeelsLike}>{description}</Text>
            </View>
            <View style={styles.detailsList}>
              <DetailItem
                title={"Max temperature"}
                value={Math.round(temp.max) + "°C"}
              />
              <DetailItem
                title={"Min temperature"}
                value={Math.round(temp.min) + "°C"}
              />
              <DetailItem title={"Pressure"} value={pressure} />
              <DetailItem title={"Humidity"} value={humidity} />
              <DetailItem title={"Wind (speed)"} value={wind_speed} />
              <DetailItem title={"Wind (deg)"} value={wind_deg} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
  },
  background: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    marginBottom: 100,
  },
  city: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  tempDay: {
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
  },
  tempFeelsLike: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
  icon: {
    width: 80,
    height: 80,
  },
  detailsList: {
    borderTopColor: "#ffffff",
    borderTopWidth: 2,
    paddingBottom: 1,
  },
});

export default WeatherDetails;
