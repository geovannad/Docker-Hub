"use strict";

//array onde guardaremos as respostas selecionadas
let respostas = ['','','','','',''];
//array do gabarito
const gabarito = ['c', 'a', 'c', 'b', 'c','b'];
//variavel para verificar se o desafio foi finalizado
let finalizado = false;


//O evento DOMContentLoaded é disparado quando o documento HTML inicial foi completamente carregado e analisado. Isso é útil para garantir que o código JavaScript que manipula o DOM seja executado apenas após a estrutura do documento estar completamente carregada
document.addEventListener('DOMContentLoaded', () => {

    //seleciona todos os elementos com a classe comando que também tem a classe cod-elem
    const comandos = document.querySelectorAll('.comandos .cod-elem');

    //adiciona um evento de clique em todos os elementos selecionados anteriormente
    comandos.forEach(comando => {
        comando.addEventListener('click', (event) => {
            //verifica se o desafio foi finalizado
            if (!finalizado) {
                //id da reposta clicada
                const respostaId = event.target.id;

                //extrai a questão e a letra da resposta vindas do id
                const regex = /resposta(\d+)([a-z])/;
                const match = respostaId.match(regex);

                //verifica se a resposta clicada possui o id no padrão
                if (match) {
                    //numero da questão já corijido para o array e a letra da resposta
                    const numeroQuestao = parseInt(match[1]) - 1; 
                    const letraResposta = match[2];

                    //seleciona o elemento da resposta selecionada
                    const questaoResposta = document.querySelectorAll(`#resposta${numeroQuestao + 1} .cod-elem`);

                    //remove a classe selecionado de todos os elementos da questão respondida
                    questaoResposta.forEach(el => el.classList.remove('selecionado'));

                    //preenche o array de respostas com as respostas selecionadas
                    respostas[numeroQuestao] = letraResposta;

                    //adiciona a classe selecionado para o elemento
                    event.target.classList.add('selecionado');


                } 


            }
        });
    });

    //botão de finalizar
    const botaoFinalizar = document.getElementById('finalizar'); 

    //adiciona um evento de clique no botão
    botaoFinalizar.addEventListener('click', () => {

        //variavel para verificar se todas as questões foram respondidas
            let temVazio = false;
        //verifica se todas as questões foram respondidas
            for (let i = 0; i <respostas.length; i++) {
                if (respostas[i] == '') { 
                    temVazio = true;
                }
            }
        //alerta se alguma questão não foi respondida
            if(temVazio) {
                alert("Por favor, responda todas as questões.");
            } else {
                //finaliza o desafio
                finalizado = true;

                //verifica se o gabarito é o mesmo que as respostas
                for (let i = 0; i < respostas.length; i++) {

                    //seleciona todos os elementos da questão
                    const questaoResposta = document.querySelectorAll(`#resposta${i + 1} .cod-elem`);


                    questaoResposta.forEach(el => {
                        const regex = /resposta(\d+)([a-z])/;
                        const match = el.id.match(regex);

                        //verifica se a resposta clicada possui o id no padrão
                        if (match && match[2] === respostas[i]) {
                            //remove a classe selecionado de todos os elementos da questão respondida
                            el.classList.remove('selecionado');
                            //adiciona a classe certo ou errado
                            if (respostas[i] === gabarito[i]) {
                                el.classList.add('certo'); 
                            } else {
                                el.classList.add('errado'); 
                            }
                            //adiciona a classe certo na questão correspondente
                            const certo = document.querySelector(`#resposta${i + 1} .cod-elem#resposta${i + 1}${gabarito[i]}`);
                            certo.classList.add('certo');
                        }
                    });
                }
                    botaoFinalizar.classList.add('block');
                    const comandosB = document.querySelectorAll('.comandos .cod-elem');
                    comandosB.forEach(comandoB => {
                        comandoB.classList.remove('selecionar');
                        comandoB.classList.add('block');
                    })


        }
    });
});