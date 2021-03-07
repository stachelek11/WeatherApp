import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { fetchFewDaysWeather, fetchYourCityName } from "../actions/actions";
import { API_KEY } from "../API_KEYS";
import OneDayWeather from "../components/OneDayWeather";
import { days } from "../context/NameDateTables";

const FewDaysWeather = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { daily } = useSelector((state) => state.fetchFewDaysWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude, "en"); // Fetch weather for User location
      });
    } catch (error) {
      console.log("Error message:" + error);
      fetchWeather(52.229676, 21.012229, "en"); //Fetch weather for Warsaw
    }
  }, []);

  const fetchWeather = (lat, lon, lang) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`
    )
      .then((response) => response.json())
      .then((json) => dispatch(fetchYourCityName(json.name)))
      .catch(() => setError(true));

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`
    )
      .then((response) => response.json())
      .then((json) => dispatch(fetchFewDaysWeather(json)))
      .then(() => setLoading(false))
      .catch(() => setError(true));
  };

  return (
    <ScrollView style={{ marginTop: 5 }}>
      {error ? (
        <Text style={{ textAlign: "center", marginTop: 30 }}>
          Error loading the weather forecast
        </Text>
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          size="large"
          color="#0000ff"
        />
      ) : (
        daily.slice(1, 6).map((item, index) => (
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() =>
              navigation.navigate("WeatherDetails", {
                day: days[new Date(item.dt * 1000).getDay()],
                index: index + 1,
              })
            }
            key={index}
          >
            <OneDayWeather dailyIndex={index + 1} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default FewDaysWeather;
