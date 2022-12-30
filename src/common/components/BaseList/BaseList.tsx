import React from "react";
import { List, ListItem, ListProps } from "@chakra-ui/react";

interface Props extends Omit<ListProps, "children"> {
  children: React.ReactNode[];
}

const BaseList: React.FC<Props> = ({ children, ...props }) => {
  return (
    <List {...props}>
      {children.map((child, i) => (
        <ListItem key={i}>{child}</ListItem>
      ))}
    </List>
  );
};

export default BaseList;
