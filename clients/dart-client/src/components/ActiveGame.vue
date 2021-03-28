<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
            <h1>Current Player: {{currentPlayer}} ({{gameid}})</h1>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Player
                    </th>
                    <th class="text-left">
                        Points
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="player in players"
                    :key="player.name"
                    >
                    <td>{{ player.player }}</td>
                    <td>{{ player.score }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>

      </v-col>
    <v-btn @click="getGameData()">Get Game Data!</v-btn>
    </v-row>
    <v-row>
        <v-col>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="field">0</v-text-field>
                        </v-col>
                        <v-col>
                            <v-radio-group v-model="multiplier">
                            <v-radio key="1" label="Single" value="1"></v-radio>
                            <v-radio key="2" label="Double" value="2"></v-radio>
                            <v-radio key="3" label="Triple" value="3"></v-radio>
                        </v-radio-group>
                        </v-col>
                        <v-col>
                            <v-btn @click="sendThrow">Send</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import * as settings from '../settings'
import axios from 'axios';
export let apiAxios = axios.create();

@Component
export default class Dart extends Vue {
    @Prop() gameid!: string;
    private players = [];
    private field = "0";
    private multiplier = "1";
    private currentPlayer = "nobody";

    async getGameData() {
        let r = await fetch(settings.urlprefix+"/dev/getGameData?gameid="+this.gameid);
        let robj = await r.json();
        console.log("PP", robj.playerstat);
        this.players = robj.playerstat;
        this.currentPlayer = robj.currentPlayer;
    }

    sendThrow() {
        let f = parseInt(this.field);
        let m = parseInt(this.multiplier);
        this.insertThrow(f,m);
    }

    async insertThrow(field: number, multiplier: number) {
        const throwBody = 
        { 
            gameid: this.gameid,
            field, 
            multiplier 
            };
        apiAxios.post(settings.urlprefix+"/dev/insertThrow", throwBody).then(result => {
            console.log("Throw inserted");
        });
    }


}

</script>
