const fetchYourCityName = (state = "", action) => {
  switch (action.type) {
    case "SUCCESS_FETCH_YOUR_CITY_NAME":
      return (state = action.payload);
    default:
      return state;
  }
};

export default fetchYourCityName;
