import React from "react";
import { View, Text } from "react-native";
import { string } from "assets/strings";
import { textColor } from "constants/Colors";

import styles from "./styles";
import { Button, Container, Content, Form, Input, Item } from "native-base";

export default function Login() {
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.top}></View>
        <View>
          <Text style={styles.signUp}>{string("auth.signIn")}</Text>
          <Text style={styles.enterCred}>{string("auth.enterCred")}</Text>
          <View style={styles.inputs}>
            <Form>
              <Item style={styles.input}>
                <Input
                  placeholder={string("auth.username")}
                  style={styles.inputLabel}
                />
              </Item>
              <Item style={styles.input}>
                <Input
                  placeholder={string("auth.password")}
                  style={styles.inputLabel}
                />
              </Item>
              <Button rounded style={styles.signInButton}>
                <Text>{string("auth.signIn")}</Text>
              </Button>
            </Form>
          </View>
        </View>
      </Content>
    </Container>
  );
}
