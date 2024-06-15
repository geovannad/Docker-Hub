const input = document.getElementById("test2")
const botaoAvancar = document.getElementById("botaoAvancar")
const label = document.getElementsByClassName("label")[0]

botaoAvancar.addEventListener("click",()=>{
    if(input.checked){
        window.location.href = "../docker/docker.html"
    }else{
        label.style.color = 'red'
    }

})