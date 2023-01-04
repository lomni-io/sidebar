import {Emitter} from "mitt";
import {store} from "@/store";

export class ChromePort {
    private emitter: Emitter<any>;
    private readonly id: string;
    private port: any;

    constructor(id: string, emitter: Emitter<any>) {
        this.emitter = emitter
        this.id = id
    }

    connect(){
        // @ts-ignore
        this.port = chrome.runtime.connect(this.id,{name: 'dashboard'});

        this.port.onMessage.addListener((msg:any) => {
            if (msg.kind === 'load-response') {
                this.emitter.emit("load-response", msg)
            }
            if (msg.kind === 'all-tabs-response') {
                console.log('all-tabs-response:: ', msg.data)
                store.dispatch('setAllTabs', msg.data)
            }
        })
        this.port.onDisconnect.addListener(() => {
            setTimeout(() => {
                this.connect();
            }, 100)
            console.log('port.onDisconnect')
        })

    }

    postMessage(msg: any){
        this.port.postMessage(msg);
    }
}