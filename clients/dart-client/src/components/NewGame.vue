<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          
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
    private hello = "nothing";
    private players = [];

    async createGame(): Promise<void> {
        apiAxios.post("http://localhost:3000/dev/createGame", {
            players : this.players
        }).then(result => result.data);
    }

    async test(): Promise<void> {
        let r = await fetch("https://ny5wyit49b.execute-api.eu-north-1.amazonaws.com/hello");
        let robj = await r.json();
        this.hello = robj.hello;
    }
}

</script>
