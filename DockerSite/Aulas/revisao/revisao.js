const ordemCorretaDosComandos = ['pull', 'run', 'push', 'stop', 'rm', 'rmi'];

const comandos = document.querySelectorAll('.comandos code');

const resultadosComando = document.getElementById('comando')
const resultadosHost = document.getElementById('host')
const resultadosHub = document.getElementById('hub')

const img = document.createElement('img')
img.src = '../../Assets/imagem-ubuntu-hub.png'
img.classList.add('imagem')
resultadosHub.appendChild(img)

let proximoComando = 0;

comandos.forEach(element => {
    element.addEventListener('click', () => {

        if(!(element.classList.contains('correto'))){
            if(element.id == ordemCorretaDosComandos[proximoComando]){
                proximoComando++;
                element.classList.add('correto')
                interacaoResultados(element)

            } else {
                element.classList.add('erro');
                setTimeout(() => {
                    element.classList.remove('erro');
                }, 500);
            }
        } 
    });
});


function interacaoResultados(element){
    const img = document.createElement('img')
    img.classList.add('imagem')

    if(element.id == 'pull'){
        img.src = '../../Assets/imagem-ubuntu-hub.png'
        img.id = 'imagemUbuntu'

        resultadosHost.appendChild(img)

    }else if(element.id == 'run'){
        img.src = '../../Assets/conteiner-ligado.png'
        img.id = 'conteinerLigado'

        resultadosHost.appendChild(img)

    }else if(element.id == 'push'){
        img.src = '../../Assets/imagem-local.png'

        resultadosHub.appendChild(img)

    }else if(element.id == 'stop'){
        img.src = '../../Assets/conteiner-parado.png'
        img.id = 'conteinerDesligado'

        document.getElementById('conteinerLigado').remove()

        resultadosHost.appendChild(img)

    }else if(element.id == 'rm'){
        document.getElementById('conteinerDesligado').remove()

    }else if(element.id == 'rmi'){
        document.getElementById('imagemUbuntu').remove()

    }

    const p = document.createElement('p')

    p.textContent = element.textContent
    resultadosComando.appendChild(p)
}