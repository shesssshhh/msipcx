const PASSWORD = "25022006";

const dots = document.getElementById("dots");
const wrongText = document.getElementById("wrongText");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const typedText = document.getElementById("typedText");
const falling = document.getElementById("falling");

let input = "";
let page = 0;
let typedStarted = false;

const message = `On your special day, I just want to remind you how grateful I am to have you in my life. Thank you for being the amazing person you are, kind, loving, and always making my days feel warmer. I hope this little website makes you smile, even if cuma dikit. Happy birthday, my favorite person.`;

// ================= PASSWORD DOT =================
function drawDots(){
  dots.innerHTML = "";
  for(let i=0;i<PASSWORD.length;i++){
    const dot = document.createElement("span");
    dot.className = "dot" + (i < input.length ? " filled" : "");
    dots.appendChild(dot);
  }
}

// ================= INPUT NUMBER =================
document.querySelectorAll("[data-num]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(input.length >= PASSWORD.length) return;
    input += btn.dataset.num;
    drawDots();

    if(input.length === PASSWORD.length){
      if(input === PASSWORD){
        showSlide(0);
      }else{
        wrongText.textContent = "salah, masa tanggalnya lupa 😭";
        setTimeout(()=>{
          input="";
          drawDots();
          wrongText.textContent="";
        },700);
      }
    }
  });
});

document.getElementById("delBtn").addEventListener("click",()=>{
  input = input.slice(0,-1);
  drawDots();
});

// ================= SLIDE SYSTEM =================
function showSlide(n){
  const screens = document.querySelectorAll(".screen");

  if(n < 0 || n >= screens.length) return;

  page = n;

  screens.forEach(s=>s.classList.remove("active"));
  screens[page].classList.add("active");

  if(page === 5) startLetter();
}

// NEXT
document.querySelectorAll(".next").forEach(btn=>{
  btn.addEventListener("click",()=>{
    showSlide(page + 1);
  });
});

// BACK (INI YANG BENER, BUKAN BALIK KE AWAL)
document.querySelectorAll(".back").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(page > 0){
      showSlide(page - 1);
    }
  });
});

// ================= MUSIC =================
musicBtn.addEventListener("click", async()=>{
  try{
    if(bgMusic.paused){
      await bgMusic.play();
      musicBtn.textContent = "♫";
    }else{
      bgMusic.pause();
      musicBtn.textContent = "▶";
    }
  }catch(e){
    alert("Taruh file music.mp3 dulu.");
  }
});

// ================= LETTER =================
function startLetter(){
  if(typedStarted) return;
  typedStarted = true;

  let i = 0;
  const timer = setInterval(()=>{
    typedText.textContent = message.slice(0,i++);
    if(i > message.length) clearInterval(timer);
  },45);

  setInterval(makeHeart,250);
}

// ================= HEART EFFECT =================
function makeHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > .45 ? "💙" : "💫";
  h.style.left = Math.random()*100 + "vw";
  h.style.animationDuration = (3 + Math.random()*3) + "s";
  h.style.fontSize = (24 + Math.random()*22) + "px";

  falling.appendChild(h);
  setTimeout(()=>h.remove(),6500);
}

// INIT
drawDots();
