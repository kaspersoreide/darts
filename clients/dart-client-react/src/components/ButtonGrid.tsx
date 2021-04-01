import React, { ReactElement, FC, useState } from "react";
import { TextField, Container, Paper, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { insertThrow, undoThrow } from "api";
import { AddThrow, UndoThrow } from "../../../../server/src/interfaces";

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    marginTop: '10px',
    marginLeft: '3px',
    marginBottom: '20px'
  },
  root: {
    padding: '5px'
  }
}));

interface ButtonGridProps {
  gameId: string;
}

type Multiplier = '1' | '2' | '3';

const ButtonGrid: FC<ButtonGridProps> = ({ gameId }): ReactElement => {

  const styles = useStyles();
  const [scoreField, setScoreField] = useState(0);
  const [multiplier, setMultiplier] = useState('1' as Multiplier);

  const buttons: number[] = [];
  for (let i = 1; i < 21; i++) {
    buttons.push(i);
  }

  const onKeyDown = async (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' && isValidField(scoreField)) {
      await doSendManualScore();
    }
  }

  const isValidField = (field: number) => {
    return [...buttons, 25, 50].includes(field);
  }

  const onChange = (ev: React.ChangeEvent) => {
    setScoreField((ev.target as any).value);
  }

  const sendScoreDirect = async (field: number, ignoreMultiplier = false) => {
    const playerThrow: AddThrow = {
      gameid: gameId,
      field,
      multiplier: ignoreMultiplier ? '1' : multiplier, // Don't multiply the special values 0, 25, 50
    }
    await insertThrow(playerThrow);
  }

  const doSendManualScore = async () => {
    const doPlayerThrow: AddThrow = {
      gameid: gameId,
      field: scoreField,
      multiplier,
    }
    await insertThrow(doPlayerThrow);
  }

  const doUndo = async () => {
    const doUndoThrow: UndoThrow = {
      gameid: gameId
    }
    await undoThrow(doUndoThrow);
  }

  const handleMultiplierChange = (ev: React.ChangeEvent) => {
    setMultiplier((ev.target as any).value);
  }

  return (
    <Container className={styles.root}>
      <Paper component="form" className={styles.root}>
        <TextField
          onFocus={ev => ev.target.select()}
          onKeyDown={onKeyDown}
          onChange={onChange}
          margin="dense"
          type="number"
          id="name"
          variant="outlined"
          label="Send score"
          value={scoreField} />
        <ButtonGroup
          className={styles.buttonGroup}
          orientation="horizontal"
          color="primary"
          aria-label="horizontal contained primary button group"
          variant="contained">
          <Button onClick={ev => doSendManualScore()}>Send</Button>
          <Button color="secondary" onClick={ev => doUndo()}>Undo</Button>
        </ButtonGroup>

        <Grid container>
          <Grid item xs={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Multiplier</FormLabel>
              <RadioGroup aria-label="multiplier" name="multiplier" value={multiplier} onChange={handleMultiplierChange}>
                <FormControlLabel value="1" control={<Radio />} label="1x" />
                <FormControlLabel value="2" control={<Radio />} label="2x" />
                <FormControlLabel value="3" control={<Radio />} label="3x" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
                {
                buttons.map(b => (
                  <Grid item key={b}><Button onClick={ev => sendScoreDirect(b)}>{b}</Button></Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={2}>
          <ButtonGroup
            className={styles.buttonGroup}
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained">
            <Button color="secondary" onClick={ev => sendScoreDirect(0, true)}>0</Button>
            <Button onClick={ev => sendScoreDirect(25, true)}>25</Button>
            <Button onClick={ev => sendScoreDirect(50, true)}>50</Button>
          </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default ButtonGrid;