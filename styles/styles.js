import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const globalStyles = StyleSheet.create({
  margin: {
    margin: 15
  },
  button: {
    backgroundColor: colors.themePrimary,
    color: "white",
    padding: 10,
    elevation: 10
  },
  heading: {
    fontSize: 20
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: "rgb(240,240,240)",
    color: "black",
    elevation: 1,
    borderRadius: 10
  }
});

export default globalStyles;
