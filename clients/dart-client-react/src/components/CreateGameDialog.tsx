import React, { ReactElement, FC, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '500px',
  },
}));

interface CreateGameDialogProps  {
  openDialog: boolean;
  doOpenDialog: (val: boolean) => void;
  doCreateGame: (players: string[]) => Promise<void>;
}

const CreateGameDialog: FC<CreateGameDialogProps> = ( { openDialog, doOpenDialog, doCreateGame }): ReactElement => {
  const styles = useStyles();
  const [newPlayers, setNewPlayers] = useState([] as string[]);
  const [playerName, setPlayerName] = useState('Your name');
  const [errorText, setErrorText] = useState('');

  const hasPlayer = (name: string) => {
    return newPlayers.find(p => p === name) !== undefined;
  }

  const removePlayer = (playerIndex: number) => {
    newPlayers.splice(playerIndex, 1);
    setNewPlayers([...newPlayers]);
  }
  
  const addPlayer = (playerName: string) => {
    if (!isEmpty(playerName) && !hasPlayer(playerName)) {
      setNewPlayers([...newPlayers, playerName]);
      setPlayerName('');
    }
  }

  const handleClose = () => {
    reset();
    doOpenDialog(false);
  }

  const onChange = (ev: React.ChangeEvent) => {
    const newPlayerName = (ev.target as any).value;
    setPlayerName(newPlayerName); 
    setErrorText(hasPlayer(newPlayerName) ? 'Player already exists' : '')
  }

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      addPlayer(playerName);
    }
  }

  const reset = () => {
    setNewPlayers([]);
    setPlayerName('Your name');
    setErrorText('');
  }

  const doCreate = async () => {
    if (newPlayers.length > 0) {
      await doCreateGame(newPlayers);
      handleClose();
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle>Create new game</DialogTitle>
      <DialogContent className={styles.dialog}>
        <Grid container spacing={4}>
          <Grid item xs>
            <Grid container>
              <Grid item>
                <TextField
                  onFocus={ev => ev.target.select()}
                  onKeyDown={onKeyDown}
                  onChange={onChange}
                  autoFocus
                  margin="dense"
                  id="name"
                  variant="outlined"
                  label="Add player"
                  value={playerName} 
                  error={!isEmpty(errorText)}
                  helperText={errorText}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Add player"
                          onClick={(ev) => addPlayer(playerName)}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <List dense>
            {newPlayers.map((player, index) => (
                <ListItem>
                  <ListItemText primary={player} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={(ev) => removePlayer(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={doCreate} color="primary" disabled={newPlayers.length === 0}>Create</Button>
      </DialogActions>
    </Dialog>   
  );
};
export default CreateGameDialog;