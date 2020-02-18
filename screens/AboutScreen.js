import * as React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import globalStyles from "../styles/styles";
import "../actions/actions";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({ headerTitle: "Abt scr" });
  }
  render() {
    return (
      <View style={globalStyles.margin}>
        <Text>Abt {JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

export default connect()(About);
