const fetchFewDaysWeather = (state = {}, action) => {
  switch (action.type) {
    case "SUCCESS_FETCH_FEW_DAYS_WEATHER":
      return (state = action.payload);
    default:
      return state;
  }
};

export default fetchFewDaysWeather;
