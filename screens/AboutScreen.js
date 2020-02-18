import * as React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import globalStyles from "../styles";
import "../actions";

function AboutScreen({ navigation, route }) {
  return (
    <View style={globalStyles.margin}>
      <Text>Hello world</Text>
    </View>
  );
}
export default connect()(AboutScreen);
