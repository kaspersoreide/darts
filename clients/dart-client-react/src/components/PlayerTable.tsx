import React, { ReactElement, FC } from "react";
import { GameData, PlayerStat } from "../../../../server/src/interfaces";
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
    background: '#007eff3b'
  },
  busted: {
    color: '#ff00003b'
  },
  done: {
    background: '#00ff1f3b'
  },
}));

interface PlayerProps {
  currentGame: GameData | null;
}

const PlayerTable: FC<PlayerProps> = ( { currentGame }): ReactElement => {
  const styles = useStyles();

  const isBust = (stat: PlayerStat) => {
    return stat.status === 'bust';
  }

  const isFinished = (stat: PlayerStat) => {
    return stat.status === 'haswon' || stat.status === 'wonjustnow';
  }

  const getClassForPlayerRow = (stat: PlayerStat) => {
    if (isFinished(stat))
      return styles.done;
    if (isBust(stat))
      return styles.busted;
    if (currentGame?.currentPlayer === stat.player)
      return styles.active;
    return '';
  }

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
          {currentGame?.playerstat?.map(playerStat => (
            <TableRow key={playerStat.player} className={getClassForPlayerRow(playerStat)} >
              <TableCell component="th" scope="row">
                {playerStat.player}
              </TableCell>
              <TableCell align="right">{playerStat.status}</TableCell>
              <TableCell align="right">{playerStat.score}</TableCell>
              <TableCell align="right">{playerStat.lastThrows.length > 0 ? (playerStat.lastThrows[0].multiplier + ' * ' + playerStat.lastThrows[0].field) : ''}</TableCell>
              <TableCell align="right">{playerStat.lastThrows.length > 1 ? (playerStat.lastThrows[1].multiplier + ' * ' + playerStat.lastThrows[1].field) : ''}</TableCell>
              <TableCell align="right">{playerStat.lastThrows.length > 2 ? (playerStat.lastThrows[2].multiplier + ' * ' + playerStat.lastThrows[2].field) : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PlayerTable;