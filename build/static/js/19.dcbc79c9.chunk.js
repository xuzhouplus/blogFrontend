(this.webpackJsonpblog=this.webpackJsonpblog||[]).push([[19],{100:function(e,t,n){},101:function(e,t,n){},218:function(e,t,n){"use strict";n.r(t);var a=n(10),i=n(11),r=n(13),o=n(12),s=n(0),l=n.n(s),u=n(208),c=n(99),m=n(67),v=n.n(m),d=(n(100),function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).state={interval:null,carousel:[{src:"/images/Carousel/jianmenguan.jpg",name:"\u5251\u95e8\u5173",position:"\u5251\u95e8\u5173",location:"\u5251\u9601"},{src:"/images/Carousel/bipenggou.jpg",name:"\u6bd5\u68da\u6c9f",position:"\u6bd5\u68da\u6c9f",location:"\u7406\u53bf"},{src:"/images/Carousel/huashan.jpg",name:"\u534e\u5c71",position:"\u534e\u5c71",location:"\u534e\u9634"},{src:"/images/Carousel/langzhonggucheng.jpg",name:"\u9606\u4e2d\u53e4\u57ce",position:"\u9606\u4e2d\u53e4\u57ce",location:"\u9606\u4e2d"},{src:"/images/Carousel/dujiangyan.jpg",name:"\u90fd\u6c5f\u5830",position:"\u90fd\u6c5f\u5830",location:"\u6210\u90fd"},{src:"/images/Carousel/uestc.jpg",name:"\u7535\u5b50\u79d1\u6280\u5927\u5b66",position:"\u7535\u5b50\u79d1\u6280\u5927\u5b66",location:"\u6210\u90fd"},{src:"/images/Carousel/emeishan.jpg",name:"\u5ce8\u7709\u5c71",position:"\u5ce8\u7709\u5c71",location:"\u5ce8\u7709\u5c71"},{src:"/images/Carousel/yiheyuan.jpg",name:"\u9890\u548c\u56ed",position:"\u9890\u548c\u56ed",location:"\u5317\u4eac"}]},i}return Object(i.a)(n,[{key:"renderCarousel",value:function(){var e=this,t=function(t){var n=null,a=[],i=t.images,r=i[0],o=t.container,s="";s=s+'<div class="slider-inner"><div id="slider-content"><h2><div id="slide-title">'+r.position+'</div></h2><div id="slide-status">'+r.location+"</div></div></div>",s+='<div id="pagination"></div>',o.innerHTML=s;var l=o.querySelector("#pagination"),m=o.querySelector("#slide-title"),v=o.querySelector("#slide-status"),d=o.clientWidth,p=o.clientHeight,g=new c.i({antialias:!1});g.setPixelRatio(window.devicePixelRatio),g.setClearColor(2303786,1),g.setSize(d,p,!1),o.appendChild(g.domElement);var f=new c.h;f.crossOrigin="anonymous",i.forEach((function(e,t){(n=f.load(e.src)).magFilter=n.minFilter=c.b,n.anisotropy=g.capabilities.getMaxAnisotropy(),a.push(n);var i=document.createElement("button");i.setAttribute("data-slide",t.toString()),i.setAttribute("data-name",e.name),l.appendChild(i)})),l.firstChild.className="active";var y=new c.f;y.background=new c.a(2303786);var h=new c.d(d/-2,d/2,p/2,p/-2,1,1e3);h.position.z=1;var x=new c.g({uniforms:{dispFactor:{type:"f",value:0},currentImage:{type:"t",value:a[0]},nextImage:{type:"t",value:a[1]}},vertexShader:"varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",fragmentShader:"varying vec2 vUv;uniform sampler2D currentImage;uniform sampler2D nextImage;uniform float dispFactor;void main() {vec2 uv = vUv;vec4 _currentImage;vec4 _nextImage;float intensity = 0.3;vec4 orig1 = texture2D(currentImage, uv);vec4 orig2 = texture2D(nextImage, uv);_currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));_nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);gl_FragColor = finalTexture;}",transparent:!0,opacity:1}),b=new c.e(o.offsetWidth,o.offsetHeight,1),I=new c.c(b,x);I.position.set(0,0,0),y.add(I);var C=!1,j=function(e){if(w=e,!C){C=!0,l.querySelector(".active").className="",l.querySelectorAll("button")[w].className="active",x.uniforms.nextImage.value=a[e],x.uniforms.nextImage.needsUpdate=!0,u.a.to(x.uniforms.dispFactor,1,{value:1,ease:"Expo.easeInOut",onComplete:function(){x.uniforms.currentImage.value=a[e],x.uniforms.currentImage.needsUpdate=!0,x.uniforms.dispFactor.value=0,C=!1}});var t=i[e].position,n=i[e].location;u.a.fromTo(m,.5,{autoAlpha:1,filter:"blur(0px)",y:0},{autoAlpha:0,filter:"blur(10px)",y:20,ease:"Expo.easeIn",onComplete:function(){m.innerHTML=t,u.a.to(m,.5,{autoAlpha:1,filter:"blur(0px)",y:0})}}),u.a.fromTo(v,.5,{autoAlpha:1,filter:"blur(0px)",y:0},{autoAlpha:0,filter:"blur(10px)",y:20,ease:"Expo.easeIn",onComplete:function(){v.innerHTML=n,u.a.to(v,.5,{autoAlpha:1,filter:"blur(0px)",y:0,delay:.1})}})}},w=0,A=function(){var t=e.state.interval;t&&clearInterval(t);var n=setInterval((function(){var e=Array.from(l.querySelectorAll("button"));w++,w=parseInt(w%e.length),j(w)}),5e3);e.setState({interval:n})};Array.from(l.querySelectorAll("button")).forEach((function(e){e.addEventListener("click",(function(){var e=parseInt(this.dataset.slide,10);j(e),A()}))})),window.addEventListener("resize",(function(e){g.setSize(d,p)}));!function e(){requestAnimationFrame(e),g.render(y,h)}(),A()},n=document.getElementById("slider"),a=n.querySelectorAll("img");v()(a,(function(){new t({container:n,images:e.state.carousel})}))}},{key:"componentDidMount",value:function(){this.renderCarousel()}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.interval)}},{key:"render",value:function(){return l.a.createElement("div",{className:"section row carousel",id:"slider"},l.a.createElement("div",{id:"image-list"}))}}]),n}(l.a.Component)),p=(n(101),function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return l.a.createElement("div",{className:"home-content"},l.a.createElement(d,null))}}]),n}(l.a.Component));t.default=p}}]);
//# sourceMappingURL=19.dcbc79c9.chunk.js.map