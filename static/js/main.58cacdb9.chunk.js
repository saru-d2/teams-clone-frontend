(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{102:function(e,t,n){},135:function(e,t){},137:function(e,t){},180:function(e,t,n){},182:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),s=n(34),c=n.n(s),r=(n(102),n(24)),i=n.n(r),l=n(93),m=n(3),u=n(90),d=n(91),j=n(25),b=n(96),h=n(94),f=n(2),p=n(24),g=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).state={errors:{},formData:{}},o.onChange=o.onChange.bind(Object(j.a)(o)),o.onJoinRoom=o.onJoinRoom.bind(Object(j.a)(o)),o.onCreateRoom=o.onCreateRoom.bind(Object(j.a)(o)),o}return Object(d.a)(n,[{key:"onChange",value:function(e){var t=this.state.formData;t[e.target.id]=e.target.value,this.setState({formData:t})}},{key:"onJoinRoom",value:function(){var e=this;if(null!=this.state.formData["display-name"]&&null!=this.state.formData.roomID){var t={dispName:this.state.formData["display-name"],roomID:this.state.formData.roomID};console.log({req:t}),p.post("/joinRoom",t).then((function(n){console.log(n),0!=n.data.room_exists?e.props.history.push("/".concat(t.roomID)):alert("room does not exist")})),sessionStorage.setItem("dispName",t.dispName)}else alert("fill in the roomID and display name")}},{key:"onCreateRoom",value:function(){var e=this;if(console.log("create room"),null!=this.state.formData["display-name"]&&null!=this.state.formData.roomID){var t={dispName:this.state.formData["display-name"],roomID:this.state.formData.roomID};console.log({req:t}),p.post("/createRoom",t).then((function(n){console.log(n),1!=n.data.room_exists?e.props.history.push("/".concat(t.roomID)):alert("room already exists")})),sessionStorage.setItem("dispName",t.dispName)}else alert("fill in the roomID and display name")}},{key:"render",value:function(){return Object(f.jsxs)("div",{className:"container  mt-5 ",children:[Object(f.jsx)("h1",{className:"big-text text-center mb-0",children:Object(f.jsx)("b",{children:"TeamsLite"})}),Object(f.jsx)("div",{className:"rounded-corners",children:Object(f.jsx)("input",{type:"text",required:!0,id:"display-name",onChange:this.onChange,placeholder:"displayName",className:"form-control"})}),Object(f.jsx)("br",{}),Object(f.jsxs)("div",{className:"column text-center",children:[Object(f.jsx)("input",{type:"text",id:"roomID",onChange:this.onChange,placeholder:"roomID",className:"form-control"})," ",Object(f.jsx)("br",{}),Object(f.jsx)("button",{className:" muave shadow-move btn mx-md-2 my-2 my-md-0",onClick:this.onCreateRoom,children:"create new room"}),Object(f.jsx)("button",{className:"red shadow-move btn  mx-md-2 my-2 my-md-0",onClick:this.onJoinRoom,children:"join room"})]})]})}}]),n}(o.Component),O=n(95),x=n(19),v=n(50),D=n.n(v),I=n(49),N="http://localhost:4000",y=n.n(I)()(N),C=n(196),k=n(197),w=n(198),R=n(199),S=function(e){var t=Object(o.useRef)();return Object(o.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),Object(f.jsx)("video",{className:"h-50 col-md-5 col-sm-12 p-1",playsInline:!0,autoPlay:!0,ref:t})},T=function(e){var t=Object(o.useState)(!0),n=Object(x.a)(t,2),a=n[0],s=n[1],c=Object(o.useState)(!0),r=Object(x.a)(c,2),i=r[0],l=r[1],m=Object(o.useState)([]),u=Object(x.a)(m,2),d=u[0],j=u[1],b=Object(o.useRef)(),h=Object(o.useRef)(),p=Object(o.useRef)([]),g=(e.dispName,e.roomID);function v(){h.current&&(h.current.getAudioTracks()[0].enabled=!h.current.getAudioTracks()[0].enabled),s(!a),console.log("mute")}function I(){h.current&&(h.current.getVideoTracks()[0].enabled=!h.current.getVideoTracks()[0].enabled),l(h.current.getVideoTracks()[0].enabled),console.log("cam")}function N(){return a?Object(f.jsx)(C.a,{onClick:v}):Object(f.jsx)(k.a,{onClick:v})}function T(){return i?Object(f.jsx)(w.a,{onClick:I}):Object(f.jsx)(R.a,{onClick:I})}return Object(o.useEffect)((function(){y.on("connection",(function(){console.log("connected to client")})),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){b.current.srcObject=e,h.current=e,y.emit("join room",g),y.on("all users",(function(t){var n=[];console.log(t),t.forEach((function(t){var o=function(e,t,n){var o=new D.a({initiator:!0,trickle:!1,stream:n});return o.on("signal",(function(n){y.emit("sending signal",{userToSignal:e,callerID:t,signal:n})})),o}(t,y.id,e);p.current.push({peerID:t,peer:o}),n.push({peerID:t,peer:o})})),j(n)})),y.on("user joined",(function(t){var n=function(e,t,n){var o=new D.a({initiator:!1,trickle:!1,stream:n});return o.on("signal",(function(e){y.emit("returning signal",{signal:e,callerID:t})})),o.signal(e),o}(t.signal,t.callerID,e);p.current.push({peerID:t.callerID,peer:n}),j([].concat(Object(O.a)(d),[{peer:n,peerID:t.callerID}]))})),y.on("user-left",(function(e){var t=e.userID,n=p.current.find((function(e){return e.peerID==t}));n&&n.peer.destroy();var o=p.current.filter((function(e){return e.peerID!==t}));p.current=o,j(o)})),y.on("receiving returned signal",(function(e){p.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(f.jsxs)("div",{className:"sea-green h-100 container m-0 p-0 ",children:[Object(f.jsxs)("div",{className:"row h-95 align-middle justify-content-center vidGrid",children:[Object(f.jsx)("video",{className:"h-50 col-md-5 col-sm-12 p-1",muted:!0,ref:b,autoPlay:!0,playsInline:!0}),d.map((function(e){return Object(f.jsx)(S,{peer:e.peer},e.peerID)}))]}),Object(f.jsxs)("div",{className:"controls row-md-5 h-5 w-100 muave text-center align-center ",children:[Object(f.jsx)(N,{}),Object(f.jsx)(T,{})]})]})},E=n(92),J=(n(163),function(e){var t=e.messages;return Object(f.jsx)("ul",{className:"message-list w-100",children:t.map((function(e){return Object(f.jsxs)("li",{children:[Object(f.jsxs)("div",{className:"msg ",children:[e.from,":",Object(f.jsx)("br",{})," ",e.msg,Object(f.jsx)("br",{})]}),Object(f.jsx)("br",{})]})}))})});n(164);function P(){console.log("scroll");var e=document.getElementById("msg-list");console.log(e),e.scrollTo(0,e.scrollHeight-e.clientHeight)}var q=function(e){var t=Object(o.useState)([]),n=Object(x.a)(t,2),a=(n[0],n[1],Object(o.useState)([])),s=Object(x.a)(a,2),c=s[0],r=s[1],l=Object(o.useState)(""),m=Object(x.a)(l,2),u=m[0],d=m[1],j=e.dispName,b=e.roomID;Object(o.useEffect)((function(){P(),h(),y.on("msg-sent",(function(e){console.log("new-messages"),console.log(e),r(e),P()})),P()}),[]);var h=function(){var e={roomID:b};console.log("getmsgs"),i.a.post("/getMsg",e).then((function(e){r(e.data.msg_list),P()}))};return Object(f.jsxs)("div",{className:"chat-pane",children:[Object(f.jsx)("div",{className:"prev-chats",id:"msg-list",children:Object(f.jsx)(J,{messages:c})}),Object(f.jsx)("div",{className:"chat-input text-center",children:Object(f.jsx)("input",Object(E.a)({type:"text",className:"w-100",name:"chat-input",id:"chat-input",onKeyPress:function(e){if("Enter"===e.key&&u.length>0){var t={msg:u,from:j,roomID:b};console.log({reqData:t}),y.emit("new-msg",t),d(""),document.getElementById("chat-input").value=""}},onChange:function(e){d(e.target.value)}},"id","chat-input"))})]})},B=(n(24),function(e){var t=sessionStorage.getItem("dispName"),n=e.match.params.roomID;return Object(f.jsx)("div",{className:"container w-100 h-100 mw-100 mh-100 m-0 p-0  main-window",children:Object(f.jsxs)("div",{className:"row m-0 p-0 h-100 vh-100 ",children:[Object(f.jsx)("div",{className:"col-md-9 col-sm-7 col-xs-6 m-0 p-0 h-100",children:Object(f.jsx)(T,{roomID:n,dispName:t})}),Object(f.jsx)("div",{className:"col-md-3 col-sm-5 col-xs-6 m-0 p-0",children:Object(f.jsx)(q,{dispName:t,roomID:n})})]})})});n(172),n(173),n(180);i.a.defaults.baseURL=N;var F=function(){return Object(f.jsxs)(l.a,{children:[Object(f.jsx)(m.a,{exact:!0,path:"/",component:g}),Object(f.jsx)(m.a,{exact:!0,path:"/:roomID",component:B})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,200)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),o(e),a(e),s(e),c(e)}))};c.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(F,{})}),document.getElementById("root")),L()}},[[182,1,2]]]);
//# sourceMappingURL=main.58cacdb9.chunk.js.map