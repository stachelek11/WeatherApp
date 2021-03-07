import { combineReducers } from "redux";
import fetchFewDaysWeather from "./fetchFewDaysWeather";
import fetchYourCityName from "./fetchYourCityName";

const allReducers = combineReducers({
  fetchFewDaysWeather: fetchFewDaysWeather,
  fetchYourCityName: fetchYourCityName,
});

export default allReducers;
