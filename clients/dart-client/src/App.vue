<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="mr-2"
          contain
          src="./assets/dart.png"
          transition="scale-transition"
          width="80"
        />
      </div>

      <span class="mr-2">GAME: {{gameid}}</span>
      <v-spacer></v-spacer>
        <v-btn color="secondary" class="mr-3" @click="createGameDialog = true;"> New game </v-btn>
        <v-btn color="secondary" class="mr-3" @click="joinGameDialog = true;"> Join game </v-btn>
        <v-btn color="secondary" @click="joinLatestGame()"> Join most recent game </v-btn>

    </v-app-bar>

    <v-main>
    <v-dialog
      v-model="createGameDialog"
    >
      <v-card>
        <v-card-title class="headline">
          Create new game
        </v-card-title>
        <v-card-text><NewGame @gameCreated="startGame"/></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="joinGameDialog"
    >
      <v-card>
        <v-card-title class="headline">
          Join game
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field placeholder="enter game ID" v-model="gameidjoin"/>
            </v-form>
        <v-btn @click="joinGame"> Join! </v-btn> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        
        </v-card-actions>
      </v-card>
    </v-dialog>
      <ActiveGame :gameid="gameid"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import ActiveGame from './components/ActiveGame.vue';
import NewGame, { apiAxios } from './components/NewGame.vue';
import * as settings from './settings';

@Component({
    components : {
        ActiveGame, NewGame
    }
})
export default class App extends Vue {

    private createGameDialog = false;
    private gameidjoin = '';
    private gameid = '';
    private joinGameDialog = false;

    async joinLatestGame() {
        let response = await apiAxios.get(settings.urlprefix+"/getLatestGame");
        this.gameid = response.data.gameid;
    }

    startGame(gameid: string) {
        this.gameid = gameid;
        this.createGameDialog = false;
    }

    joinGame() {
        this.gameid = this.gameidjoin;
        this.joinGameDialog = false;
    }

}
</script>
