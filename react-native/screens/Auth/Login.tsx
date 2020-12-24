import React from "react";
import { View, Text } from "react-native";
import { string } from "assets/strings";
import { textColor } from "constants/Colors";
import { StyledText } from "component";
import CommonStyle from "assets/styles";

import styles from "./styles";

import { Button, Container, Content, Form, Input, Item } from "native-base";

export default function Login() {
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.top}></View>
        <View>
          <StyledText style={styles.signUp}>{string("auth.signIn")}</StyledText>
          <StyledText style={styles.enterCred}>
            {string("auth.enterCred")}
          </StyledText>
          <View style={styles.inputs}>
            <Form>
              <Item style={styles.input}>
                <Input
                  placeholder={string("auth.username")}
                  style={CommonStyle.input}
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
              <StyledText style={styles.or}>
                {string("auth.orSocial")}
              </StyledText>
            </Form>
          </View>
        </View>
      </Content>
    </Container>
  );
}
