import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import globalStyles from "../styles/styles";
import "../actions/actions";
import Colors from "../constants/Colors";
import Constants from "../constants/Constants";
import { setAuth } from "../actions/actions";
class RootScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: "Login"
    };
    if (props.auth && props.auth.access_token) {
      props.navigation.navigate("EventsHome");
    }
  }

  async handleLogin() {
    const { dispatch, navigation } = this.props;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: "test@email.com",
      password: "plain_text_password",
      mac: "mac"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };
    this.setState({
      btnText: "Please wait"
    });
    fetch("https://debug.smartcampus-bphc.in/api/auth/login/", requestOptions)
      .then(response => response.text())
      .then(result => {
        dispatch(setAuth(result));
        navigation.navigate("EventsHome");
      })
      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <View style={{ ...globalStyles.margin, flex: 1 }}>
        <Text style={globalStyles.heading}>Welcome to Events Notifier</Text>
        <Text>Login to continue</Text>
        <View>
          <TextInput
            placeholder="Username"
            style={globalStyles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Password"
            textContentType="password"
            placeholderTextColor="grey"
            style={globalStyles.input}
          />
        </View>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <Button
            title={this.state.btnText}
            color={Colors.themePrimary}
            onPress={() => {
              this.handleLogin();
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(RootScreen);
