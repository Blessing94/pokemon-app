(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{7894:(e,t,a)=>{Promise.resolve().then(a.bind(a,9809))},9809:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p});var n=a(5155),s=a(2115),o=a(8334),i=a.n(o),l=a(5565);let p=()=>{let[e,t]=(0,s.useState)([]),[a,o]=(0,s.useState)([]),[p,c]=(0,s.useState)([]),[r,h]=(0,s.useState)(0),[d,m]=(0,s.useState)(1);(0,s.useEffect)(()=>{(async()=>{let e=await fetch("https://pokeapi.co/api/v2/type");o((await e.json()).results.map(e=>e.name))})(),u()},[]);let u=(0,s.useCallback)(async()=>{let e=await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000"),t=await e.json();h(t.results.length),c(await Promise.all(t.results.slice((d-1)*24,24*d).map(async e=>(await fetch("https://pokeapi.co/api/v2/pokemon/".concat(e.name))).json())))},[d]);(0,s.useEffect)(()=>{e.length>0?k():u()},[e,d]);let k=(0,s.useCallback)(async()=>{try{let t=(await Promise.all(e.map(e=>fetch("https://pokeapi.co/api/v2/type/".concat(e)).then(e=>e.json())))).reduce((e,t,a)=>{let n=new Set(t.pokemon.map(e=>e.pokemon.name));return 0===a?n:new Set([...e].filter(e=>n.has(e)))},new Set),a=await Promise.all(Array.from(t).slice((d-1)*24,24*d).map(async e=>{let t=await fetch("https://pokeapi.co/api/v2/pokemon/".concat(e));return await t.json()}));c(a),h(t.size)}catch(e){console.error("Error fetching Pok\xe9mon:",e)}},[e,d]);(0,s.useEffect)(()=>{e.length>0?k():u()},[k,u]);let _=e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),m(1)};return(0,n.jsxs)("div",{className:i().pageContainer,children:[(0,n.jsx)("h1",{children:"All Pok\xe9mon Types"}),(0,n.jsxs)("h3",{children:["Total Pok\xe9mon: ",r]}),(0,n.jsx)("div",{className:i().typeButtons,children:a.map(t=>(0,n.jsx)("button",{onClick:()=>_(t),className:"".concat(i().typeButton," ").concat(e.includes(t)?i().selectedType:""),children:t},t))}),(0,n.jsx)("h2",{children:"Pok\xe9mon"}),(0,n.jsx)("div",{className:i().pokemonGrid,children:0===p.length?(0,n.jsx)("p",{children:"No Pok\xe9mon to display for the Selected type!"}):p.map(e=>(0,n.jsxs)("div",{className:i().pokemonCard,children:[(0,n.jsx)("h3",{children:e.name}),(0,n.jsx)(l.default,{src:e.sprites.front_default,alt:e.name,width:96,height:96}),(0,n.jsxs)("p",{children:["Number ",e.id]})]},e.id))}),(0,n.jsxs)("div",{className:i().pagination,children:[(0,n.jsx)("button",{onClick:()=>{m(e=>Math.max(e-1,1))},disabled:1===d,children:"Previous"}),(0,n.jsx)("button",{onClick:()=>{m(e=>e+1)},disabled:p.length<24||r<=24*d,children:"Next"})]})]})}},8334:e=>{e.exports={pageContainer:"page_pageContainer___Ajkl",typeButtons:"page_typeButtons__M1iZ0",typeButton:"page_typeButton__zB4uJ",selectedType:"page_selectedType__bC7Hq",pokemonGrid:"page_pokemonGrid__Vhgmo",pokemonCard:"page_pokemonCard__NRtwe",pagination:"page_pagination__8VB5K"}}},e=>{var t=t=>e(e.s=t);e.O(0,[397,565,441,517,358],()=>t(7894)),_N_E=e.O()}]);