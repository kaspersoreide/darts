<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          <h1>Active Game</h1>
      </v-col>
    <v-btn @click="getGameData()">Get Game Data</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Dart extends Vue {
    private players = [];

    async getGameData() {
        let r = await fetch("http://192.168.86.48:3000/dev/getGameData?gameid=ABCD");
        let robj = await r.json();
        this.players = robj.players;
    }

}

</script>
