<template>
  <v-container>
    <v-row class="text">
      <v-col cols="6">
         <h1 >New Game</h1>
         <v-form id="playerform" @submit.prevent>
             <v-text-field id='playerinput' name='playerinput'
                label="Enter player name"
                hide-details="auto"
                autocomplete="off"
                v-model="playername"
                @keypress.enter="addPlayer()"
             ></v-text-field>
             <v-btn color='blue' class="mt-5" @click="addPlayer()"> Add player </v-btn>
             <v-btn color='green' class="mt-5" @click="createGame()"> Create Game! </v-btn>
         </v-form> 
      </v-col>
      <v-col cols="6">
         <h1 >Player List</h1>
        <v-list-item
            v-for="(player, i) in players"
            :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="player"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios';
import * as settings from '../settings'

export let apiAxios = axios.create();

@Component
export default class NewGame extends Vue {
    private players: string[] = [];
    private playername = '';
    addPlayer() {        
        this.players.push(this.playername);
        this.playername = '';
    }

    async createGame(): Promise<void> {
        if (this.players.length !== 0) {
            apiAxios.post(settings.urlprefix+"/dev/createGame", {
                players : this.players
            }).then(result => {
                this.$emit("gameCreated", result.data.gameid);
            });
        }
    }
}

</script>
