<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
            <h1>Current Player: {{currentPlayer}}</h1>
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
                    <th class="text-left">
                        Status
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="player in players"
                    :key="player.name"
                    v-bind:style="{ color: activeColor(player) }"
                    >
                    <td>{{ player.player }}</td>
                    <td>{{ player.score }}</td>
                    <td>{{ player.status }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>

      </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" v-model="field"></v-text-field>
                            <v-btn color="green" @click="sendThrow">Send</v-btn>
                            <v-btn color="red" @click="undoThrow">Undo last throw</v-btn>
                        </v-col>
                        <v-col>
                            <v-radio-group v-model="multiplier">
                            <v-radio key="1" label="Single" value="1"></v-radio>
                            <v-radio key="2" label="Double" value="2"></v-radio>
                            <v-radio key="3" label="Triple" value="3"></v-radio>
                        </v-radio-group>
                        </v-col>
                        <v-col cols="3">
                            <v-row>
                                <v-col>
                                    <v-btn @click="sendThrowDirect('25')" class="pr-0 pl-0" block>25</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="sendThrowDirect('50')" class="pr-0 pl-0" block>50</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
    </v-row>
    <v-row v-if="true">
        <v-col>
            <v-row v-for="r in [1,2,3,4]" v-bind:key="r">
                <v-col v-for="c in [1,2,3,4,5]" v-bind:key="c">
                    <v-btn @click="sendThrowDirect(c+(r-1)*5)" class="pr-0 pl-0" block>{{c+(r-1)*5}}</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { PlayerStat } from '../../../../server/src/interfaces'
import * as settings from '../settings'
import axios from 'axios';
export let apiAxios = axios.create();
import * as vosk from 'vosk-browser';

@Component
export default class ActiveGame extends Vue {
    @Prop() gameid!: string;
    private players = [];
    private field = "";
    private multiplier = "1";
    private currentPlayer = "nobody";
   
    activeColor(player : PlayerStat) {
        if (player.score == 0) return "green";
        if (player.status == "bust") return "red";
        if (player.player == this.currentPlayer) return "blue";
    }

    mounted() {
        setInterval( () => {
            if(this.gameid!="") {
                this.updateGameData();
            }
        }, 1000); 
        //this.initSpeech();
    }

    async updateGameData() {
        let r = await fetch(settings.urlprefix+"/getGameData?gameid="+this.gameid);
        let robj = await r.json();
        console.log("PP", robj.playerstat);
        this.players = robj.playerstat;
        this.currentPlayer = robj.currentPlayer;
    }

    async undoThrow() {
        const throwBody = { gameid: this.gameid };
        await apiAxios.post(settings.urlprefix+"/undoThrow", throwBody).then(result => {
            console.log("Throw deleted!");
        });
        this.updateGameData();
    }

    sendThrow() {
        let f = parseInt(this.field);
        let m = parseInt(this.multiplier);
        this.insertThrow(f,m);
        this.field = '';
        this.multiplier = '1';
    }

    sendThrowDirect(value: string) {
        let f = parseInt(value);
        let m = parseInt(this.multiplier);
        this.insertThrow(f,m);
        this.field = '';
        this.multiplier = '1';
    }

    async insertThrow(field: number, multiplier: number) {
        const throwBody = 
        { 
            gameid: this.gameid,
            field, 
            multiplier 
            };
        await apiAxios.post(settings.urlprefix+"/insertThrow", throwBody).then(result => {
            console.log("Throw inserted");
        });
        this.updateGameData();
    }

    async initSpeech() {
        console.dir(vosk);
        const model = await vosk.createModel('model.tar.gz');

        const recognizer = new model.KaldiRecognizer();
        recognizer.on("result", (message) => {
            console.log(`Result: ${message.result}`);
        });
        recognizer.on("partialresult", (message) => {
            console.log(`Partial result: ${message.result}`);
        });
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                channelCount: 1,
                sampleRate: 16000
            },
        });
        
        const audioContext = new AudioContext();
        const recognizerNode = audioContext.createScriptProcessor(4096, 1, 1)
        recognizerNode.onaudioprocess = (event) => {
            try {
                recognizer.acceptWaveform(event.inputBuffer)
            } catch (error) {
                console.error('acceptWaveform failed', error)
            }
        }
        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(recognizerNode);
    }

}

</script>
