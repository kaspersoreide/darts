import React, { ReactElement, FC } from "react";
import { Container, Grid } from "@material-ui/core"
import { GameData } from "../../../../server/src/interfaces";
import { makeStyles } from '@material-ui/core/styles';
import PlayerTable from './PlayerTable';
import DartBoard from './DartBoard';
import ButtonGrid from './ButtonGrid';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '20px',
  },
  active: {
    color: 'blue'
  },
  busted: {
    color: 'red'
  },
  done: {
    color: 'green'
  },
  currentPlayer: {
    paddingBottom: '10px',
    textAlign: 'center'
  }
}));

interface MainProps {
  currentGame: GameData | null;
  gameId: string;
}

const Main: FC<MainProps> = ( { currentGame, gameId }): ReactElement => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Grid container spacing={4}>
        <Grid item md>
          <PlayerTable currentGame={currentGame}/>
        </Grid>
        <Grid item md>
          <ButtonGrid gameId={gameId}/>
          <DartBoard />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Main;