
document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu"), nav=document.querySelector(".nav-links");
 if(menu) menu.addEventListener("click",()=>nav.classList.toggle("open"));
 const input=document.querySelector("#toolSearch");
 if(input){
   input.addEventListener("input",()=>{
     const q=input.value.toLowerCase().trim();
     document.querySelectorAll(".tool-card").forEach(card=>{
       card.style.display=card.innerText.toLowerCase().includes(q)?"block":"none";
     });
   });
 }
 document.addEventListener("keydown",e=>{
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();input?.focus();}
 });
});
