// Still under construction

import { useState } from "react";
import Container from "./Container";

const Notification = ({ text }) => {
  const [visible, setVisible] = useState(true);

  const internalStyle =
    "text-xl text-center text-green-50 justify-center h-xl bg-green-500 p-4 transition-all static border-b-4 border-green-200";

  const defaultStyle =
    "text-xl text-center text-white justify-center h-xl bg-white p-4 transition-all static border-b-4 border-slate-200";

  setTimeout(() => {
    setVisible(false);
  }, 2000);

  if (visible) {
    return <Container style={internalStyle}>{text}</Container>;
  }
  return <Container style={defaultStyle}>Placeholder</Container>;
};

export default Notification;
