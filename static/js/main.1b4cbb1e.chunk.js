(this.webpackJsonpairchannelclient=this.webpackJsonpairchannelclient||[]).push([[0],{204:function(e,t,n){},211:function(e,t,n){},231:function(e,t,n){},233:function(e,t,n){},234:function(e,t,n){},278:function(e,t,n){},281:function(e,t,n){},292:function(e,t,n){},303:function(e,t,n){},304:function(e,t,n){},308:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(28),s=n.n(r),c=(n(231),n(46)),o=n(4),l=n.n(o),u=n(7),d=n(9),h=n(10),f=n(12),p=n(11),m=(n(233),n(13)),b=n(27),j=n(45),v=n(333),_=(n(234),n(24)),x=n.n(_),g=n(212),O=n(50),w=n.n(O);x.a.defaults.xsrfHeaderName="X-CSRFToken",x.a.defaults.xsrfCookieName="csrftoken";var k="localhost"===window.location.hostname,N=k?"http://127.0.0.1:8000/transmit/":"https://airchannel-py.herokuapp.com/transmit/",y={headers:{Authorization:"".concat(k?"local":"6ca12987d9feb7e0f8b523fdeb0c27_ce"),"Content-Type":"multipart/form-data;boundary=boundary",Accept:"application/json;text/plain"}},S=x.a.create({baseURL:N});w()(S,{retries:3});var C={upload_detail:function(e){return S.get("upload/".concat(e),y)},download_delete_detail:function(e){return S.delete("remove/".concat(e),y)},create_major:function(e){return S.post("major/",e,y)},is_major_detail:function(e){return S.get("major/".concat(e),y)},download_stream:function(e,t,n){return g.a.download(e,t,n)},is_mail_detail:function(e){return S.get("mailvali/".concat(e),y)},create_ping:function(){return S.get("ping/",y)},create_file:function(e){return S.post("file/",e,y)},multi_part_create:function(e){return S.post("multipartcreate/",e,y)},remove_file_detail:function(e,t){return S.delete("removefile/".concat(e,"/").concat(t),y)},filed:function(e,t){return S.get("file/".concat(e,"-").concat(t),y)},multi_part_persigned:function(e){return S.post("multipartpersigned/",e,y)},multi_part_complete:function(e){return S.post("multipartcomplete/",e,y)}},D=n(26),z={highBlue:"#5ba3c7",grey:"#f0f0f0",pink:"#e8c8c8",green:"#a3c49f",orange:"#ebd7b7",white:"#ffffff",black:"#212121",accentColor:"#62bce3",olive:"#c4d184",lila:"#9397d9",red:"#d993a0",pastellgreen:"#98b8a7",yellow:"#f0df48",grey_blue:"#505a66",background1:"#505a66",background2:"#404954",background3:"#606b78",background_white:"rgba(187, 187, 187, 0.886)"},L=n(1),I=function(e){e.bgcolor;var t,n=e.counter,a=(t={height:"6vh",width:"100%",backgroundColor:"rgba(255, 255, 255, 0.512)",borderRadius:"0vh",overflow:"hidden"},Object(D.a)(t,"borderRadius","2px"),Object(D.a)(t,"marginRight","2em"),Object(D.a)(t,"marginLeft","2em"),t),i={display:"flex",justifyContent:"flex-end",alignItems:"center",height:"100%",width:"".concat(n,"%"),backgroundColor:z.black},r={color:"black",height:"6vh",width:"5em",border:"1px solid rgba(151, 151, 151, 0.812)",textShadow:"1px 1px ".concat(z.grey),fontSize:"150%",fontWeight:"bold",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"30px",backgroundColor:"rgba(255, 255, 255, 0.512)",borderRadius:"2px"};return Object(L.jsxs)("div",{style:{height:"100%",width:"94%",display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(L.jsx)("div",{style:r,children:"".concat(Math.floor(n)," %")}),Object(L.jsx)("div",{style:a,children:Object(L.jsx)("div",{style:i})})]})},U=(n(204),n(17)),B=n(213),E=n.n(B),T=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t=this.props.item,n=this.props.load;return Object(L.jsxs)("div",{className:"download_item_frame",children:[Object(L.jsx)("div",{className:"item_icon_div",children:Object(L.jsx)("div",{className:"item_icon",children:n?Object(L.jsx)(E.a,{color:z.black,loading:!0,size:26}):Object(L.jsx)(U.d,{size:30})})}),Object(L.jsx)("div",{className:"item_name_div",children:Object(L.jsx)("div",{className:"item_name",children:t.origin_name})}),Object(L.jsx)("div",{className:"item_remove_div",children:Object(L.jsx)("button",{className:"item_remove",onClick:function(){return e.props.removeItem(t)},children:Object(L.jsx)(U.g,{size:18})})})]})}}]),n}(i.a.Component);function A(e){return Object(L.jsx)("div",{children:Object(L.jsx)("div",{className:"list_item",children:e.value})})}var M=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).create_list=function(){var e=[];return a.props.items.forEach((function(t){e.push(Object(L.jsx)(T,{item:t,removeItem:function(e){return a.props.removeItem(e)},load:a.props.load===t.file_guid}))})),e.map((function(t){return Object(L.jsx)(A,{value:t},e.indexOf(t))}))},a.state={},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e){this.props.items.length,e.items.length}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"File_list_frame",children:this.create_list()})}}]),n}(i.a.Component),P=(n(278),n(214)),V=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).showView=function(){return a.props.isLink?Object(L.jsxs)("div",{className:"div_link",children:[Object(L.jsx)("div",{className:"link_text",children:" hier ist der link zum kopieren"}),Object(L.jsx)("a",{className:"link_copy","data-for":"custom-event","data-tip":"link wurde kopiert","data-event":"click focus",onClick:function(){navigator.clipboard.writeText(a.props.link)},children:a.props.link}),Object(L.jsx)(P.a,{id:"custom-event",place:"right",effect:"solid",globalEventOff:"click",afterShow:function(){navigator.clipboard.writeText(a.props.link)}}),Object(L.jsx)("div",{className:"link_text_2",children:"dein Download bleibt 12 Stunden lang gespeichert"}),Object(L.jsx)("div",{className:"link_text_2",children:"alle Daten werden nach ablauf unwiederuflich gel\xf6scht"})]}):Object(L.jsxs)("div",{className:"div_link",children:[Object(L.jsx)("div",{className:"link_text",children:"der Downloadlink wurde erfolgreich an "}),Object(L.jsxs)("div",{className:"email_text",children:[a.props.mailConfirm," "]}),Object(L.jsx)("div",{className:"link_text",children:"gesendet. "}),Object(L.jsx)("div",{className:"link_text_2",children:"dein Download bleibt 12 Stunden lang gespeichert"}),Object(L.jsx)("div",{className:"link_text_2",children:"alle Daten werden nach ablauf unwiederuflich gel\xf6scht"})]})},a.state={place:"top",type:"dark",effect:"float",condition:!1},a}return Object(h.a)(n,[{key:"changePlace",value:function(e){this.setState({place:e})}},{key:"changeType",value:function(e){this.setState({type:e})}},{key:"changeEffect",value:function(e){this.setState({effect:e})}},{key:"_onClick",value:function(){this.setState({condition:!0})}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"view_finish",children:this.showView()})}}]),n}(i.a.Component),W=(n(281),n(332)),F=n(331),R=n(336),J=n(329),H=n(334),K=n(335),q=n(40),G=n.n(q),X=function(e,t,n,a,i){return G.a.fire({background:"rgba(187, 187, 187, 0.886)",title:e,text:t,icon:"warning",showCancelButton:n,cancelButtonColor:z.red,confirmButtonColor:z.highBlue,confirmButtonText:a,cancelButtonText:i}).then((function(e){return!!e.isConfirmed||e.dismiss!==G.a.DismissReason.cancel&&void 0}))},Q=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Abbruch?","sind Sie Sicher, das Sie den Upload abbrechen m\xf6chten !",!0,"Ja, abbrechen","Nein, weiter hochladen",e.next=7,X("Abbruch?","sind Sie Sicher, das Sie den Upload abbrechen m\xf6chten !",true,"Ja, abbrechen","Nein, weiter hochladen");case 7:if(!e.sent){e.next=10;break}return e.abrupt("return",!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Neuer Upload?","sind Sie Sicher, Sie haben keine m\xf6glichkeit mehr an den Downloadlink zu kommen!",!0,"Ja, ich habe den link kopiert","Nein, ich kopiere mir den link nochmal",e.next=7,X("Neuer Upload?","sind Sie Sicher, Sie haben keine m\xf6glichkeit mehr an den Downloadlink zu kommen!",true,"Ja, ich habe den link kopiert","Nein, ich kopiere mir den link nochmal");case 7:if(!e.sent){e.next=10;break}return e.abrupt("return",!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,a,i,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="E-mail exestiert nicht",a=!1,i="Ok",e.t0=t,e.next="mailuser"===e.t0?6:"mailto"===e.t0?11:"empty"===e.t0?16:22;break;case 6:return r="bitte \xfcberpr\xfcfen deine    Absender    Adresse",e.next=9,X(n,r,a,i,null);case 9:return s=e.sent,e.abrupt("return",s);case 11:return r="bitte \xfcberpr\xfcfen deine   Empf\xe4nger   Adresse",e.next=14,X(n,r,a,i,null);case 14:return s=e.sent,e.abrupt("return",s);case 16:return r="Pflichtfelder sind nicht ausgef\xfcllt !","keine Eingabe",e.next=20,X("keine Eingabe",r,a,i,null);case 20:return s=e.sent,e.abrupt("return",s);case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=n(70),ee=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).reset_state=function(){a.setState({useUserMail:!1,useLink:!0,useMail:!1,useDownload:!0})},a.handleInput=function(e){var t=e.target;a.setState(Object(D.a)({},t.name,t.value))},a.handleMail=function(){var e=!a.state.useLink;a.setState({useLink:e})},a.handleDownload=function(){var e=!a.state.useDownload;a.setState({useDownload:e})},a.radioSwitchMail=function(){var e=a.state.useLink?"link":"mail";return Object(L.jsxs)("div",{className:"send_view_change_zone_div",children:[Object(L.jsx)("div",{className:"send_view_radio_div",children:Object(L.jsxs)(H.a,{children:[Object(L.jsx)(K.a,{className:"send_view_formlabel",children:"\xdcbermittlungsart"}),Object(L.jsxs)(R.a,{value:e,onChange:a.handleMail,children:[Object(L.jsx)(J.a,{value:"link",control:Object(L.jsx)(W.a,{color:"default"}),label:"Link"}),Object(L.jsx)(J.a,{value:"mail",control:Object(L.jsx)(W.a,{color:"default"}),label:"Link per mail"})]})]})}),a.useLinkOrMail()]})},a.useLinkOrMail=function(){return a.state.useLink?Object(L.jsx)("div",{className:"send_view_show_options",children:Object(L.jsx)("div",{className:"send_view_div",children:Object(L.jsx)("div",{className:"send_view_div_linktext",children:"Erhalte einen Link nach dem Upload"})})}):Object(L.jsxs)("div",{className:"send_view_show_options",children:[Object(L.jsxs)("div",{className:"send_view_div_input",children:["E-mail des Absenders:",Object(L.jsx)("input",{className:"send_view_input",type:"email",name:"mail_user",value:a.state.mail_user,onChange:a.handleInput})]}),Object(L.jsxs)("div",{className:"send_view_div_input",children:["E-mail des Empf\xe4nger:",Object(L.jsx)("input",{className:"send_view_input",type:"email",name:"mail_to",value:a.state.mail_to,onChange:a.handleInput})]})]})},a.radioSwitchDownload=function(){return Object(L.jsxs)("div",{className:"send_view_change_zone_div",children:[Object(L.jsx)("div",{className:"send_view_radio_div",children:Object(L.jsxs)(H.a,{children:[Object(L.jsx)(K.a,{className:"send_view_formlabel",children:"Download"}),Object(L.jsx)(J.a,{control:Object(L.jsx)(F.a,{size:"medium",color:"primary",checked:a.state.useDownload,onChange:a.handleDownload}),label:"einmaliger Download"})]})}),a.downloadOptionText()]})},a.downloadOptionText=function(){return a.state.useDownload?Object(L.jsx)("div",{className:"sendview_info_text",children:" Nach dem ersten Dowload werden alle Daten der \xdcbertragung gel\xf6scht und es ist kein weiter Download mehr m\xf6glich! "}):Object(L.jsx)("div",{className:"sendview_info_text",children:" Nach dem Upload werden alle deine Daten, 12 Std lang in einer Cloud gespeichert und k\xf6nnen abgerufen werden!  "})},a.send_info=Object(u.a)(l.a.mark((function e(){var t,n,i,r,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state,n=t.mail_to,i=t.mail_user,r=t.message,s=t.useDownload,c=t.useLink){e.next=26;break}if(i&&n){e.next=8;break}return e.next=5,Z("empty");case 5:if(!e.sent){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,C.is_mail_detail(i).then((function(e){return e.data.isSuccess}));case 10:if(e.sent){e.next=17;break}return e.next=14,Z("mailuser");case 14:if(!e.sent){e.next=17;break}return e.abrupt("return");case 17:return e.next=19,C.is_mail_detail(n).then((function(e){return e.data.isSuccess}));case 19:if(e.sent){e.next=26;break}return e.next=23,Z("mailto");case 23:if(!e.sent){e.next=26;break}return e.abrupt("return");case 26:a.props.infos({mail_user:i,mail_to:n,message:r,useDownload:s,useLink:c});case 27:case"end":return e.stop()}}),e)}))),a.state={useLink:!0,useDownload:!1,message:"",mail_user:"",mail_to:"",send_option:"link",visible:!0},a.wrapper=i.a.createRef(),a}return Object(h.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.open!==e.open&&this.reset_state()}},{key:"hide",value:function(){this.setState({visible:!1})}},{key:"render",value:function(){var e=this;return Object(L.jsx)("div",{className:this.props.mobile?"send_view_dialog_mobile":"send_view_dialog",children:Object(L.jsxs)("div",{className:this.props.mobile?"send_view_frame_mobile":"send_view_frame",children:[Object(L.jsx)("div",{className:"send_view_title_div",children:"Daten\xfcbertragung"}),Object(L.jsx)("div",{className:"send_view_change_zone",children:this.radioSwitchDownload()}),Object(L.jsx)("div",{className:"send_view_change_zone",children:this.radioSwitchMail()}),Object(L.jsx)("div",{className:"send_view_div",children:Object(L.jsx)("textarea",{className:"send_view_message",placeholder:"...schreibe eine Nachricht an den Empf\xe4nger ? ",rows:6,type:"text",name:"message",value:this.state.message,onChange:this.handleInput})}),Object(L.jsxs)("div",{className:"send_view_btn_div",children:[Object(L.jsx)("button",{className:"send_btn",onClick:function(){return e.props.close()},children:"abbruch"}),Object(L.jsx)("button",{className:"send_btn",style:{color:$.a.blue},onClick:function(){return e.send_info()},children:"senden"})]})]})})}}]),n}(i.a.Component);n(292);var te=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).uploadCancel=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Q&&a.props.loopBreak();case 2:case"end":return e.stop()}}),e)}))),a.state={},a}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return Object(L.jsx)("div",{className:"progressbar_btn_div",children:Object(L.jsx)("button",{onClick:function(){return e.uploadCancel()},className:"upload_cancel",children:"STOP UPLOAD"})})}}]),n}(i.a.Component),ne=n(219);function ae(e){var t=Math.round(e/1e3);if(t>1e3){var n=Math.round(e/1e5)/10;return n>2e3?Math.round(e/1e7)/100+"  GB":n+"  MB"}return t+"  KB"}var ie=function(e){var t,n=e.mail_to,a=e.mail_user,i=e.date,r=e.use_download,s=e.use_link,c=e.files,o=0,l=Object(b.a)(c);try{for(l.s();!(t=l.n()).done;){o+=t.value.file_size}}catch(j){l.e(j)}finally{l.f()}var u="gesamt "+ae(o),d=new Date(i),h=a||"keine Angabe",f=n===[""]?n:"keine Angabe",p=r?"einmailger Download":"upload wird nach 12 Std gel\xf6scht",m=s?"upload-Link":"E-mail Benachrichtung";return Object(L.jsxs)("div",{children:[Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" Erstellt: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",d.toLocaleDateString("de-DE",{weekday:"long",year:"numeric",month:"numeric",day:"numeric",hour:"numeric"})]})]}),Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" Dateigr\xf6\xdfe: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",u]})]}),Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" Absender: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",h]})]}),Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" Empf\xe4nger: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",f]})]}),Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" Speicher Option: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",p]})]}),Object(L.jsxs)("div",{style:{fontWeight:"600",height:"1.5em"},children:[" \xdcbermittlungsart: ",Object(L.jsxs)("span",{style:{fontWeight:"300"},children:[" ",m]})]})]})},re=function(e,t,n,a,i){return G.a.fire({background:"rgba(187, 187, 187, 0.886)",title:e,html:t,icon:"info",showCancelButton:n,cancelButtonColor:z.red,confirmButtonColor:z.highBlue,confirmButtonText:a,cancelButtonText:i}).then((function(e){return!!e.isConfirmed||e.dismiss!==G.a.DismissReason.cancel&&void 0}))},se=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Upload Infos",!1,"Ok",n=Object(ne.renderToString)(ie(t)),e.next=6,re("Upload Infos",n,false,"Ok",null);case 6:if(!e.sent){e.next=9;break}return e.abrupt("return");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ce=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"FUCK !",!1,"Ok",n=t,e.next=6,re("FUCK !",n,false,"Ok",null);case 6:if(!e.sent){e.next=9;break}return e.abrupt("return");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),oe=n(220),le=n.n(oe),ue={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",border:"1px solid ".concat(z.black),borderRadius:"2px",background:"rgba(236, 236, 236, 0.668)"},overlay:{background:"rgba(64, 64, 64, 0.668)"}},de=548576,he=x.a.CancelToken.source(),fe=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).resetUpload=function(){a.setState({showProgress:!1,process:0,upload_success:!1})},a.timeout=function(e){return new Promise((function(t){return setTimeout(t,e)}))},a.cancelUpload=function(){a.state.fileLoopBreak&&(console.log("this.cancelUpload"),he.cancel("post canceled."),a.setState(a.baseState))},a.uploadIsCancel=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.file_guid,e.next=3,C.remove_file_detail(t,i).then((function(e){e.data.isSuccess&&(a.removeItem(n),a.setState({majorId:t}),console.log("file gel\xf6scht............!"),a.resetUpload())}));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),a.newConnect=function(){var e=Object(u.a)(l.a.mark((function e(t,n,i,r){var s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=!0;case 1:if(!s){e.next=22;break}return console.log("wiederhole verbindung"),e.prev=3,e.next=6,C.create_ping();case 6:if(!(c=e.sent)){e.next=13;break}return console.log(c.data.is),console.log("**** CONNECT *****"),s=!1,e.next=13,a.counterOfFile(t,n,i,r);case 13:e.next=20;break;case 15:return e.prev=15,e.t0=e.catch(3),a.state.showProgress||(s=!1),e.next=20,a.timeout(3e3);case 20:e.next=1;break;case 22:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(t,n,a,i){return e.apply(this,arguments)}}(),a.newUpload=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:e.sent&&a.setState({upload_success:!1,use_link:null,use_email:null});case 4:case"end":return e.stop()}}),e)}))),a.progressAction=function(e,t,n){a.cancelUpload();var i=e.loaded/1e4/(e.total/1e4)*100;console.log("chunk ",t,": ",Math.floor(e.loaded/1e5)," => ",Math.floor(e.total/1e5));var r=Array.from(a.state.loaded.values()).reduce((function(e,t){return e+t}),0);a.state.loaded.set(t,i),a.setState({progress:r/n})},a.getFileContext=function(e){var t=[],n=Array.from(e.target.files),i=0,r=a.state.full_size;n.forEach((function(e){var n=e,a=Math.ceil(e.size/de),s=Object(v.a)(),c={chunk_count:a,file_size:n.size,origin_name:n.name,file_guid:s,file_data:n,chunks:[]};i+=a,r+=n.size,t.push(c)})),a.setState({files:[].concat(Object(j.a)(a.state.files),t),full_count:a.state.full_count+i,full_size:r})},a.send=function(e){var t=a.state.files;a.setState({openSendView:!1,showProgress:!0,infos:e},(function(){a.createMajor(t,e)}))},a.createMajor=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var i,r,s,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=a.state.majorId){e.next=11;break}return(r=new FormData).append("mail_to",n.mail_to),r.append("mail_user",n.mail_user),r.append("message",n.message),r.append("use_download",n.useDownload),r.append("use_link",n.useLink),e.next=10,C.create_major(r).then((function(e){if(e.data.isSuccess)return e.data.id;if(e.data.clean){console.log("hier");ce("du hast gerade die gesamten Daten von Airchannel gel\xf6scht !"),a.resetUpload()}return!1}));case 10:i=e.sent;case 11:if(!i){e.next=33;break}s=Object(b.a)(t),e.prev=13,s.s();case 15:if((c=s.n()).done){e.next=23;break}return o=c.value,a.cancelUpload(),a.setState({upload_begin:o.file_guid}),e.next=21,a.upload_dispatcher(a.create_chunks(o),i);case 21:e.next=15;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(13),s.e(e.t0);case 28:return e.prev=28,s.f(),e.finish(28);case 31:console.log("all finish"),a.uploadCompleted(i);case 33:case"end":return e.stop()}}),e,null,[[13,25,28,31]])})));return function(t,n){return e.apply(this,arguments)}}(),a.create_chunks=function(e){for(var t=0,n=1;n<=e.chunk_count;n++){var a=e.file_data.slice(t,de+t);e.chunks.push(a),t+=a.size}return e},a.upload_dispatcher=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var i,r,s,c,o,u,d,h,f,p,m,v,_,x,g;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),i=[],r=[],s=Object(j.a)((l=1,O=t.chunk_count,Array.from({length:O-l+1},(function(e,t){return t})))),console.log(s),d=170,c=0,o=s.length;case 7:if(!(c<o)){e.next=24;break}u=s.slice(c,c+d),a.cancelUpload(),h=Object(b.a)(u);try{for(h.s();!(f=h.n()).done;)p=f.value,m=parseInt(p)+1,a.cancelUpload(),i.push(a.createFile(t,n,m,t.chunks[p].size))}catch(w){h.e(w)}finally{h.f()}return e.next=14,Promise.all(i);case 14:v=e.sent,i.length=0,_=Object(b.a)(v);try{for(_.s();!(x=_.n()).done;)g=x.value,a.cancelUpload(),r.push(a.uploadFileToS3(g,t.chunks,parseInt(g.bucket),t.file_guid,n))}catch(w){_.e(w)}finally{_.f()}return e.next=20,Promise.all(r);case 20:r.length=0;case 21:c+=d,e.next=7;break;case 24:console.log("finish"),a.removeItem(t);case 26:case"end":return e.stop()}var l,O}),e)})));return function(t,n){return e.apply(this,arguments)}}(),a.createFile=function(){var e=Object(u.a)(l.a.mark((function e(t,n,a,i){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(r=new FormData).append("id",n),r.append("chunks",a),r.append("filename",t.file_guid),r.append("file_size",t.file_size),r.append("chunk_size",i),r.append("origin_name",t.origin_name),r.append("extension",t.file_data.name.split(".").slice(-1)[0]),e.next=11,C.create_file(r).then((function(e){return e.data.s3}));case 11:return e.abrupt("return",e.sent);case 14:e.prev=14,e.t0=e.catch(0),console.log("error",e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n,a,i){return e.apply(this,arguments)}}(),a.uploadFileToS3=function(){var e=Object(u.a)(l.a.mark((function e(t,n,i,r,s){var c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new FormData,Object.keys(t.fields).forEach((function(e){c.append(e,t.fields[e])})),console.log(i-1),c.append("file",n[i-1]),o={onUploadProgress:function(e){return a.progressAction(e,i,n.length)},headers:{"Content-Type":"multipart/form-data"},cancelToken:he.token},w()(x.a,{retries:8,retryCondition:function(e){return!0}}),e.next=8,x.a.post(t.url,c,o).then((function(e){console.log(" res ",i," : ",e)})).catch((function(e){x.a.isCancel(e)&&(console.log(e.message),c.delete("file"))}));case 8:case"end":return e.stop()}}),e)})));return function(t,n,a,i,r){return e.apply(this,arguments)}}(),a.fileSetStorage=function(e,t){C.filed(e,t).then((function(e){console.log(t," =>  ",e.data.isSuccess)}))},a.uploadCompleted=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,i,r,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.state.fileLoopBreak){e.next=3;break}return a.setState({fileLoopBreak:!1}),e.abrupt("return");case 3:return e.next=5,C.upload_detail(t);case 5:n=e.sent,(i=n.data).isSuccess?(i.link&&(r=i.link,"undefined"!==typeof window&&(s=window.location.protocol+"//"+window.location.host+"/"+r,a.setState({upload_success:!0,link:s,isLink:!0}))),i.email&&(c=i.email,console.log("show download email",c),a.setState({upload_success:!0,mailConfirm:c,isLink:!1})),a.resetUpload(),a.setState({upload_success:!0})):i.list&&(console.log("... es wurde nicht alles gespeichert !!!!"),console.log(i.list));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.removeItem=function(e){var t=a.state.full_size;t-=e.file_size;var n=a.state.files.filter((function(t){if(t.file_guid!=e.file_guid)return t}));a.setState({files:n,full_size:t,progress:0})},a.readyToSend=function(){return Object(L.jsx)("div",{className:"ready_to_send_div",children:Object(L.jsx)("button",{className:"start_upload_btn",hidden:a.state.openSendView,onClick:function(){return a.setState({openSendView:!0})},children:"senden"})})},a.bottomView=function(e){var t=a.state,n=t.full_size,i=t.upload_success,r="gesamt "+ae(n);if(i)return Object(L.jsxs)("div",{className:"div_input_upload",onClick:function(){return a.newUpload()},children:[Object(L.jsx)("label",{className:"label_input_upload",children:Object(L.jsx)(U.c,{size:50,color:z.black})}),Object(L.jsx)("div",{className:"text_input_upload",children:"hinzuf\xfcgen von Dateien"})]});var s=e.length>0?r:"hinzuf\xfcgen von Dateien";return Object(L.jsxs)("div",{className:"div_input_upload",children:[Object(L.jsxs)("label",{className:"label_input_upload",children:[Object(L.jsx)("input",{className:"input_upload",type:"file",multiple:!0,onChange:a.getFileContext}),Object(L.jsx)(U.c,{size:50,color:z.black})]}),Object(L.jsx)("div",{className:"text_input_upload_size",children:s}),e.length>0?a.readyToSend():null,Object(L.jsx)("div",{className:"rodal_div",children:Object(L.jsx)(le.a,{style:ue,isOpen:a.state.openSendView,onRequestClose:function(){return a.setState({openSendView:!1})},ariaHideApp:!1,children:Object(L.jsx)(ee,{open:a.state.openSendView,close:function(){return a.setState({openSendView:!1})},infos:function(e){return a.send(e)},mobile:a.props.mobile,newOpen:function(){return a.setState({openSendView:!0})}})})})]})},a.state={files:[],infos:{},showProgress:!1,full_count:0,full_size:0,progress:0,openSendView:!1,mailConfirm:"",upload_success:!1,visible:!1,link:"",isLink:null,fileLoopBreak:!1,majorId:null,loaded:new Map,upload_begin:""},a.baseState=a.state,a}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.showProgress,a=t.files,i=t.progress,r=t.upload_begin,s=t.link,c=t.upload_success,o=t.mailConfirm,l=t.isLink;return Object(L.jsxs)("div",{className:"frame_input_upload",children:[n?Object(L.jsx)("div",{children:n?Object(L.jsxs)("div",{className:"progressbar_view",children:[Object(L.jsx)(I,{counter:i,bgcolor:z.accentColor}),Object(L.jsx)("div",{className:"cancel_place",children:Object(L.jsx)(te,{loopBreak:function(){return e.setState({fileLoopBreak:!0})}})})]}):null}):this.bottomView(a),a.length>0?Object(L.jsx)("div",{className:"upload_list",children:Object(L.jsx)(M,{items:a,load:r,removeItem:function(t){return e.removeItem(t)}})}):null,c?Object(L.jsx)("div",{className:"upload_finish",children:Object(L.jsx)(V,{link:s,mailConfirm:o,isLink:l})}):null]})}}]),n}(i.a.Component),pe=(n(303),n(211),function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={filename:""},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props.item;return Object(L.jsxs)("div",{className:"download_item_frame",children:[Object(L.jsx)("div",{className:"download_item_icon_div",children:Object(L.jsx)("div",{className:"download_item_icon",children:Object(L.jsx)(U.d,{size:30})})}),Object(L.jsx)("div",{className:"download_item_name_div",children:Object(L.jsx)("div",{className:"download_item_name",children:e.origin_name})})]})}}]),n}(i.a.Component));function me(e){return Object(L.jsx)("div",{children:Object(L.jsx)("div",{className:"list_item",children:e.value})})}var be=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).create_list=function(){var e=[];return a.props.items.forEach((function(t){e.push(Object(L.jsx)(pe,{item:t}))})),e.map((function(t){return Object(L.jsx)(me,{value:t},e.indexOf(t))}))},a.state={},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e){this.props.items.length!==e.items.length&&console.log("items length \xe4nderung")}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"File_list_frame",children:this.create_list()})}}]),n}(i.a.Component),je=(n(304),function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={backcolor:"transparent"},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"download_mess_frame",children:this.props.message})}}]),n}(i.a.Component)),ve=n(221),_e=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).progressAction=function(e,t){var n=a.state,i=n.loaded,r=n.total;e.loaded===e.total&&a.setState({loaded:i+e.loaded,total:r+e.total}),console.log(i+e.loaded,"  /  ",t);var s=(i+e.loaded)/t*100;a.setState({progress:s})},a.infoView=Object(u.a)(l.a.mark((function e(){var t,n,i,r,s,c,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state.majorInfo,n=t.mail_to,i=t.mail_user,r=t.date,s=t.use_download,c=t.use_link,o=a.state.files,u={mail_to:n,mail_user:i,date:r,use_download:s,use_link:c,files:o},e.next=5,se(u);case 5:if(!e.sent){e.next=8;break}return e.abrupt("return");case 8:case"end":return e.stop()}}),e)}))),a.checkLink=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.is_major_detail(t).then((function(e){if(e.data.isSuccess){var t=e.data;a.setState({isContent:!0,files:t.fileList,message:t.message,majorInfo:t.majorInfo})}}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.deleteBucket=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state.link,e.next=3,C.download_delete_detail(t).then((function(e){e&&a.setState({showProgress:!1})}));case 3:case"end":return e.stop()}}),e)}))),a.file_loop=Object(u.a)(l.a.mark((function e(){var t,n,i,r,s,c,o,u,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=a.state.files,n=Object(b.a)(t),e.prev=2,n.s();case 4:if((i=n.n()).done){e.next=29;break}r=i.value,s=r.count,c=0,o=[],u=1;case 10:if(!(u<=s)){e.next=22;break}if(u%100!=0&&u!=s){e.next=19;break}return console.log(c," : ",u),e.t0=o,e.next=16,a.downloadFiles(r,c,u);case 16:e.t1=e.sent,e.t0.push.call(e.t0,e.t1),c+=100;case 19:u++,e.next=10;break;case 22:return e.next=24,Promise.all(o);case 24:d=e.sent,Object(ve.saveAs)(new Blob(Object(j.a)(d),{type:"application/octet-stream"}),r.origin_name),a.removeItem(r);case 27:e.next=4;break;case 29:e.next=34;break;case 31:e.prev=31,e.t2=e.catch(2),n.e(e.t2);case 34:return e.prev=34,n.f(),e.finish(34);case 37:a.setState({showProgress:!1});case 38:case"end":return e.stop()}}),e,null,[[2,31,34,37]])}))),a.downloadFiles=function(){var e=Object(u.a)(l.a.mark((function e(t,n,i){var r,s,c,o,u,d,h;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="/".concat(n,"/").concat(i),s="localhost"==window.location.hostname,c=s?"http://127.0.0.1:8000/transmit/":"https://airchannel-py.herokuapp.com/transmit/",o=s?"local":"6ca12987d9feb7e0f8b523fdeb0c27_ce",u=t.filename,d=t.file_size,a.setState({showProgress:!0}),h={responseType:"arraybuffer",onDownloadProgress:function(e){a.progressAction(e,d)},url:c+"download/"+u+r,method:"get",headers:{Authorization:"".concat(o)}},e.next=9,x()(h).then((function(e){return e.data})).catch((function(e){console.log(e.message)}));case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),a.removeItem=function(e){var t=a.state.files.filter((function(t){if(t.filename!=e.filename)return t;console.log("gefunden !!!!")}));a.setState({files:t})},a.messageView=function(){var e=a.state.message;return Object(L.jsx)("div",{children:e.length>0?Object(L.jsxs)("div",{className:"download_message_view",children:[Object(L.jsx)("div",{className:"download_message_text",children:" Eine Nachricht f\xfcr dich "}),Object(L.jsx)(je,{message:e})]}):null})},a.infoBtnView=function(){return Object(L.jsx)("div",{className:"download_info_btn_div",onClick:function(){return a.infoView()},children:Object(L.jsx)(U.e,{size:30,color:z.black})})},a.changeDownloadView=function(){var e=100===a.state.counter;return Object(L.jsx)("div",{children:e?Object(L.jsxs)("div",{className:"div_input_upload",children:[Object(L.jsx)("div",{className:"download_icon_div",children:Object(L.jsx)(U.b,{size:35,color:z.black})}),Object(L.jsx)("div",{className:"text_input_upload",children:"download complete"})]}):Object(L.jsxs)("div",{className:"div_input_upload",children:[Object(L.jsx)("div",{className:"download_icon_div",onClick:function(){return a.file_loop()},children:Object(L.jsx)(U.a,{size:35,color:z.black})}),Object(L.jsx)("div",{className:"text_input_upload",children:"starte den download"}),a.infoBtnView()]})})},a.state={progress:0,loaded:0,total:0,showProgress:!1,files:[],majorInfo:{},message:"",isContent:!1,link:a.props.match.params.id,complete:!1,openInfoView:!1},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){console.log(" DOWNLOAD VIEW ");var e=this.props.match.params.id;this.checkLink(e)}},{key:"render",value:function(){var e=this.state,t=e.isContent,n=e.showProgress,a=e.progress,i=e.files;return t?Object(L.jsxs)("div",{className:"frame_input_upload",children:[n?Object(L.jsx)("div",{children:n?Object(L.jsx)("div",{className:"progressbar_view_download",children:Object(L.jsx)(I,{counter:a,bgcolor:z.accentColor})}):null}):this.changeDownloadView(),i.length>0?Object(L.jsxs)("div",{className:"download_list_view",children:[this.messageView(),Object(L.jsx)(be,{items:i})]}):null]}):Object(L.jsx)("div",{className:"frame_input_upload",children:Object(L.jsx)("div",{className:"div_input_upload",children:Object(L.jsx)("div",{className:"text_input_upload_NO_CONTENT",children:"NO CONTENT"})})})}}]),n}(i.a.Component),xe=n.p+"static/media/AIR_1024px.e442824d.png",ge=n(222);function Oe(){var e=window.screen.width,t=window.screen.height,n=Object(ge.useImage)({srcList:"https://picsum.photos/".concat(e,"/").concat(t,"?random=1")}).src;return Object(L.jsx)("img",{src:n})}function we(){return Object(L.jsx)(a.Suspense,{fallback:Object(L.jsx)("div",{style:{height:"100%",width:"100%",background:"black"}}),children:Object(L.jsx)(Oe,{})})}var ke=Object(L.jsx)("div",{className:"open_beta",children:"open beta"}),Ne=function(e){Object(f.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).createPing=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.create_ping().then((function(e){"pong"===e.data.is&&a.setState({backend:!0})}));case 2:case"end":return e.stop()}}),e)}))),a.routing=function(){return Object(L.jsxs)(m.c,{children:[Object(L.jsx)(m.a,{exact:!0,path:"/",render:function(e){return Object(L.jsx)(fe,Object(c.a)(Object(c.a)({},e),{},{mobile:a.state.mobile,backend:a.state.backend}))}}),Object(L.jsx)(m.a,{path:"/:id",render:function(e){return Object(L.jsx)(_e,Object(c.a)(Object(c.a)({},e),{},{mobile:a.state.mobile,backend:a.state.backend}))}})]})},a.state={mobile:!1,height:"",backend:!1},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.createPing(),window.addEventListener("resize",this.updateWindowDimensions()),this.setState({height:window.innerHeight+"px"})}},{key:"updateWindowDimensions",value:function(){var e=window.innerWidth<=600;document.documentElement.style.setProperty("--vh","".concat(window.innerHeight/100,"px")),this.setState({mobile:e})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"render",value:function(){return Object(L.jsxs)("div",{className:"app_window",style:{height:this.state.height},children:[Object(L.jsxs)("div",{className:"head_view",children:[Object(L.jsxs)("div",{className:"title",children:[Object(L.jsx)("img",{className:"air_icon",src:xe,alt:"Logo"})," AIR channel",ke]}),Object(L.jsx)("div",{className:"menu",children:Object(L.jsxs)("div",{className:"menu_icon",children:[Object(L.jsx)(U.f,{size:30,color:z.white})," "]})})]}),Object(L.jsx)("div",{className:"unkown_view",children:Object(L.jsx)(we,{})}),Object(L.jsx)("div",{className:"actions_view",children:this.routing()})]})}}]),n}(i.a.Component),ye=n(69);s.a.render(Object(L.jsx)(i.a.StrictMode,{children:Object(L.jsx)(ye.a,{children:Object(L.jsx)(Ne,{})})}),document.getElementById("root"))}},[[308,1,2]]]);
//# sourceMappingURL=main.1b4cbb1e.chunk.js.map