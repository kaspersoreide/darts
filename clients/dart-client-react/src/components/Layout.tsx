import React, { ReactElement, FC, useState } from "react";
import Header from './Header';
import { Container, Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { APP_TITLE } from "utils/constants";
import Main from "./Main";
import { GameData } from "../../../../server/src/interfaces";
import { loadLatestGameId, loadGameFromId, createGame } from "api";
import { useEffect } from "react";

type GameDataWithId = GameData & { gameId: string};
export type DoSetGame = (val: GameDataWithId) => void;

interface LayoutProps {

}

type NullableGame = GameData | null;

const Layout: FC<LayoutProps> = (): ReactElement => {
  const [game, setGame] = useState({} as NullableGame);
  const [gameId, setGameId] = useState('');
  const [pollId, setPollId] = useState(null as NodeJS.Timeout | null);

  const loadGame = async () => {
    doSetGameId(await loadLatestGameId());
  };

  const doCreateGame = async (players: string[]) => {
    const newGameId = await createGame(players);
    doSetGameId(newGameId);
  }

  const doSetGame: DoSetGame = (val: GameDataWithId) => {
    setGame(val);
    doSetGameId(val.gameId);
  }

  const doSetGameId = (id: string) => {
    setGameId(id);
    if (id.length > 0) {
      startPollingGame(id);
    } else {
      stopPollingGame();
    }
  }

  const startPollingGame = (id: string) => {
    stopPollingGame();
    if (id.length === 0) return;
    let retry = 0;
    setPollId(setInterval(async () => {
      try {
        setGame(await loadGameFromId(id));
        retry = 0;
      } catch (err) {
        retry++;
        console.error(err);
        if (retry >= 5) {
          stopPollingGame();
        }
      }
    }, 1000))
  }

  const stopPollingGame = () => {
    if (pollId !== null) {
      clearInterval(pollId);
      setPollId(null);
    }
  }

  useEffect(() => {
    async function fetchLatestGame() {
      setGame(await loadGameFromId(gameId));
    }
    if (gameId) {
      fetchLatestGame();
    }
  }, [gameId]);

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Header title={APP_TITLE} loadGame={loadGame} currentGameId={gameId} doCreateGame={doCreateGame} doSetGame={doSetGame}/>
      <Toolbar />
      <Main currentGame={game} />
    </Container>
  );
};
export default Layout;
