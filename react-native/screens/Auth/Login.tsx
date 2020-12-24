import React from "react";
import { View, Text } from "react-native";
import { string } from "assets/strings";
import { textColor } from "constants/Colors";
import { StyledText } from "component";
import CommonStyle from "assets/styles";

import styles from "./styles";

import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Input,
  Item,
  Row
} from "native-base";

export default function Login({ navigation }) {
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.form}>
          <StyledText style={styles.signIn}>{string("auth.signIn")}</StyledText>
          <StyledText style={styles.enterCred}>
            {string("auth.enterCred")}
          </StyledText>
          <View style={styles.inputs}>
            <Form>
              <Item style={styles.input}>
                <Input
                  placeholder={string("auth.username")}
                  style={CommonStyle.input}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
              </Item>
              <Item style={styles.input}>
                <Input
                  placeholder={string("auth.password")}
                  style={CommonStyle.input}
                  secureTextEntry
                />
              </Item>
              <Button rounded style={styles.signInButton}>
                <StyledText style={styles.signInButtonLabel}>
                  {string("auth.signIn")}
                </StyledText>
              </Button>
              <Col>
                <Row style={styles.row}>
                  <StyledText style={styles.signUpTitle}>
                    {string("auth.signUpTitle")}
                  </StyledText>
                  <Button
                    transparent
                    style={styles.signUp}
                    onPress={() => {
                      navigation.navigate("Register");
                    }}>
                    <StyledText style={styles.signUpButtonLabel}>
                      {string("auth.signUp")}
                    </StyledText>
                  </Button>
                </Row>
              </Col>
            </Form>
          </View>
        </View>
      </Content>
    </Container>
  );
}
