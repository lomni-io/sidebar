import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import {GithubAuth} from "@/views/gh_auth";
import "v-contextmenu/dist/themes/dark.css";
import {ChromePort} from "@/chrome-port/port";
import "@/assets/styles/button.scss";
import "@/assets/styles/color.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowUpRightFromSquare,
    faCirclePlus,
    faEdit,
    faEye,
    faFloppyDisk, faPlus, faSquarePlus,
    faTrash,
    faTv
} from '@fortawesome/free-solid-svg-icons'
import {store} from "@/store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(faEye, faEdit, faFloppyDisk, faTrash, faTv, faArrowUpRightFromSquare, faSquarePlus)

const emitter = mitt();

const app = createApp(App)

try {
    const port = new ChromePort(process.env.VUE_APP_CHROME_EXTENSION_ID, emitter)
    port.connect()
    app.config.globalProperties.port = port;
}catch (e) {
    console.log('error!')
}


app.config.globalProperties.emitter = emitter;

app.config.globalProperties.github = new GithubAuth();

setInterval(() => {
    navigator.clipboard.readText().then(clipboard => {
        store.dispatch('setClipboard', clipboard)
    }).catch(() => {})
}, 500)


app.use(store).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
