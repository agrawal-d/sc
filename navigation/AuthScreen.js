import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import RootScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Login";

export default function AuthScreen({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName="Login">
      <BottomTab.Screen
        name="Sign Up"
        component={SettingsScreen}
        options={{
          title: "Sign Up",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
          )
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={RootScreen}
        options={{
          title: "Login",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Login":
      return "Login";
    case "Sign Up":
      return "Sign Up";
  }
}
