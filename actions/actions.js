export const fetchFewDaysWeather = (forecast) => {
  return {
    type: "SUCCESS_FETCH_FEW_DAYS_WEATHER",
    payload: forecast,
  };
};

export const fetchYourCityName = (name) => {
  return {
    type: "SUCCESS_FETCH_YOUR_CITY_NAME",
    payload: name,
  };
};
