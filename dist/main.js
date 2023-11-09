(()=>{"use strict";const e={0:"A",1:"B",2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I",9:"J"};function t(e,t){return Math.floor(Math.random()*(t-e)+e)}function s(s,i){return{name:s,isComputer:i,board:{grid:[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)],ships:[],placeShip(e,t,s){if(!(t[0]!==s[0]&&t[1]!==s[1]||Math.abs(t[0]-s[0])+1!==e&&Math.abs(t[1]-s[1])+1!==e)){const i={length:e,hits:0,hit(){this.hits+=1},getLength(){return this.length},getHits(){return this.hits},isSunk(){return this.length===this.hits}};let a=[];if(t[1]===s[1]){let e=t[0],r=s[0];e>r&&([e,r]=[r,e]);for(let s=e;s<=r;s++)this.grid[s][t[1]]=i,a.push([s,t[1]])}else{let e=t[1],r=s[1];e>r&&([e,r]=[r,e]);for(let s=e;s<=r;s++)this.grid[t[0]][s]=i,a.push([t[0],s])}this.ships.push({ship:i,cells:a})}},getInfo(e){return this.grid[e[0]][e[1]]},recieveAttack(e){return void 0===this.grid[e[0]][e[1]]?(this.grid[e[0]][e[1]]="miss","Miss!"):"miss"===this.grid[e[0]][e[1]]?void 0:(this.grid[e[0]][e[1]].hit(),this.grid[e[0]][e[1]]="hit","Hit!")},allShipsSunk(){return 0===this.ships.filter((e=>!e.ship.isSunk())).length}},fire(s,i=[t(0,10),t(0,10)]){let a=Number(i[0]),r=Number(i[1]);for(;"miss"===s.board.getInfo([a,r])||"hit"==s.board.getInfo([a,r]);)a=t(0,10),r=t(0,10);return"Hit!"===s.board.recieveAttack([a,r])?{message:`Hit at ${e[a]}${r+1}!`,coordinates:[a,r]}:{message:`Miss at ${e[a]}${r+1}!`,coordinates:[a,r]}}}}const i=document.getElementById("player-y-and-grid"),a=document.getElementById("opponent-y-and-grid"),r=document.createElement("div");r.id="player-grid",r.classList.add("game-grid");const n=document.createElement("div");n.id="opponent-grid",n.classList.add("game-grid");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let s=document.createElement("div");s.dataset.x=e,s.dataset.y=t,s.classList.add("player"),s.classList.add("cell"),r.appendChild(s);let i=document.createElement("div");i.dataset.x=e,i.dataset.y=t,i.classList.add("opponent"),i.classList.add("cell"),n.appendChild(i)}i.appendChild(r),a.appendChild(n),function(e="Player",t="Computer",i=!0){const a=s(e,!1),r=s(t,i);document.getElementById("player-name").innerText=e+"'s Board",document.getElementById("opponent-name").innerText=t+"'s Board",n.classList.add("hidden"),a.board.placeShip(3,[0,0],[0,2]),r.board.placeShip(4,[5,6],[8,6]),a.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.player[data-x="${e[0]}"][data-y="${e[1]}"]`).classList.add("ship")}))})),r.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.opponent[data-x="${e[0]}"][data-y="${e[1]}"]`).classList.add("ship")}))}));const d=function(s){let i=a.fire(r,[s.target.dataset.x,s.target.dataset.y]),o=document.querySelector(`.opponent[data-x="${i.coordinates[0]}"][data-y="${i.coordinates[1]}"]`);if(console.log(i.message),i.message.includes("Miss")?(o.classList.add("miss"),o.innerText="O"):i.message.includes("Hit")&&(o.classList.add("hit"),o.innerText="X",r.board.allShipsSunk()&&(alert(`${e} Wins!`),n.removeEventListener("click",d))),r.isComputer){let e=r.fire(a),s=document.querySelector(`.player[data-x="${e.coordinates[0]}"][data-y="${e.coordinates[1]}"]`);e.message.includes("Miss")?(s.classList.add("miss"),s.innerText="O"):e.message.includes("Hit")&&(s.classList.add("hit"),s.innerText="X",a.board.allShipsSunk()&&(alert(`${t} Wins!`),n.removeEventListener("click",d)))}};n.addEventListener("click",d)}()})();