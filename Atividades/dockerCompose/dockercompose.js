const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY);
    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;
  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;
    if (posY >= boxCenterY) result = refer_card;
  }
  return result;
}

function clickme() {
  const columnsAgain = document.querySelectorAll(".column");
  console.log(columnsAgain);
}

("use strict");

//array onde guardaremos as respostas selecionadas
let respostas = ["", "", "", "", ""];
//array do gabarito
const gabarito = ["b", "d", "c", "b", "b"];
//variavel para verificar se o desafio foi finalizado
let finalizado = false;

// exercicio 7 de drag
const gabaritoDrag7 = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "4",
  "15",
  "6",
  "11",
  "18",
];
let respostaDrag7 = [];

//O evento DOMContentLoaded é disparado quando o documento HTML inicial foi completamente carregado e analisado. Isso é útil para garantir que o código JavaScript que manipula o DOM seja executado apenas após a estrutura do documento estar completamente carregada
document.addEventListener("DOMContentLoaded", () => {
  //seleciona todos os elementos com a classe comando que também tem a classe cod-elem
  const comandos = document.querySelectorAll(".comandos .cod-elem");

  //adiciona um evento de clique em todos os elementos selecionados anteriormente
  comandos.forEach((comando) => {
    comando.addEventListener("click", (event) => {
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
          const questaoResposta = document.querySelectorAll(
            `#resposta${numeroQuestao + 1} .cod-elem`
          );

          //remove a classe selecionado de todos os elementos da questão respondida
          questaoResposta.forEach((el) => el.classList.remove("selecionado"));

          //preenche o array de respostas com as respostas selecionadas
          respostas[numeroQuestao] = letraResposta;

          //adiciona a classe selecionado para o elemento
          event.target.classList.add("selecionado");
        }
      }
    });
  });

  //botão de finalizar
  const botaoFinalizar = document.getElementById("finalizar");

  //adiciona um evento de clique no botão
  botaoFinalizar.addEventListener("click", () => {
    const elementoFinal = document.getElementsByClassName("final");
    const qtdChild = elementoFinal[0].children.length;

    //variavel para verificar se todas as questões foram respondidas
    let temVazio = false;
    //verifica se todas as questões foram respondidas
    for (let i = 0; i < respostas.length; i++) {
      if (respostas[i] == "") {
        temVazio = true;
      }
    }
    //alerta se alguma questão não foi respondida
    if (temVazio == true || qtdChild < 18) {
      alert("Por favor, responda todas as questões.");
    } else {
      //finaliza o desafio
      finalizado = true;

      for (let i = 0; i < qtdChild; i++) {
        respostaDrag7.push(elementoFinal[0].children[i].id);
        console.log(respostaDrag7);
      }
      //comparar resposta questão 7
      for (let i = 0; i < respostaDrag7.length; i++) {
        if (gabaritoDrag7[i] === respostaDrag7[i]) {
          elementoFinal[0].children[i].classList.add("certo");
        } else {
          elementoFinal[0].children[i].classList.add("errado");
        }
      }
      //verifica se o gabarito é o mesmo que as respostas
      for (let i = 0; i < respostas.length; i++) {
        //seleciona todos os elementos da questão
        const questaoResposta = document.querySelectorAll(
          `#resposta${i + 1} .cod-elem`
        );

        questaoResposta.forEach((el) => {
          const regex = /resposta(\d+)([a-z])/;
          const match = el.id.match(regex);

          //verifica se a resposta clicada possui o id no padrão
          if (match && match[2] === respostas[i]) {
            //remove a classe selecionado de todos os elementos da questão respondida
            el.classList.remove("selecionado");
            //adiciona a classe certo ou errado
            if (respostas[i] === gabarito[i]) {
              el.classList.add("certo");
            } else {
              el.classList.add("errado");
            }
            //adiciona a classe certo na questão correspondente
            const certo = document.querySelector(
              `#resposta${i + 1} .cod-elem#resposta${i + 1}${gabarito[i]}`
            );
            certo.classList.add("certo");
          }
        });
      }
      resultado = document.getElementsByClassName("resultado")[0];
      const img = document.createElement("img");
      img.src = "../../Assets/respostaD.jpg";
      img.draggable = false;
      img.width = 483;
      img.classList.add("imagem");
      resultado.appendChild(img);
      botaoFinalizar.classList.add("block");
      const comandosB = document.querySelectorAll(".comandos .cod-elem");
      comandosB.forEach((comandoB) => {
        comandoB.classList.remove("selecionar");
        comandoB.classList.add("block");
      });

      const comandoDrag = document.getElementsByClassName("cod");
      for (let i = 0; i < comandoDrag.length; i++) {
        comandoDrag[i].draggable = false;
      }
    }
  });
});
