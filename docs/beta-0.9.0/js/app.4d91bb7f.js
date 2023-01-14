(function(){var e={4172:function(e,t,n){"use strict";var a=n(9242),r=n(3396);function o(e,t,n,a,o,i){const c=(0,r.up)("SidebarView");return(0,r.wg)(),(0,r.j4)(c)}function i(e,t,n,a,o,i){var c=(0,r.up)("NavBar"),s=(0,r.up)("SearchContainer");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(c),e.renderData?((0,r.wg)(),(0,r.j4)(s,{key:0,"render-data":e.renderData},null,8,["render-data"])):(0,r.kq)("",!0)],64)}var c=function(e){return(0,r.dD)("data-v-0479eaf6"),e=e(),(0,r.Cn)(),e},s=c((function(){return(0,r._)("li",{class:"active"},"Search",-1)})),l=c((function(){return(0,r._)("li",null,"Sync",-1)})),u=[s,l];function d(e,t,n,a,o,i){return(0,r.wg)(),(0,r.iD)("ul",null,u)}var f=(0,r.aZ)({name:"NavBar"}),g=n(89);const m=(0,g.Z)(f,[["render",d],["__scopeId","data-v-0479eaf6"]]);var p=m;function v(e,t,n,a,o,i){const c=(0,r.up)("SearchBar"),s=(0,r.up)("TabContainer"),l=(0,r.up)("CurrentTabs"),u=(0,r.up)("FramesContainer");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(s,{title:"search bar","default-activation":!0},{default:(0,r.w5)((()=>[(0,r.Wm)(c,{"render-data":n.renderData},null,8,["render-data"])])),_:1}),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.renderData.windows,((e,t)=>((0,r.wg)(),(0,r.iD)("div",{key:t},[(0,r.Wm)(s,{title:"current tab: "+e.name,"default-activation":!0},{default:(0,r.w5)((()=>[(0,r.Wm)(l,{window:e},null,8,["window"])])),_:2},1032,["title"])])))),128)),(0,r.Wm)(s,{title:"frames","default-activation":!0},{default:(0,r.w5)((()=>[(0,r.Wm)(u,{frames:n.renderData.frames},null,8,["frames"])])),_:1})],64)}var h=n(7139);const b=e=>((0,r.dD)("data-v-64c52714"),e=e(),(0,r.Cn)(),e),w={id:"tab",ref:"tab",class:"tab"},y=b((()=>(0,r._)("input",{type:"checkbox"},null,-1))),T={class:"tab-content",ref:"content"};function _(e,t,n,o,i,c){return(0,r.wg)(),(0,r.iD)("div",w,[y,(0,r._)("label",{class:(0,h.C_)(["tab-label",{"label-open":c.isActive}]),onClick:t[0]||(t[0]=(...e)=>c.openTab&&c.openTab(...e)),draggable:"true"},(0,h.zw)(n.title),3),(0,r.wy)((0,r._)("div",T,[(0,r.WI)(e.$slots,"default",{},void 0,!0)],512),[[a.F8,c.isActive]])],512)}var D={name:"TabContainer",props:["title","defaultActivation"],data(){return{isActiveButton:null,lastOffetY:null}},watch:{},computed:{isActive(){return null===this.isActiveButton?this.defaultActivation:this.isActiveButton}},methods:{openTab(){null===this.isActiveButton&&this.defaultActivation||this.isActiveButton?this.isActiveButton=!1:this.isActiveButton=!0}}};const k=(0,g.Z)(D,[["render",_],["__scopeId","data-v-64c52714"]]);var I=k,S={class:"search-container"},C={class:"tag-input-container"},A=["onClick"];function O(e,t,n,o,i,c){var s=(0,r.up)("TagListContainer");return(0,r.wg)(),(0,r.iD)("div",S,[(0,r._)("div",C,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.selectedTags,(function(t,n){return(0,r.wg)(),(0,r.iD)("p",{class:"tag-input",key:n},[(0,r._)("span",{onClick:function(n){return e.removeTag(t)}},(0,h.zw)(t),9,A)])})),128)),(0,r.wy)((0,r._)("input",{class:(0,h.C_)({"no-tags":0===e.selectedTags.length}),"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.searchInput=t}),onKeydown:t[1]||(t[1]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.keydown&&e.keydown.apply(e,t)}),ref:"input"},null,34),[[a.nr,e.searchInput]])]),(0,r.Wm)(s,{"initial-show":10,tags:e.renderData.tags,class:"tag-list-container"},null,8,["tags"])])}const E={class:"tags"},P=["onClick"];function W(e,t,n,a,o,i){return(0,r.wg)(),(0,r.iD)("ul",E,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.tags,((e,t)=>((0,r.wg)(),(0,r.iD)("li",{key:t},[(0,r._)("a",{href:"#",class:"tag",style:(0,h.j5)(i.getCount(e.count)),onClick:t=>i.selectTag(t,e)},(0,h.zw)(e.name),13,P)])))),128))])}var N={name:"TagListContainer",emits:["addTag"],props:["tags"],data(){return{styleObject:{"--count":"'12'"}}},computed:{},methods:{getCount(e){return{"--count":`'${e}'`}},selectTag(e,t){this.$emit("addTag",t),e.preventDefault()}}};const x=(0,g.Z)(N,[["render",W],["__scopeId","data-v-e17599a6"]]);var M=x,Z=(0,r.aZ)({name:"SearchBar",props:["renderData"],components:{TagListContainer:M},data:function(){return{searchInput:"",selectedTags:[]}},methods:{removeTag:function(e){console.log(e)},keydown:function(){}}});const F=(0,g.Z)(Z,[["render",O],["__scopeId","data-v-6ab891cb"]]);var U=F,j={class:"container"},B={key:0},q={key:1};function R(e,t,n,a,o,i){var c=(0,r.up)("FrameDropArea"),s=(0,r.up)("FrameUnit"),l=(0,r.up)("TagContainer"),u=(0,r.up)("ScafoldBar"),d=(0,r.up)("NewGroupContainer");return(0,r.wg)(),(0,r.iD)("div",j,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.window.pinneds,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{key:t},[(0,r.Wm)(c),(0,r.Wm)(s,{frame:e},null,8,["frame"])])})),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.window.tabs,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{key:t},["frame"===e.kind?((0,r.wg)(),(0,r.iD)("div",B,[(0,r.Wm)(c),(0,r.Wm)(s,{frame:e},null,8,["frame"])])):(0,r.kq)("",!0),"group"===e.kind?((0,r.wg)(),(0,r.iD)("div",q,[(0,r.Wm)(u,{title:e.name,color:e.color},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.frames,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{key:t},[(0,r.Wm)(c),(0,r.Wm)(s,{frame:e},null,8,["frame"])])})),128)),(0,r.Wm)(l,{tags:e.tags,color:e.color},null,8,["tags","color"])]})),_:2},1032,["title","color"])])):(0,r.kq)("",!0)])})),128)),(0,r.Wm)(d)])}var Y={class:"scafold-container"},H={class:"header"};function L(e,t,n,a,o,i){return(0,r.wg)(),(0,r.iD)("div",Y,[(0,r._)("div",H,[(0,r._)("div",{class:(0,h.C_)(["input",e.color])},"+",2),(0,r._)("label",{class:(0,h.C_)(e.color)},(0,h.zw)(e.title),3)]),(0,r._)("div",{class:(0,h.C_)(["content",e.color])},[(0,r.WI)(e.$slots,"default",{},void 0,!0)],2)])}var J=(0,r.aZ)({name:"ScafoldBar",props:["title","color"]});const K=(0,g.Z)(J,[["render",L],["__scopeId","data-v-5c20ae63"]]);var G=K,V={class:"frame-info"},z={class:"frame-header"},$={class:"frame-header-left"},X=["src"],Q={class:"frame-header-right"},ee={class:"tags"};function te(e,t,n,o,i,c){var s=(0,r.up)("font-awesome-icon"),l=(0,r.up)("TagContainer");return(0,r.wg)(),(0,r.iD)("div",{class:"frame-info-container",draggable:"true",onDragleave:t[3]||(t[3]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.dragleave&&e.dragleave.apply(e,t)}),onDragend:t[4]||(t[4]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.dragend&&e.dragend.apply(e,t)}),onDragstart:t[5]||(t[5]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.dragstart&&e.dragstart.apply(e,t)}),ref:"frame",id:"frame"},[(0,r._)("div",V,[(0,r._)("div",z,[(0,r._)("div",$,[(0,r._)("img",{src:e.frame.favIconUrl,width:"16"},null,8,X),(0,r._)("small",null,(0,h.zw)(e.frame.domain),1)]),(0,r._)("div",Q,[e.frame.isPinned?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"frame-header-pinned pinned",onClick:t[0]||(t[0]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.unpinTab&&e.unpinTab.apply(e,t)}),title:"unpin current tab"},[(0,r.Wm)(s,{icon:"thumbtack"})])):(0,r.kq)("",!0),e.frame.isPinned?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",{key:1,class:"frame-header-pinned",onClick:t[1]||(t[1]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.pinTab&&e.pinTab.apply(e,t)}),title:"pin current tab"},[(0,r.Wm)(s,{icon:"thumbtack"})]))])]),(0,r._)("h1",{class:(0,h.C_)(["frame-title",{"current-selected":e.frame.isSelected}]),onClick:t[2]||(t[2]=(0,a.iM)((function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.goToPage&&e.goToPage.apply(e,t)}),["exact"]))},(0,h.zw)(e.frame.title),3),(0,r._)("div",ee,[(0,r.Wm)(l,{tags:e.frame.tags,"fixed-tags":e.frame.preProcessedTags},null,8,["tags","fixed-tags"])])])],544)}const ne={class:"tags"},ae=["onClick"],re=["onClick"];function oe(e,t,n,a,o,i){return(0,r.wg)(),(0,r.iD)("ul",ne,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.fixedTags,((e,t)=>((0,r.wg)(),(0,r.iD)("li",{key:t},[(0,r._)("a",{class:"tag fixed",onClick:t=>i.clickedTag(e)},(0,h.zw)(e),9,ae)])))),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.tags,((e,a)=>((0,r.wg)(),(0,r.iD)("li",{key:a},[(0,r._)("a",{class:(0,h.C_)(["tag",n.color]),onClick:t=>i.clickedTag(e),draggable:"true",onDragstart:t[0]||(t[0]=(...e)=>i.dragstart&&i.dragstart(...e)),id:"tag"},(0,h.zw)(e),43,re)])))),128))])}var ie={name:"TagContainer",props:["tags","fixedTags","color"],methods:{clickedTag(e){this.$emit("clickedTag",e)},dragstart(){}}};const ce=(0,g.Z)(ie,[["render",oe],["__scopeId","data-v-7ce70d3a"]]);var se=ce,le=(n(7658),n(65)),ue=function(e){var t=new URL(e).hostname;return t=t.replace("www.",""),t};function de(e){return e&&e.startsWith("https://")?(e=e.substring(8),e=e.replace("www.",""),e.split("/")[0]):""}function fe(e){var t=de(e),n=t.split(".");return n.pop(),n=n.filter((function(e){return"com"!==e})),n=n.filter((function(e){return e.length>1})),n}var ge=function(e,t,n){if(n||2===arguments.length)for(var a,r=0,o=t.length;r<o;r++)!a&&r in t||(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))};function me(e,t){void 0===t&&(t=[]);var n=new Array;if(0===e.length)return[];var a=e.map((function(e){return e.tags})).reduce((function(e,t){return e=e.concat(t),e})),r=he(a);return e.forEach((function(e){var a=!!e.url;if(a){var o=e,i=fe(o.url).map((function(e){return pe(e)})).sort((function(e,t){return r.get(e)||0<(r.get(t)||0)?1:-1})),c=t.find((function(e){return e.url===o.url})),s=ve(o.url,c);s&&(i=ge([s],i,!0)),0===e.tags.length&&(i=ge(["@emptyTags"],i,!0)),n.push({favIconUrl:o.favIconUrl,title:o.title,preProcessedTags:i,tags:e.tags,domain:ue(o.url),updatedAt:e.updatedAt,url:o.url,pinned:!!c&&c.pinned,kind:"url"})}var l=!!e.content;if(l){var u=e;i=["@note"];0===u.tags.length&&(i=ge(["@emptyTags"],i,!0)),n.push({id:u.id,content:u.content,preProcessedTags:i,tags:e.tags,pinned:!1,updatedAt:e.updatedAt,kind:"note"})}e.tags=e.tags.sort((function(e,t){return(r.get(e)||0)<(r.get(t)||0)?1:-1}))})),t.filter((function(t){return t.url&&!e.some((function(e){return e.url===t.url}))})).forEach((function(e){var t=fe(e.url).map((function(e){return pe(e)})).sort((function(e,t){return r.get(e)||0<(r.get(t)||0)?1:-1})),a=["@openTab","@newTab"];a.push.apply(a,t),n.push({favIconUrl:e.favIconUrl,title:e.title,preProcessedTags:a,tags:[],domain:ue(e.url),updatedAt:0,pinned:e.pinned,url:e.url,kind:"url"})})),n}function pe(e){return"@"+e}function ve(e,t){return t?"@openTab":null}function he(e){var t=new Map;return e.forEach((function(e){t.set(e,(t.get(e)||0)+1)})),t}var be=(0,le.MT)({state:function(){return{dragItem:null,storage:{kind:"local",accessKey:"",gistID:""},frames:[],clipboard:null,head:{input:""},frameContainer:{currentSelectedFrameIdx:-1},tabs:[]}},getters:{dragItem:function(e){return e.dragItem},storage:function(e){return e.storage},activeTab:function(e){var t=e.tabs.find((function(e){return e.active}));return t&&t.url?t:null},allTabs:function(e){return e.tabs},frames:function(e){return me(e.frames,e.tabs)},rawFrames:function(e){return e.frames}},mutations:{SET_DRAG_ITEM:function(e,t){e.dragItem=t},SET_STORAGE:function(e,t){localStorage.setItem("storage",JSON.stringify(t)),e.storage=t},SET_DATA:function(e,t){e.frames=t.frames,e.storage=t.storage},SET_CLIPBOARD:function(e,t){e.clipboard=t},SET_FRAMES:function(e,t){e.frames=t,localStorage.setItem("frames",JSON.stringify(t))},SET_FRAME:function(e,t){t.updatedAt=Date.now();var n=e.frames.findIndex((function(e){return e.url===t.url}));~n?e.frames[n]=t:e.frames.push(t),localStorage.setItem("frames",JSON.stringify(e.frames))},SET_ALL_TABS:function(e,t){e.tabs=t},SET_NOTE:function(e,t){t.updatedAt=Date.now(),e.frames.push(t),localStorage.setItem("frames",JSON.stringify(e.frames))},UPDATE_NOTE:function(e,t){var n=e.frames.findIndex((function(e){return e.id===t.id}));~n&&(e.frames[n]=t),localStorage.setItem("frames",JSON.stringify(e.frames))},REMOVE_NOTE:function(e,t){var n=e.frames.findIndex((function(e){return e.id===t.id}));~n&&e.frames.splice(n,1),localStorage.setItem("frames",JSON.stringify(e.frames))}},actions:{setDragItem:function(e,t){e.commit("SET_DRAG_ITEM",t)},setClipboard:function(e,t){e.state.clipboard!==t&&e.commit("SET_CLIPBOARD",t)},setAllTabs:function(e,t){e.commit("SET_ALL_TABS",t)},upsertFrame:function(e,t){e.commit("SET_FRAME",t)},insertNote:function(e,t){e.commit("SET_NOTE",t)},updateNote:function(e,t){e.commit("UPDATE_NOTE",t)},removeNote:function(e,t){e.commit("REMOVE_NOTE",t)},setFrames:function(e,t){e.commit("SET_FRAMES",t)},loadState:function(e){var t=[],n=localStorage.getItem("frames");n&&(t=JSON.parse(n));var a={kind:"local"},r=localStorage.getItem("storage");r&&(a=JSON.parse(r)),e.commit("SET_DATA",{frames:t,storage:a})},setStorage:function(e,t){e.commit("SET_STORAGE",t)}},modules:{}}),we=(0,r.aZ)({name:"FrameUnit",components:{TagContainer:se},props:["frame"],computed:{},methods:{dragstart:function(e){if("frame"===e.toElement.id){var t=this.$refs.frame;t.style.opacity="0.4";var n={kind:"frame",object:this.frame};be.dispatch("setDragItem",n)}},dragleave:function(){},dragend:function(){var e=this.$refs.frame;e.style.opacity="1",be.dispatch("setDragItem",null)},pinTab:function(){this.port.postMessage({kind:"pin-tab",tab:this.tab.id})},unpinTab:function(){this.port.postMessage({kind:"unpin-tab",tab:this.tab.id})},goToPage:function(){}}});const ye=(0,g.Z)(we,[["render",te],["__scopeId","data-v-b1b713c6"]]);var Te=ye;const _e={key:1,class:"drop-area"};function De(e,t,n,a,o,i){return(0,r.wg)(),(0,r.iD)(r.HY,null,[i.dragItem&&"frame"===i.dragItem.kind?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"hover-area",onDragover:t[0]||(t[0]=(...e)=>i.dragover&&i.dragover(...e))},null,32)):(0,r.kq)("",!0),i.isOver?((0,r.wg)(),(0,r.iD)("div",_e)):(0,r.kq)("",!0)],64)}var ke={name:"FrameDropArea",components:{},data(){return{dragOver:!1,currDate:Date.now(),lastOver:null,interval:null}},computed:{isOver(){return this.currDate-100<this.lastOver},dragItem(){return be.getters.dragItem}},watch:{dragItem(e){if(e){if(!this.interval){const e=this;this.interval=setInterval((function(){e.currDate=Date.now()}),100)}}else clearInterval(this.interval),this.interval=null}},methods:{dragover(){this.lastOver=Date.now()}},mounted(){}};const Ie=(0,g.Z)(ke,[["render",De],["__scopeId","data-v-f9da387a"]]);var Se=Ie;const Ce={key:0,class:"new-group"};function Ae(e,t,n,a,o,i){return i.dragItem&&"frame"===i.dragItem.kind?((0,r.wg)(),(0,r.iD)("div",Ce,"drop frame here to create group")):(0,r.kq)("",!0)}var Oe={name:"NewGroupContainer",computed:{dragItem(){return be.getters.dragItem}}};const Ee=(0,g.Z)(Oe,[["render",Ae],["__scopeId","data-v-5039c372"]]);var Pe=Ee,We=(0,r.aZ)({name:"CurrentActiveTabs",props:["window"],components:{TagContainer:se,NewGroupContainer:Pe,FrameDropArea:Se,FrameUnit:Te,ScafoldBar:G}});const Ne=(0,g.Z)(We,[["render",R],["__scopeId","data-v-1be35598"]]);var xe=Ne,Me={class:"frames-container"};function Ze(e,t,n,a,o,i){var c=(0,r.up)("FrameUnit");return(0,r.wg)(),(0,r.iD)("div",Me,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.frames,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{key:t},[(0,r.Wm)(c,{frame:e},null,8,["frame"])])})),128))])}var Fe=(0,r.aZ)({name:"FramesContainer",components:{FrameUnit:Te},props:["frames"]});const Ue=(0,g.Z)(Fe,[["render",Ze],["__scopeId","data-v-e90c4bca"]]);var je=Ue,Be={name:"SearchContainer",props:["renderData"],components:{FramesContainer:je,CurrentTabs:xe,TabContainer:I,SearchBar:U}};const qe=(0,g.Z)(Be,[["render",v]]);var Re=qe,Ye=n(8456),He=(0,r.aZ)({name:"SidebarView",components:{SearchContainer:Re,NavBar:p},computed:{renderData:function(){return Ye}}});const Le=(0,g.Z)(He,[["render",i]]);var Je=Le,Ke={components:{SidebarView:Je}};const Ge=(0,g.Z)(Ke,[["render",o]]);var Ve=Ge,ze=n(1373),$e=n(3642),Xe=function(e,t,n,a){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function i(e){try{s(a.next(e))}catch(t){o(t)}}function c(e){try{s(a["throw"](e))}catch(t){o(t)}}function s(e){e.done?n(e.value):r(e.value).then(i,c)}s((a=a.apply(e,t||[])).next())}))},Qe=function(e,t){var n,a,r,o,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(e){return function(t){return s([e,t])}}function s(o){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,a&&(r=2&o[0]?a["return"]:o[0]?a["throw"]||((r=a["return"])&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,a=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(r=i.trys,!(r=r.length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(6===o[0]&&i.label<r[1]){i.label=r[1],r=o;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(o);break}r[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(c){o=[6,c],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}},et=function(){function e(){}return Object.defineProperty(e.prototype,"login",{enumerable:!1,configurable:!0,writable:!0,value:function(e){return Xe(this,void 0,void 0,(function(){var t;return Qe(this,(function(n){return t=new $e.vd({auth:e}),console.log(t),t.rest.users.getAuthenticated().then((function(e){return console.log("success"),e})).catch((function(e){return console.log("error: ",e),!1})),[2]}))}))}}),e}(),tt=function(){function e(e,t){Object.defineProperty(this,"emitter",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"port",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.emitter=t,this.id=e}return Object.defineProperty(e.prototype,"connect",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this;this.port=chrome.runtime.connect(this.id,{name:"dashboard"}),this.port.onMessage.addListener((function(t){"load-response"===t.kind&&e.emitter.emit("load-response",t),"all-tabs-response"===t.kind&&(console.log("all-tabs-response:: ",t.data),be.dispatch("setAllTabs",t.data))})),this.port.onDisconnect.addListener((function(){setTimeout((function(){e.connect()}),100),console.log("port.onDisconnect")}))}}),Object.defineProperty(e.prototype,"postMessage",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.port.postMessage(e)}}),e}(),nt=n(3494),at=n(8539),rt=n(7749);nt.vI.add(at.Mdf,at.Xcf,at.EdJ,at.$aW,at.bgy,at.wlW,at.g6h,at.RP7,at.CPW);var ot=(0,ze.Z)(),it=(0,a.ri)(Ve);try{var ct=new tt("aekckpbdaninhmbbajcpedhaidaeofdh",ot);ct.connect(),it.config.globalProperties.port=ct}catch(st){console.log("error!")}it.config.globalProperties.emitter=ot,it.config.globalProperties.github=new et,setInterval((function(){navigator.clipboard.readText().then((function(e){be.dispatch("setClipboard",e)})).catch((function(){}))}),500),it.use(be).component("font-awesome-icon",rt.GN).mount("#app")},5696:function(){},8456:function(e){"use strict";e.exports=JSON.parse('{"tags":[{"name":"#tag1","count":3},{"name":"#tagTest","count":5},{"name":"#tagMenu","count":12},{"name":"#tagVith","count":3},{"name":"#tagAbig","count":9},{"name":"#tagTmp","count":3},{"name":"#tagTest","count":5},{"name":"#tagThau","count":12},{"name":"#tagVJuo","count":3},{"name":"#tagAbig","count":9},{"name":"#tagMenu","count":12},{"name":"#tagVith","count":3},{"name":"#tagAbig","count":9}],"windows":[{"name":"window main","pinneds":[{"id":1,"domain":"chrome.com","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"my current title","tags":["#tag1","#tag2"],"isPinned":true},{"id":2,"domain":"myDomain.io","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"other title here","tags":["#myTag","#tag2","#myTag","#tag2","#myTag","#tag2","#myTag","#tag2"],"isPinned":true}],"tabs":[{"id":3,"kind":"frame","domain":"myDomain.io","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"my title","tags":["#myTag","#tag2"]},{"kind":"group","name":"deploy","color":"red","tags":["#tag1","#tag2"],"frames":[{"id":4,"kind":"frame","domain":"lomni.io","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"no title that can supress","tags":["#myNew","#tag2"]}]},{"id":5,"kind":"frame","domain":"myDomain.io","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"mine here","tags":["#myTag","#tag2"]}]}],"frames":[{"id":6,"kind":"frame","domain":"myDomain.io","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"one little title here","tags":["#myTag","#tag2"]},{"id":7,"domain":"chrome.com","favIconUrl":"https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_10.ico","title":"my current title","tags":["#tag1","#tag2"],"isPinned":true}]}')}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,r,o){if(!a){var i=1/0;for(u=0;u<e.length;u++){a=e[u][0],r=e[u][1],o=e[u][2];for(var c=!0,s=0;s<a.length;s++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[s])}))?a.splice(s--,1):(c=!1,o<i&&(i=o));if(c){e.splice(u--,1);var l=r();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,r,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,o,i=a[0],c=a[1],s=a[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(s)var u=s(n)}for(t&&t(a);l<i.length;l++)o=i[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},a=self["webpackChunklomni"]=self["webpackChunklomni"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(4172)}));a=n.O(a)})();
//# sourceMappingURL=app.4d91bb7f.js.map