const ordemCorretaDosComandos = ['pull', 'run', 'push', 'stop', 'rm', 'rmi'];
const comandos = document.querySelectorAll('.comandos code');

const resultadosComando = document.getElementById('comando');
const resultadosHost = document.getElementById('host');
const resultadosHub = document.getElementById('hub');

const imgInicial = document.createElement('img');
imgInicial.src = '../../Assets/imagem-ubuntu-hub.png';
imgInicial.classList.add('imagem');
resultadosHub.appendChild(imgInicial);

let proximoComando = 0;

const imagensComandos = {
    pull: { src: '../../Assets/imagem-ubuntu-hub.png', id: 'imagemUbuntu', container: resultadosHost },
    run: { src: '../../Assets/conteiner-ligado.png', id: 'conteinerLigado', container: resultadosHost },
    push: { src: '../../Assets/imagem-local.png', container: resultadosHub },
    stop: { src: '../../Assets/conteiner-parado.png', id: 'conteinerDesligado', removeId: 'conteinerLigado', container: resultadosHost },
    rm: { removeId: 'conteinerDesligado' },
    rmi: { removeId: 'imagemUbuntu' }
};

comandos.forEach(element => {
    element.addEventListener('click', () => {
        if (!element.classList.contains('correto')) {
            if (element.id === ordemCorretaDosComandos[proximoComando]) {
                proximoComando++;
                element.classList.add('correto');
                interacaoResultados(element);
            } else {
                element.classList.add('erro');
                setTimeout(() => {
                    element.classList.remove('erro');
                }, 500);
            }
        }
    });
});

function interacaoResultados(element) {
    const comando = imagensComandos[element.id];

    if (comando) {
        if (comando.removeId) {
            document.getElementById(comando.removeId)?.remove();
        }
        if (comando.src) {
            const img = document.createElement('img');
            img.src = comando.src;
            img.classList.add('imagem');
            if (comando.id) img.id = comando.id;
            comando.container.appendChild(img);
        }

        const p = document.createElement('p');
        p.textContent = element.textContent;
        resultadosComando.appendChild(p);
    }
}
