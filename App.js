import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers/allReducers";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FewDaysWeather from "./screens/FewDaysWeather";
import WeatherDetails from "./screens/WeatherDetails";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FewDaysWeather">
        <Stack.Screen
          name="FewDaysWeather"
          component={FewDaysWeather}
          options={{
            title: "5 Days",
          }}
        />
        <Stack.Screen
          name="WeatherDetails"
          component={WeatherDetails}
          options={({ route }) => ({
            title: route.params.day,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
