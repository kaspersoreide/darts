import React, { ReactElement, FC } from "react";
import styled from "styled-components";

interface PieProps {
  size: number;
  color: string;
  rotate: number;
}

const StyledSpan = styled('span')((props: PieProps) => `
  width: ${props.size}px;
  height: ${props.size}px;
  border-radius: 0 ${props.size}px 0 0;
  transform-origin: 0 ${props.size}px;
  background: ${props.color};
  left: 0px;
  top: 0px;
  display: block;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 80%);
  transform: skewX(72deg);
  position: absolute;
`)

const StyledDiv = styled('div')((props: PieProps) => `
  width: ${props.size}px;
  height: ${props.size}px;
  left: ${props.size}px;
  transform-origin: 0 ${props.size}px;
  position: absolute;
  overflow: hidden;
  top: 0px;
  transform: rotate(${props.rotate}deg) skewX(-72deg);
`)

const Pie: FC<PieProps> = ({ size, color, rotate }): ReactElement => {
  return (
    <StyledDiv size={size} color={color} rotate={rotate}><StyledSpan size={size} color={color} rotate={rotate}></StyledSpan></StyledDiv>
  );
};

export default Pie;