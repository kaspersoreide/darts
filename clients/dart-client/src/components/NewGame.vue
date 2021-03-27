<template>
  <v-container>
    <v-row class="text">
      <v-col cols="12">
         <h1 >New Game</h1>
         <v-form id="playerform">
             <v-input
             > </v-input>
         </v-form> 
         <v-btn @click="addPlayer()">Add player</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios';

export let apiAxios = axios.create();

@Component
export default class NewGame extends Vue {
    private players = [''];

    addPlayer() {
        this.players.push('');
    }

    async createGame(): Promise<void> {
        apiAxios.post("http://192.168.86.48:3000/dev/createGame", {
            players : this.players
        }).then(result => result.data);
    }
}

</script>
