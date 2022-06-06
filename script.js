const imgMario =  document.querySelector(".marioCorrendo")
const tubo= document.querySelector(".tubo")
const contador = document.querySelector(".contador")
const historico= document.querySelector(".historico")
const nuvem1= document.querySelector(".nuvem1")
const nuvem2= document.querySelector(".nuvem2") 
const gameOver = document.querySelector(".gameOver")
const comecaGame = document.querySelector(".comecaGame")
const telaInicial = document.querySelector("#telaInicial")

var timer;
const time = function() {
    timer =  setInterval(() => {
    const ingrementarContador = +contador.textContent.slice(2) + 1
    contador.textContent =  `HI ${ingrementarContador}`
    }, 100)
}
const jumpPC = function(event) {
    if(event.code === "Space" || event.code === "ArrowUp"){
        setTimeout(()=>{
            imgMario.classList.remove("jump") 
        },500)
            imgMario.classList.add("jump")  
    }
}
const jumpCelular =  function(){
   
    setTimeout(()=>{
        imgMario.classList.remove("jump")
    },500)
    imgMario.classList.add("jump")

}
var loop;
const verificarLoop = function(){
    loop = setInterval(()=>{
        const tuboPosition = tubo.offsetLeft
        const nuvem1Position = nuvem1.offsetLeft
        const nuvem2Position = nuvem2.offsetLeft
        const marioPosition = +window.getComputedStyle(imgMario).bottom.replace("px","") 
        
        if (tuboPosition<=95 && tuboPosition>0&& marioPosition<50 ){
            stopTubo(tubo,tuboPosition)
            stopMario(imgMario,marioPosition)
            stopNuvens(nuvem1,nuvem2,nuvem1Position,nuvem2Position)
            reinicia = true
            stopInterval()
            gameEnd() 
        }
    },10)
    
}
const stopInterval = function(){
    clearInterval(loop)
    clearInterval(timer)
}
let comecarGame = true
let reinicia = false
const StartGame = function(){
    if(comecarGame){
        stopInterval()
        // telaInicial.classList.remove("comecaGame")
        telaInicial.style.display = "none";
        nuvem1.classList.add("nuvem1Movendo");
        nuvem2.classList.add("nuvem2Movendo");
        tubo.classList.add("tuboMovendo");
        imgMario.style.display = "block";
        historico.style.display = "block";
        tubo.style.display  = "block";
        nuvem1.style.display  = "block";
        nuvem2.style.display  = "block";
        verificarLoop()
        time()
        comecarGame = false
        
    }
}

const reiniciarGame =  function(){
    if(reinicia){
        tubo.removeAttribute("style")
        imgMario.removeAttribute("style")
        nuvem1.removeAttribute("style")
        nuvem2.removeAttribute("style")
        gameOver.style.display = "none"
        contador.textContent = "HI 0"
        imgMario.src="img/marioCorrendo.mp4"
        imgMario.classList.add("marioCorrendo")
        comecarGame = true
        reinicia = false
        StartGame()
    }
}
const stopMario = function(imgMario,marioPosition){  
    imgMario.style.bottom = `${marioPosition}px`
    imgMario.src="img/marioMorrendo.png"
    imgMario.style.marginLeft=  "30px";   
    imgMario.style.width=  "60px";
}
const stopTubo = function(tubo,tuboPosition){
    tubo.classList.remove("tuboMovendo")  
    tubo.style.left = `${tuboPosition}px`
}
const stopNuvens = function(nuvem1,nuvem2,nuvem1Position,nuvem2Position){
    nuvem1.classList.remove("nuvem1Movendo")
    nuvem1.style.left = `${nuvem1Position}px`
    nuvem2.classList.remove("nuvem2Movendo") 
    nuvem2.style.left = `${nuvem2Position}px`
}
const gameEnd = function(){
    gameOver.style.display = "block"
    // document.addEventListener("keydown", reiniciarGame)
}
// computador 
document.addEventListener("keydown", StartGame)
document.addEventListener("keydown", jumpPC)
document.addEventListener("keydown", reiniciarGame)
//  celular 
document.addEventListener("touchstart", StartGame)
document.addEventListener("touchstart", reiniciarGame)
document.addEventListener("touchstart", jumpCelular)
