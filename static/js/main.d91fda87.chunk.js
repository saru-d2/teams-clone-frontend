(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{101:function(e,t,n){},102:function(e,t,n){},136:function(e,t){},138:function(e,t){},174:function(e,t,n){"use strict";n.r(t);var o=n(0),s=n.n(o),a=n(34),c=n.n(a),r=(n(101),n(102),n(20)),i=n.n(r),l=n(92),u=n(3),m=n(89),j=n(90),d=n(25),b=n(95),f=n(93),h=n(2),g=n(20),p=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var o;return Object(m.a)(this,n),(o=t.call(this,e)).state={errors:{},formData:{}},o.onChange=o.onChange.bind(Object(d.a)(o)),o.onJoinRoom=o.onJoinRoom.bind(Object(d.a)(o)),o.onCreateRoom=o.onCreateRoom.bind(Object(d.a)(o)),o}return Object(j.a)(n,[{key:"onChange",value:function(e){var t=this.state.formData;t[e.target.id]=e.target.value,this.setState({formData:t})}},{key:"onJoinRoom",value:function(){if(null!=this.state.formData["display-name"]&&null!=this.state.formData.roomID){var e={dispName:this.state.formData["display-name"],roomID:this.state.formData.roomID};console.log({req:e}),g.post("/joinRoom",e).then((function(e){console.log(e),0!=e.data.room_exists||alert("room does not exist")})),sessionStorage.setItem("dispName",e.dispName),this.props.history.push("/".concat(e.roomID))}else alert("fill in the roomID and display name")}},{key:"onCreateRoom",value:function(){if(console.log("create room"),null!=this.state.formData["display-name"]&&null!=this.state.formData.roomID){var e={dispName:this.state.formData["display-name"],roomID:this.state.formData.roomID};console.log({req:e}),g.post("/createRoom",e).then((function(e){console.log(e),1!=e.data.room_exists||alert("room already exists")})),sessionStorage.setItem("dispName",e.dispName),this.props.history.push("/".concat(e.roomID))}else alert("fill in the roomID and display name")}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"main-pane col centered",children:[Object(h.jsx)("h1",{children:"welcome"}),Object(h.jsx)("div",{className:"centered rounded-corners",children:Object(h.jsx)("input",{type:"text",required:!0,id:"display-name",onChange:this.onChange,placeholder:"displayName"})}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{className:"col",children:[Object(h.jsx)("input",{type:"text",id:"roomID",onChange:this.onChange,placeholder:"roomID"}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("button",{className:"red btn",onClick:this.onCreateRoom,children:"create new room"}),Object(h.jsx)("div",{className:"col",children:Object(h.jsx)("button",{className:"btn red",onClick:this.onJoinRoom,children:"join room"})})]})]})]})}}]),n}(o.Component),O=n(94),v=n(19),x=n(49),D=n.n(x),I=n(48),N=n.n(I)()("https://teams-clone-backend-server.herokuapp.com/"),y=n(188),k=n(189),C=n(190),R=n(191),w=function(e){var t=Object(o.useRef)();return Object(o.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),Object(h.jsx)("video",{playsInline:!0,autoPlay:!0,ref:t})},S=function(e){var t=Object(o.useState)(!0),n=Object(v.a)(t,2),s=n[0],a=n[1],c=Object(o.useState)(!0),r=Object(v.a)(c,2),i=r[0],l=r[1],u=Object(o.useState)([]),m=Object(v.a)(u,2),j=m[0],d=m[1],b=Object(o.useRef)(),f=Object(o.useRef)(),g=Object(o.useRef)([]),p=(e.dispName,e.roomID);function x(){f.current&&a(!s),console.log("mute")}function I(){f.current&&(f.current.getVideoTracks()[0].enabled=!f.current.getVideoTracks()[0].enabled),l(f.current.getVideoTracks()[0].enabled),console.log("cam")}function S(){return s?Object(h.jsx)(y.a,{onClick:x}):Object(h.jsx)(k.a,{onClick:x})}function E(){return i?Object(h.jsx)(C.a,{onClick:I}):Object(h.jsx)(R.a,{onClick:I})}return Object(o.useEffect)((function(){N.on("connection",(function(){console.log("connected to client")})),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){b.current.srcObject=e,f.current=e,N.emit("join room",p),N.on("all users",(function(t){var n=[];console.log(t),t.forEach((function(t){var o=function(e,t,n){var o=new D.a({initiator:!0,trickle:!1,stream:n});return o.on("signal",(function(n){N.emit("sending signal",{userToSignal:e,callerID:t,signal:n})})),o}(t,N.id,e);g.current.push({peerID:t,peer:o}),n.push(o)})),d(n)})),N.on("user joined",(function(t){var n=function(e,t,n){var o=new D.a({initiator:!1,trickle:!1,stream:n});return o.on("signal",(function(e){N.emit("returning signal",{signal:e,callerID:t})})),o.signal(e),o}(t.signal,t.callerID,e);g.current.push({peerID:t.callerID,peer:n}),d([].concat(Object(O.a)(j),[n]))})),N.on("user-left",(function(e){console.log("user-left",e),console.log("peers",j)})),N.on("receiving returned signal",(function(e){g.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(h.jsxs)("div",{className:"left-pane col",children:[Object(h.jsxs)("div",{className:"vidGrid col",children:[Object(h.jsx)("video",{muted:!0,ref:b,autoPlay:!0,playsInline:!0}),j.map((function(e,t){return Object(h.jsx)(w,{peer:e},t)}))]}),Object(h.jsxs)("div",{className:"controls row",children:[Object(h.jsx)(S,{}),Object(h.jsx)(E,{})]})]})},E=n(91),T=(n(164),function(e){var t=e.messages;return Object(h.jsx)("ul",{className:"message-list",children:t.map((function(e){return Object(h.jsxs)("li",{children:[Object(h.jsxs)("div",{className:"msg",children:[e.from,":",Object(h.jsx)("br",{})," ",e.msg,Object(h.jsx)("br",{})]}),Object(h.jsx)("br",{})]})}))})});n(165);function J(){console.log("scroll");var e=document.getElementById("msg-list");console.log(e),e.scrollTo(0,e.scrollHeight-e.clientHeight)}var P=function(e){var t=Object(o.useState)([]),n=Object(v.a)(t,2),s=(n[0],n[1],Object(o.useState)([])),a=Object(v.a)(s,2),c=a[0],r=a[1],l=Object(o.useState)(""),u=Object(v.a)(l,2),m=u[0],j=u[1],d=e.dispName,b=e.roomID;Object(o.useEffect)((function(){J(),f(),N.on("msg-sent",(function(){console.log("new-messages"),f()})),J()}),[]);var f=function(){var e={roomID:b};console.log("getmsgs"),i.a.post("/getMsg",e).then((function(e){r(e.data.msg_list)})),J()};return Object(h.jsxs)("div",{className:"chat-pane col",children:[Object(h.jsx)("div",{className:"prev-chats",id:"msg-list",children:Object(h.jsx)(T,{messages:c})}),Object(h.jsx)("div",{className:"chat-input",children:Object(h.jsx)("input",Object(E.a)({type:"text",name:"chat-input",id:"chat-input",onKeyPress:function(e){if("Enter"===e.key&&(f(),N.emit("new-msg",b),m.length>0)){var t={msg:m,from:d,roomID:b};console.log({reqData:t}),i.a.post("/sendMsg",t).then((function(e){})),N.emit("new-msg",b),j(""),document.getElementById("chat-input").value=""}"1"==e.key&&(f(),N.emit("new-msg",b))},onChange:function(e){j(e.target.value)}},"id","chat-input"))})]})},q=(n(20),function(e){var t=sessionStorage.getItem("dispName"),n=e.match.params.roomID;return Object(h.jsxs)("div",{className:"main-pane row",children:[Object(h.jsx)(S,{roomID:n,dispName:t}),Object(h.jsx)("div",{className:"right-pane col",children:Object(h.jsx)(P,{dispName:t,roomID:n})})]})});i.a.defaults.baseURL="https://teams-clone-backend-server.herokuapp.com/";var B=function(){return Object(h.jsxs)(l.a,{children:[Object(h.jsx)(u.a,{exact:!0,path:"/",component:p}),Object(h.jsx)(u.a,{exact:!0,path:"/:roomID",component:q})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,192)).then((function(t){var n=t.getCLS,o=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),o(e),s(e),a(e),c(e)}))};c.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(B,{})}),document.getElementById("root")),F()}},[[174,1,2]]]);
//# sourceMappingURL=main.d91fda87.chunk.js.map