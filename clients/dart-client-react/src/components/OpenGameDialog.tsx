import React, { ReactElement, FC, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { loadGameFromId } from "api";
import { isEmpty } from "lodash";
import { DoSetGame } from "./Layout";

interface OpenDialogProps  {
  openDialog: boolean;
  doOpenDialog: (val: boolean) => void;
  doSetGame: DoSetGame;
}

const CreateGameDialog: FC<OpenDialogProps> = ( { openDialog, doOpenDialog, doSetGame }): ReactElement => {
  const [gameId, setGameId] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleClose = () => {
    reset();
    doOpenDialog(false);
  }

  const onChange = (ev: React.ChangeEvent) => {
    const newGameId = (ev.target as any).value;
    setGameId(newGameId);
    setErrorText('');
  }

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' && gameId.length !== 0) {
      doLoad();
    }
  }

  const reset = () => {
    setGameId('');
  }

  const doLoad = async () => {
    try {
      const gameData = await loadGameFromId(gameId);
      setErrorText('');
      doSetGame({...gameData, gameId});
      doOpenDialog(false);
    } catch (err) {
      // We assume it doesn't exist
      setErrorText('Game does not exist');
    } 
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle>Create new game</DialogTitle>
      <DialogContent>
        <TextField
          onFocus={ev => ev.target.select()}
          onKeyDown={onKeyDown}
          onChange={onChange}
          autoFocus
          helperText={errorText}
          error={!isEmpty(errorText)}
          margin="dense"
          id="name"
          variant="outlined"
          label="Provide game ID"
          value={gameId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={doLoad} color="primary" disabled={gameId.length === 0}>Load</Button>
      </DialogActions>
    </Dialog>   
  );
};
export default CreateGameDialog;