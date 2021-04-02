import React, { ReactElement, FC } from "react";
import { Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  northNumber: {
    width: '60px',
    height: '50px',
    color: '#ddd',
    position: 'absolute',
    fontSize: '35px',
    left: '270px',
    top: '3px',
    textAlign: 'center',
    textShadow: '-1px 0 1px #eee, 1px 0 1px #000',
    transformOrigin: '30px 297px',
  },
  southNumber: {
    width: '60px',
    height: '50px',
    color: '#ddd',
    position: 'absolute',
    fontSize: '35px',
    left: '270px',
    bottom: '1px',
    textAlign: 'center',
    textShadow: '-1px 0 1px #eee, 1px 0 1px #000',
    transformOrigin: '30px -246px',
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
  ringOneSpan: {
    width: '223px',
    height: '223px',
    left: '0',
    top: '0',
    transformOrigin: '0 223px',
    display: 'block',
    borderRadius: '0 223px 0 0',
    position: 'absolute',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)',
    transform: 'skewX(72deg)',
    background: '#a33',
  },
  ringOneDiv: {
    width: '223px',
    height: '223px',
    position: 'absolute',
    left: '223px',
    top: '0',
    overflow: 'hidden',
    transformOrigin: '0 223px',
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
  ringTwoDiv: {
    width: '208px',
    height: '208px',
    position: 'absolute',
    left: '208px',
    top: '0',
    overflow: 'hidden',
    transformOrigin: '0 208px',
  },
  ringTwoSpan: {
    width: '208px',
    height: '208px',
    left: '0',
    top: '0',
    transformOrigin: '0 208px',
    display: 'block',
    borderRadius: '0 208px 0 0',
    position: 'absolute',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)',
    transform: 'skewX(72deg)',
    background: '#333',
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
  ringThreeDiv: {
    width: '150px',
    height: '150px',
    position: 'absolute',
    left: '150px',
    top: '0',
    overflow: 'hidden',
    transformOrigin: '0 150px',
  },
  ringThreeSpan: {
    width: '150px',
    height: '150px',
    left: '0',
    top: '0',
    transformOrigin: '0 150px',
    display: 'block',
    borderRadius: '0 150px 0 0',
    position: 'absolute',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)',
    transform: 'skewX(72deg)',
    background: '#a33',
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
  ringFourDiv: {
    width: '135px',
    height: '135px',
    position: 'absolute',
    left: '135px',
    top: '0',
    overflow: 'hidden',
    transformOrigin: '0 135px',
  },
  ringFourSpan: {
    width: '135px',
    height: '135px',
    left: '0',
    top: '0',
    transformOrigin: '0 135px',
    display: 'block',
    borderRadius: '0 135px 0 0',
    position: 'absolute',
    boxShadow: 'inset 0 0 5px rgb(0 0 0 / 80%)',
    transform: 'skewX(72deg)',
    background: '#333',
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
  n1: {
    transform: 'rotate(18deg)'
  },
  n2: {
    transform: 'rotate(-36deg)'
  },
  n3: {
    transform: 'rotate(0deg)'
  },
  n4: {
    transform: 'rotate(54deg)'
  },
  n5: {
    transform: 'rotate(-18deg)'
  },
  n6: {
    transform: 'rotate(90deg)'
  },
  n7: {
    transform: 'rotate(36deg)'
  },
  n8: {
    transform: 'rotate(72deg)'
  },
  n9: {
    transform: 'rotate(-54deg)'
  },
  n10: {
    transform: 'rotate(-72deg)'
  },
  n11: {
    transform: 'rotate(-90deg)'
  },
  n12: {
    transform: 'rotate(-36deg)'
  },
  n13: {
    transform: 'rotate(72deg)'
  },
  n14: {
    transform: 'rotate(-72deg)'
  },
  n15: {
    transform: 'rotate(-54deg)'
  },
  n16: {
    transform: 'rotate(54deg)'
  },
  n17: {
    transform: 'rotate(-18deg)'
  },
  n18: {
    transform: 'rotate(36deg)'
  },
  n19: {
    transform: 'rotate(18deg)'
  },
  n20: {
    transform: 'rotate(0)'
  },
  pie1: {
    transform: 'rotate(-81deg) skewX(-72deg)'
  },
  pie2: {
    transform: 'rotate(-45deg) skewX(-72deg)'
  },
  pie3: {
    transform: 'rotate(-9deg) skewX(-72deg)'
  },
  pie4: {
    transform: 'rotate(27deg) skewX(-72deg)'
  },
  pie5: {
    transform: 'rotate(63deg) skewX(-72deg)'
  },
  pie6: {
    transform: 'rotate(99deg) skewX(-72deg)'
  },
  pie7: {
    transform: 'rotate(135deg) skewX(-72deg)'
  },
  pie8: {
    transform: 'rotate(171deg) skewX(-72deg)'
  },
  pie9: {
    transform: 'rotate(207deg) skewX(-72deg)'
  },
  pie10: {
    transform: 'rotate(243deg) skewX(-72deg)'
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

  return (
    <Container className={styles.root}> 
      {/* <StyledDiv /> */}
      <div className={styles.root}>
        <div className={styles.dartboard}>
          {/* The outer green doubles as a background */}
          <div className={styles.ringOne}>
            {/* The outer red doubles on top of the green background */}
            { [1,2,3,4,5,6,7,8,9,10].map(n => <div className={`${styles[`pie${n}` as 'pie1']} ${styles.ringOneDiv}`}><span className={styles.ringOneSpan}></span></div>)}
          </div>
          {/* The outer white pies as a background */}
          <div className={styles.ringTwo}>
            {/* The outer black pies on top of the background */}
            { [1,2,3,4,5,6,7,8,9,10].map(n => <div className={`${styles[`pie${n}` as 'pie1']} ${styles.ringTwoDiv}`}><span className={styles.ringTwoSpan}></span></div>)}
          </div>
          {/* The inner green triples as a background */}
          <div className={styles.ringThree}>
            {/* The inner red triples on top of the background */}
            { [1,2,3,4,5,6,7,8,9,10].map(n => <div className={`${styles[`pie${n}` as 'pie1']} ${styles.ringThreeDiv}`}><span className={styles.ringThreeSpan}></span></div>)}
          </div>
          {/* The inner white pies as a background */}
          <div className={styles.ringFour}>
            {/* The inner black pies on top of the white background */}
            { [1,2,3,4,5,6,7,8,9,10].map(n => <div className={`${styles[`pie${n}` as 'pie1']} ${styles.ringFourDiv}`}><span className={styles.ringFourSpan}></span></div>)}
          </div>
          <div className={styles.semiBullsEye}></div>
          <div className={styles.bullsEye}></div>
          {/* The outer border around the board */}
          <div className={styles.outerBorder}></div>
          {/* The numbers around the board (as 'n1' is a hack to work around typescript complaining about index type) */}
          { northNumbers.map(n => <div className={`${styles[`n${n}` as 'n1']} ${styles.northNumber}`}>{n}</div>)}
          { southNumbers.map(n => <div className={`${styles[`n${n}` as 'n1']} ${styles.southNumber}`}>{n}</div>)}
        </div>
      </div>
    </Container>
  );
};

export default DartBoard;