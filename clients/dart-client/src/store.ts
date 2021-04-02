import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
    socket: {
        isConnected: false,
        message: '' as any,
        reconnectError: false,
      }    
};

const store = new Vuex.Store({
    state,
    mutations: {
      SOCKET_ONOPEN(state, event)  {
        Vue.prototype.$socket = event.currentTarget;
        state.socket.isConnected = true;
        Vue.prototype.$socket.send('{ "message": "test"}');
        console.log("SOCKET_ONOPEN");
      },
      SOCKET_ONCLOSE(state, event)  {
        console.log("SOCKET_ONCLOSE");
        state.socket.isConnected = false;
      },
      SOCKET_ONERROR(state, event)  {
        console.log("SOCKET_ONERROR");
        console.error(state, event);
      },
      SOCKET_ONMESSAGE(state, message) {
        console.log("SOCKET_ONMESSAGE");
        console.log(message);
        state.socket.message = message;
      },
      SOCKET_RECONNECT(state, count) {
        console.log("SOCKET_RECONNECT");
        console.info(state, count);
      },
      SOCKET_RECONNECT_ERROR(state) {
        console.log("SOCKET_RECONNECT_ERROR");
        state.socket.reconnectError = true;
      },
    },
    getters: {

    },
    actions: {

    }
});
  
export default store;
