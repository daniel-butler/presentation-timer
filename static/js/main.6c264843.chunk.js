(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(17)},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(8),c=n.n(r),i=(n(16),n(7),n(1)),o=n(2),l=n(4),u=n(3),d=n(5),p=n(9),m=n.n(p),h=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"displayCountDown",value:function(){return null!==this.props.remainingSeconds?this.props.formatter(this.props.remainingSeconds):"Enter Time Below"}},{key:"render",value:function(){return s.a.createElement("div",{className:"count-down-clock-wrapper"},s.a.createElement("h1",{className:"count-down-clock"},this.displayCountDown()))}}]),t}(s.a.Component),A=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"displayWarningTime",value:function(){return null!=this.props.remainingSeconds?"Warning at: "+this.props.formatter(this.props.warningSeconds):""}},{key:"handleEnterKeyUp",value:function(e){"Enter"===e.key&&this.props.clickStart()}},{key:"render",value:function(){return s.a.createElement("div",{className:"base-control"},s.a.createElement("div",{className:"count-down-input-wrapper"},s.a.createElement("p",null,"Enter Time in Minutes"),s.a.createElement("input",{id:"timeInMinutes",type:"number",className:"count-down-input",min:".1",step:".1",onKeyPress:this.props.inputMinute,onKeyUp:this.handleEnterKeyUp.bind(this)}),s.a.createElement("p",null,this.displayWarningTime())),s.a.createElement("div",{className:"count-down-control"},s.a.createElement("button",{onClick:this.props.clickStart,className:"count-down-start"},s.a.createElement("i",{className:"material-icons"},"play_arrow")),s.a.createElement("button",{onClick:this.props.clickPause,className:"count-down-pause"},s.a.createElement("i",{className:"material-icons"},"pause")),s.a.createElement("button",{onClick:this.props.clickStop,className:"count-down-stop"},s.a.createElement("i",{className:"material-icons"},"stop"))))}}]),t}(s.a.Component),g=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"count-down-display "+this.props.display},this.props.children)}}]),t}(s.a.Component),w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleMinuteInput=function(e){n.setState({timerSeconds:60*parseFloat(e.target.value)})},n.handleStart=function(){if(n.state.timerSeconds>0&&!n.state.clockIntervalId){n.setState({countDown:!0,paused:!1,warningSeconds:Math.floor(.2*n.state.timerSeconds)});var e=setInterval(n.timer,1e3);n.setState({displayClass:"count-display-green",clockIntervalId:e})}else n.state.paused&&n.setState({paused:!1,countDown:!0})},n.handleStop=function(){n.state.countDown&&(clearInterval(n.state.clockIntervalId),n.setState({countDown:!1,paused:!1,clockIntervalId:null,remainingSeconds:null,displayClass:"count-display-green"}))},n.handlePause=function(){n.setState({paused:!0})},n.timer=function(){if(n.state.countDown&&!n.state.paused){var e=0,t="";t=(e=n.state.remainingSeconds>-1e3&&null!==n.state.remainingSeconds?n.state.remainingSeconds-1:n.state.timerSeconds)>n.state.warningSeconds?"count-display-green":e>0&&e<=n.state.warningSeconds?"count-display-gold":"count-display-purple",n.setState({remainingSeconds:e,displayClass:t})}},n.formatSecondsToTimer=function(e){var t=0;t=e<-.1?Math.floor(e/60)+1:Math.floor(e/60);var n=Math.floor(e%60);return 0===t?n+"s":0===n?t+"m":t+"m "+n+"s"},n.state={displayClass:"count-display-green",countDown:!1,paused:!1,timerSeconds:null,remainingSeconds:null,warningSeconds:null,clockIntervalId:null},n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"app"},s.a.createElement(g,{display:this.state.displayClass},s.a.createElement(h,{remainingSeconds:this.state.remainingSeconds,formatter:this.formatSecondsToTimer}),s.a.createElement("div",{className:"logo-wrapper"},s.a.createElement("img",{className:"logo",src:m.a,alt:"The CORE Group"})),s.a.createElement(A,{inputMinute:this.handleMinuteInput,remainingSeconds:this.state.remainingSeconds,warningSeconds:this.state.warningSeconds,formatter:this.formatSecondsToTimer,clickStart:this.handleStart,clickStop:this.handleStop,clickPause:this.handlePause})))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t,n){},9:function(e,t){e.exports="data:image/png;base64,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"}},[[10,1,2]]]);
//# sourceMappingURL=main.6c264843.chunk.js.map