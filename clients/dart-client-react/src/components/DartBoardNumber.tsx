import React, { ReactElement, FC } from "react";
import styled from "styled-components";

interface DartBoardNumberProps {
  location: 'top' | 'bottom';
  number: number;
  rotate: number;
}

const StyledDiv = styled('div')((props: DartBoardNumberProps) => `
  width: 60px;
  height: 50px;
  color: #ddd;
  left: 270px;
  position: absolute;
  font-size: 35px;
  text-align: center;
  text-shadow: -1px 0 1px #eee, 1px 0 1px #000;
  transform-origin: 30px ${props.location === 'top' ? 297 : -246}px;
  bottom: ${props.location === 'top' ? 'auto' : '1px'};
  top: ${props.location === 'top' ? '3px' : 'auto'};
  transform: rotate(${props.rotate}deg);
`)

const DartBoardNumber: FC<DartBoardNumberProps> = ({ number, location, rotate }): ReactElement => {
  return (
    <StyledDiv location={location} number={number} rotate={rotate}>{number}</StyledDiv>
  );
};

export default DartBoardNumber;