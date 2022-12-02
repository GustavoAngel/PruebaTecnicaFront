import { createApp } from 'vue'
import App from './App.vue'
import Toaster from '@meforma/vue-toaster';

// eslint-disable-next-line
const vm=createApp(App).use(Toaster).mount('#app')

