import React from "react";
import Button from "@material-ui/core/Button";
export interface IProps {
  color: string;
  onClick?: (color: string) => void;
  children: string;
}
export default (props: IProps) => {
  const { color, onClick, children } = props;
  return (
    <Button style={{ color }} onClick={() => onClick && onClick(color)}>
      {children}
    </Button>
  );
};
