import * as React from "react";

import { Text, TextProps } from "./Themed";

export default function MonoText(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: "Roboto" }, props.style]} />;
}
