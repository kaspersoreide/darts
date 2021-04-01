import React, { ReactElement, FC, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CreateGameDialog from './CreateGameDialog';
import OpenGameDialog from './OpenGameDialog';
import { DoSetGame } from './Layout';

interface HeaderProps {
  title: string;
  loadGame: (gameId?: string) => void;
  currentGameId: string;
  doCreateGame: (players: string[]) => Promise<void>;
  doSetGame: DoSetGame;
}

const Header: FC<HeaderProps> = ({ title, loadGame, currentGameId, doCreateGame, doSetGame }): ReactElement => {

  const [openCreateDialog, setCreateDialog] = useState(false);
  const doOpenCreateDialog = (val: boolean) => setCreateDialog(val);

  const [openExistingDialog, setOpenExistingDialog] = useState(false);
  const doOpenExistingDialog = (val: boolean) => setOpenExistingDialog(val);
  return (
    <AppBar>
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h6">
              Game ID: { currentGameId }
            </Typography>      
          </Grid>
          <Grid item xs>
            <Typography variant="h6">
            { title }
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button color="inherit" onClick={ev => loadGame()}>Load latest</Button>
            <Button color="inherit" onClick={ev => setOpenExistingDialog(true)}>Load game</Button>
            <Button color="inherit" onClick={ev => setCreateDialog(true)}>Create new</Button>
          </Grid>
        </Grid>
      </Toolbar>
      <CreateGameDialog openDialog={openCreateDialog} doOpenDialog={doOpenCreateDialog} doCreateGame={doCreateGame}/>
      <OpenGameDialog openDialog={openExistingDialog} doOpenDialog={doOpenExistingDialog} doSetGame={doSetGame}/>
    </AppBar>
  );
};
export default Header;