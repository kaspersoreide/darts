import React, { ReactElement, FC } from "react";
import { GameData } from "../../../../server/src/interfaces";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    paddingBottom: '5px'
  }
}));

interface PlayerProps {
  currentGame: GameData | null;
}

const PlayerTable: FC<PlayerProps> = ( { currentGame }): ReactElement => {
  const styles = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Throw 1</TableCell>
            <TableCell align="right">Throw 2</TableCell>
            <TableCell align="right">Throw 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentGame?.playerstat?.map(player => (
            <TableRow key={player.player} >
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} component="th" scope="row">
                {player.player}
              </TableCell>
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} align="right">{player.status}</TableCell>
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} align="right">{player.score}</TableCell>
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} align="right">{player.lastThrows.length > 0 ? (player.lastThrows[0].multiplier + ' * ' + player.lastThrows[0].field) : ''}</TableCell>
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} align="right">{player.lastThrows.length > 1 ? (player.lastThrows[1].multiplier + ' * ' + player.lastThrows[1].field) : ''}</TableCell>
              <TableCell className={currentGame.currentPlayer === player.player ? styles.active : ''} align="right">{player.lastThrows.length > 2 ? (player.lastThrows[2].multiplier + ' * ' + player.lastThrows[2].field) : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PlayerTable;