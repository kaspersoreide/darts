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
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
        <span class="mr-2">gameid: {{gameid}}</span>
    </v-app-bar>

    <v-main>
    <v-dialog
      v-model="createGameDialog"
      persistent
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
        <v-btn @click="createGameDialog = true;"> New game </v-btn>
      <ActiveGame/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import Dart from './components/Dart.vue';
import ActiveGame from './components/ActiveGame.vue';
import NewGame from './components/NewGame.vue';

@Component({
    components : {
        Dart, ActiveGame, NewGame
    }
})
export default class App extends Vue {

    private createGameDialog = false;
    private gameid = '';

    startGame(gameid: string) {
        this.gameid = gameid;
        this.createGameDialog = false;
    }



}
</script>
