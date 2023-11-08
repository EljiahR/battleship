(()=>{"use strict";const e={0:"A",1:"B",2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I",9:"J"};function t(e,t){return Math.floor(Math.random()*(t-e)+e)}function r(r,s){return{name:r,isComputer:s,board:{grid:[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)],ships:[],placeShip(e,t,r){if(!(t[0]!==r[0]&&t[1]!==r[1]||Math.abs(t[0]-r[0])+1!==e&&Math.abs(t[1]-r[1])+1!==e)){const s={length:e,hits:0,hit(){this.hits+=1},getLength(){return this.length},getHits(){return this.hits},isSunk(){return this.length===this.hits}};let i=[];if(t[1]===r[1]){let e=t[0],a=r[0];e>a&&([e,a]=[a,e]);for(let r=e;r<=a;r++)this.grid[r][t[1]]=s,i.push([r,t[1]])}else{let e=t[1],a=r[1];e>a&&([e,a]=[a,e]);for(let r=e;r<=a;r++)this.grid[t[0]][r]=s,i.push([t[0],r])}this.ships.push({ship:s,cells:i})}},getInfo(e){return this.grid[e[0]][e[1]]},recieveAttack(e){return void 0===this.grid[e[0]][e[1]]?(this.grid[e[0]][e[1]]="miss","Miss!"):"miss"===this.grid[e[0]][e[1]]?void 0:(this.grid[e[0]][e[1]].hit(),"Hit!")},allShipsSunk(){return 0===this.ships.filter((e=>!e.isSunk())).length}},fire(r,s=[t(0,10),t(0,10)]){for(;"miss"===r.board.getInfo(s);)s=[t(0,10),t(0,10)];return"Hit!"===r.board.recieveAttack(s)?`Hit at ${e[s[1]]}${s[0]+1}!`:`Miss at ${e[s[1]]}${s[0]+1}!`}}}const s=document.getElementById("root"),i=document.createElement("div");i.id="player-grid",i.classList.add("game-grid");const a=document.createElement("div");a.id="opponent-grid",a.classList.add("game-grid");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let r=document.createElement("div");r.dataset.key=`[${e},${t}]`,r.classList.add("player"),r.classList.add("cell"),i.appendChild(r);let s=document.createElement("div");s.dataset.key=`[${e},${t}]`,s.classList.add("opponent"),s.classList.add("cell"),a.appendChild(s)}s.appendChild(i),s.appendChild(a),function(){const e=r("document.getElementById('player-name').innerText",!1),t=r("Computer",!0);e.board.placeShip(3,[0,0],[0,2]),t.board.placeShip(4,[5,6],[8,6]),e.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.player[data-key="[${e}]"]`).classList.add("ship")}))})),t.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.opponent[data-key="[${e}]"]`).classList.add("ship")}))}))}()})();