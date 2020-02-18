import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

import { Provider } from "react-redux";
import fn from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import AboutScreen from "./screens/AboutScreen";
import Colors from "./constants/Colors";
import AuthScreen from "./navigation/AuthScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EventScreen from "./screens/EventScreen";
import NewEvent from "./screens/NewEvent";

const { store, persistor } = fn();
const Stack = createStackNavigator();

persistor.purge();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          // @ts-ignore
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="Root"
                  component={AuthScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: Colors.themePrimary
                    },
                    headerTintColor: "#fff"
                  }}
                />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Event" component={EventScreen} />
                <Stack.Screen name="NewEvent" component={NewEvent} />

                <Stack.Screen
                  name="EventsHome"
                  component={BottomTabNavigator}
                  options={{
                    headerStyle: {
                      backgroundColor: Colors.themePrimary
                    },
                    headerTintColor: "#fff",
                    headerLeft: null
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
