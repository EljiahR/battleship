(()=>{"use strict";const e={0:"A",1:"B",2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I",9:"J"};function t(e,t){return Math.floor(Math.random()*(t-e)+e)}function a(a,s){return{name:a,isComputer:s,board:{grid:[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)],ships:[],placeShip(e,t,a){if(!(t[0]!==a[0]&&t[1]!==a[1]||Math.abs(t[0]-a[0])+1!==e&&Math.abs(t[1]-a[1])+1!==e)){const s={length:e,hits:0,hit(){this.hits+=1},getLength(){return this.length},getHits(){return this.hits},isSunk(){return this.length===this.hits}};let r=[];if(t[1]===a[1]){let e=t[0],n=a[0];e>n&&([e,n]=[n,e]);for(let a=e;a<=n;a++)this.grid[a][t[1]]=s,r.push([a,t[1]])}else{let e=t[1],n=a[1];e>n&&([e,n]=[n,e]);for(let a=e;a<=n;a++)this.grid[t[0]][a]=s,r.push([t[0],a])}this.ships.push({ship:s,cells:r})}},getInfo(e){return this.grid[e[0]][e[1]]},recieveAttack(e){return void 0===this.grid[e[0]][e[1]]?(this.grid[e[0]][e[1]]="miss","Miss!"):"miss"===this.grid[e[0]][e[1]]?void 0:(this.grid[e[0]][e[1]].hit(),this.grid[e[0]][e[1]]="hit","Hit!")},allShipsSunk(){return 0===this.ships.filter((e=>!e.ship.isSunk())).length}},fire(a,s=[t(0,10),t(0,10)]){let r=Number(s[0]),n=Number(s[1]);for(;"miss"===a.board.getInfo([r,n])||"hit"==a.board.getInfo([r,n]);)r=t(0,10),n=t(0,10);return"Hit!"===a.board.recieveAttack([r,n])?{message:`Hit at ${e[r]}${n+1}!`,coordinates:[r,n]}:{message:`Miss at ${e[r]}${n+1}!`,coordinates:[r,n]}}}}function s(e,t){return Math.floor(Math.random()*(t-e)+e)}const r=document.getElementById("player-y-and-grid"),n=document.getElementById("opponent-y-and-grid"),d=document.createElement("div");d.id="player-grid",d.classList.add("game-grid");const i=document.createElement("div");i.id="opponent-grid",i.classList.add("game-grid");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let a=document.createElement("div");a.dataset.x=e,a.dataset.y=t,a.classList.add("player"),a.classList.add("cell"),d.appendChild(a);let s=document.createElement("div");s.dataset.x=e,s.dataset.y=t,s.classList.add("opponent"),s.classList.add("cell"),i.appendChild(s)}let o,l,c,u,m;r.appendChild(d),n.appendChild(i);let p={destroyer:null,cruiser:null,submarine:null,battleship:null,carrier:null};const h=document.querySelectorAll(".new-ship");function g(e){const t=[];t.push([document.getElementById(`${e}-carrier`),4]),t.push([document.getElementById(`${e}-battleship`),3]),t.push([document.getElementById(`${e}-cruiser`),2]),t.push([document.getElementById(`${e}-submarine`),2]),t.push([document.getElementById(`${e}-destroyer`),1]);const a=[],r=[];return t.forEach((t=>{let n=!1;1==s(0,2)&&(n=!0);let d=s(0,10),i=s(0,10),o=!1;for(;!o;)if(n){let l=!1,c=[];for(let e=i;e<=i+t[1];e++)c.push([d,e]),r.forEach((t=>{t.toString()!==[d,e].toString()||(l=!0)}));if(i+t[1]<=9&&!l){a.push([[d,i],[d,i+t[1]],t[1]+1]),c.forEach((e=>{r.push(e)})),o=!0;let s=document.querySelector(`.${e}[data-x="${d}"][data-y="${i}"]`);t[0].classList.contains("r")||t[0].classList.add("r"),t[0].classList.remove("not-placed"),t[0].parentNode.removeChild(t[0]),s.appendChild(t[0])}else d=s(0,10),i=s(0,10),n=1==s(0,2)}else{let l=!1,c=[];for(let e=d;e<=d+t[1];e++)c.push([e,i]),r.forEach((t=>{t.toString()!==[e,i].toString()||(l=!0)}));if(d+t[1]<=9&&!l){a.push([[d,i],[d+t[1],i],t[1]+1]),c.forEach((e=>{r.push(e)})),o=!0;let s=document.querySelector(`.${e}[data-x="${d}"][data-y="${i}"]`);t[0].classList.contains("r")&&t[0].classList.remove("r"),t[0].classList.remove("not-placed"),t[0].parentNode.removeChild(t[0]),s.appendChild(t[0])}else d=s(0,10),i=s(0,10),n=1==s(0,2)}})),"player"===e&&(document.getElementById("player-submit-ships").disabled=!1),a}window.addEventListener("keydown",(e=>{if("r"==e.key&&u.classList.contains("new-ship"))if(u.classList.contains("r")){if(Number(u.parentNode.dataset.x)+m>10)return;u.classList.remove("r")}else{if(Number(u.parentNode.dataset.y)+m>10)return;u.classList.add("r")}})),h.forEach((e=>{e.addEventListener("dragstart",(e=>{u=e.target,m=Number(u.dataset.length),u.classList.add("dragged")}))})),d.addEventListener("dragover",(e=>{e.preventDefault()})),d.addEventListener("drop",(e=>{if(e.preventDefault(),u.classList.remove("dragged"),u.parentNode!=e.target&&e.target!=u){if(u.classList.contains("r")){if(Number(e.target.dataset.y)+m>10)return}else if(Number(e.target.dataset.x)+m>10)return;u.classList.contains("not-placed")&&u.classList.remove("not-placed"),u.classList.contains("destroyer")?p.destroyer=[Number(e.target.dataset.y),Number(e.target.dataset.x)]:u.classList.contains("cruiser")?p.cruiser=[Number(e.target.dataset.y),Number(e.target.dataset.x)]:u.classList.contains("submarine")?p.submarine=[Number(e.target.dataset.y),Number(e.target.dataset.x)]:u.classList.contains("battleship")?p.battleship=[Number(e.target.dataset.y),Number(e.target.dataset.x)]:u.classList.contains("carrier")&&(p.carrier=[Number(e.target.dataset.y),Number(e.target.dataset.x)]),p.destroyer&&p.cruiser&&p.submarine&&p.battleship&&p.carrier&&(document.getElementById("player-submit-ships").disabled=!1),u.parentNode.removeChild(u),e.target.appendChild(u)}})),document.getElementById("name-input").addEventListener("click",(function(){o=document.getElementById("player-name-input").value,l=document.getElementById("opponent-name-input").value,c=document.getElementById("computer-checkbox").checked,c&&(l="Computer"),""==o&&(o="Player"),document.getElementById("background").remove(),document.getElementById("player-name").innerText=o+"'s Board",document.getElementById("opponent-name").innerText=l+"'s Board"})),document.getElementById("player-submit-ships").addEventListener("click",(e=>{e.preventDefault(),function(e){const t=[];t.push([document.getElementById(`${e}-destroyer`),1]),t.push([document.getElementById(`${e}-cruiser`),2]),t.push([document.getElementById(`${e}-submarine`),2]),t.push([document.getElementById(`${e}-battleship`),3]),t.push([document.getElementById(`${e}-carrier`),4]);const s=[];t.forEach((e=>{e[0].classList.contains("r")?s.push([[Number(e[0].parentNode.dataset.x),Number(e[0].parentNode.dataset.y)],[Number(e[0].parentNode.dataset.x),Number(e[0].parentNode.dataset.y)+e[1]],e[1]+1]):s.push([[Number(e[0].parentNode.dataset.x),Number(e[0].parentNode.dataset.y)],[Number(e[0].parentNode.dataset.x)+e[1],Number(e[0].parentNode.dataset.y)],e[1]+1])})),c&&(document.getElementById("player-boats").remove(),document.getElementById("player-submit-ships").remove(),function(e,t,s,r,n=g("opponent")){const d=a(e,!1),o=a(t,s);r.forEach((e=>{d.board.placeShip(e[2],e[0],e[1])})),n.forEach((e=>{o.board.placeShip(e[2],e[0],e[1])})),d.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.player[data-x="${e[0]}"][data-y="${e[1]}"]`).classList.add("ship")}))})),o.board.ships.forEach((e=>{e.cells.forEach((e=>{document.querySelector(`.opponent[data-x="${e[0]}"][data-y="${e[1]}"]`).classList.add("ship")}))}));const l=function(a){let s=d.fire(o,[a.target.dataset.x,a.target.dataset.y]),r=document.querySelector(`.opponent[data-x="${s.coordinates[0]}"][data-y="${s.coordinates[1]}"]`);if(console.log(s.message),s.message.includes("Miss"))r.classList.add("miss"),r.innerText="O";else if(s.message.includes("Hit")&&(r.classList.add("hit"),r.innerText+="X",o.board.allShipsSunk()))return alert(`${e} Wins!`),void i.removeEventListener("click",l);if(o.isComputer){let e=o.fire(d),a=document.querySelector(`.player[data-x="${e.coordinates[0]}"][data-y="${e.coordinates[1]}"]`);if(e.message.includes("Miss"))a.classList.add("miss"),a.innerText="O";else if(e.message.includes("Hit")&&(a.classList.add("hit"),a.innerHTML+="X",d.board.allShipsSunk()))return alert(`${t} Wins!`),void i.removeEventListener("click",l)}};i.addEventListener("click",l)}(o,l,c,s))}("player")})),document.getElementById("player-random").addEventListener("click",(e=>{e.preventDefault(),g("player")}))})();
//# sourceMappingURL=main.js.map