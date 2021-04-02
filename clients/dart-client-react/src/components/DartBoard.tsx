import React, { ReactElement, FC } from "react";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pie from './DartBoardPie';
import DartBoardNumber from './DartBoardNumber';
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  dartboard: {
    width: '600px',
    height: '600px',
    background: '#333',
    borderRadius: '600px',
    position: 'relative',
    margin: '0 auto',
    boxShadow: '0 0 10px rgb(0 0 0 / 80%)',
  },
  outerBorder: {
    width: '582px',
    height: '582px',
    borderRadius: '580px',
    border: '2px solid #ddd',
    left: '9px',
    top: '9px',
    position: 'absolute'
  },
  ringOne: {
    width: '446px',
    height: '446px',
    borderRadius: '450px',
    overflow: 'hidden',
    border: '2px solid #ddd',
    position: 'absolute',
    left: '75px',
    top: '75px',
    background: '#363',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)'
  },
  ringTwo: {
    width: '416px',
    height: '416px',
    border: '2px solid #ddd',
    borderRadius: '420px',
    overflow: 'hidden',
    position: 'absolute',
    left: '90px',
    top: '90px',
    background: '#eec',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)'
  },
  ringThree: {
    width: '300px',
    height: '300px',
    border: '2px solid #ddd',
    borderRadius: '300px',
    overflow: 'hidden',
    position: 'absolute',
    left: '148px',
    top: '148px',
    background: '#363',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)'
  },
  ringFour: {
    width: '270px',
    height: '270px',
    border: '2px solid #ddd',
    borderRadius: '270px',
    overflow: 'hidden',
    position: 'absolute',
    left: '163px',
    top: '163px',
    background: '#eec',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)'
  },
  semiBullsEye: {
    width: '48px',
    height: '48px',
    border: '2px solid #ddd',
    borderRadius: '48px',
    position: 'absolute',
    left: '274px',
    top: '274px',
    background: '#363',
    boxShadow: '0 0 5px rgb(0 0 0 / 80%)',
  },
  bullsEye: {
    width: '20px',
    height: '20px',
    border: '2px solid #ddd',
    borderRadius: '20px',
    position: 'absolute',
    left: '288px',
    top: '288px',
    background: '#a33',
    boxShadow: '0 0 5px rgb(0 0 0 / 80%)'
  },
  root: {
    padding: '20px',
    transform: 'scale(0.9)',
    marginTop: '-40px'
  }
}));

interface DartBoardProps {
}

const DartBoard: FC<DartBoardProps> = (): ReactElement => {

  const styles = useStyles();
  const northNumbers = [1,4,5,6,9,11,12,13,14,18,20];
  const southNumbers = [8,16,7,19,3,17,2,15,10];
  const pies = [1,2,3,4,5,6,7,8,9,10];
  const numberRotateValues: Record<number, number> = {
    1: 18,
    2: -36,
    3: 0,
    4: 54,
    5: -18,
    6: 90,
    7: 36,
    8: 72,
    9: -54,
    10: -72,
    11: -90,
    12: -36,
    13: 72,
    14: -72,
    15: -54,
    16: 54,
    17: -18,
    18: 36,
    19: 18,
    20: 0
  }
  const pieRotateValues: Record<number, number> = {
    1: -81,
    2: -45,
    3: -9, 
    4: 27,
    5: 63,
    6: 99,
    7: 135,
    8: 171,
    9: 207,
    10: 243
  }
  return (
    <Container className={styles.root}> 
      <div className={styles.root}>
        <div className={styles.dartboard}>
          {/* The outer green doubles as a background */}
          <div className={styles.ringOne}>
            {/* The outer red doubles on top of the green background */}
            { pies.map(n => <Pie key={n} size={223} color={'#a33'} rotate={pieRotateValues[n]} />)}
          </div>
          {/* The outer white pies as a background */}
          <div className={styles.ringTwo}>
            {/* The outer black pies on top of the background */}
            { pies.map(n => <Pie key={n} size={208} color={'#333'} rotate={pieRotateValues[n]} />)}
          </div>
          {/* The inner green triples as a background */}
          <div className={styles.ringThree}>
            {/* The inner red triples on top of the background */}
            { pies.map(n => <Pie key={n} size={150} color={'#a33'} rotate={pieRotateValues[n]} />)}
          </div>
          {/* The inner white pies as a background */}
          <div className={styles.ringFour}>
            {/* The inner black pies on top of the white background */}
            { pies.map(n => <Pie key={n} size={135} color={'#333'} rotate={pieRotateValues[n]} />)}
          </div>
          <div className={styles.semiBullsEye}></div>
          <div className={styles.bullsEye}></div>
          {/* The outer border around the board */}
          <div className={styles.outerBorder}></div>
          {/* The numbers around the board */}
          { northNumbers.map(n => <DartBoardNumber key={n} number={n} location={'top'} rotate={numberRotateValues[n]}/>)}
          { southNumbers.map(n => <DartBoardNumber key={n} number={n} location={'bottom'} rotate={numberRotateValues[n]}/>)}
        </div>
      </div>
    </Container>
  );
};

export default DartBoard;