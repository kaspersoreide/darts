import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueNativeSock from 'vue-native-websocket';
import { wsUrl } from './settings';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueNativeSock, `${wsUrl}`,
{ 
  store,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
  connectManually: false });


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
