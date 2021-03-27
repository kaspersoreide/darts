<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <p>
            Hei jeg heter paragraf
            Hello {{hello}}
        </p>
        <h1> Players: </h1>
        <v-list-item
          v-for="(player, i) in players"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="player"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    <v-btn @click="getGame()"> click me! </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Dart extends Vue {
    private hello = "nothing";
    private players = [];

    async getGame() {
        let r = await fetch("http://localhost:3000/dev/getGame?gameid=ABFG");
        let robj = await r.json();
        this.players = robj.players;
    }

    async test(): Promise<void> {
        let r = await fetch("https://ny5wyit49b.execute-api.eu-north-1.amazonaws.com/hello");
        let robj = await r.json();
        this.hello = robj.hello;
    }
}

</script>
