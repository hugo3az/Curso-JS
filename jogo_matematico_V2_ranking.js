/*
    1 - a cada 50 pontos o usuario recupera 1 vida
    2 - checar se o nome do usuario foi digitado
    3 - fazer perguntaa de forma aleatoria
            ex: Qual o valor de X em: 4 + X = 8
                Qual o valor de X em: X + 5 = 10
                Qual o valor de X em: 2 + 2 = X
                
    adicionar ranking no jogo matematico
    sempre que tiver um gameover perguntar o nome do usuario novamente
*/

//declaração de variaves globais

//var prompt = require('prompt-sync')();

let maxPontos = 0;
let valorDigitado = 0;
let pontos = 0;
let vidas = 3;
let numMax = 10;
let operador = '+';
const operacoes = ["+", "-", "*", "/"];
const local = [0, 1, 2];
let resultado = 0;
let ranking = [];
let texto = "";

//informar quantidade de vida inicial o usuario tem.
console.log("voce tem " + vidas + " vidas restantes, a cada erro perdera 1 vida.")
iniciaJogo();

function iniciaJogo() {
    //verifica se nome foi informado, se não pede pra inserir
    let nome = prompt("INFORME SEU NOME: ");
    while (nome == "") {
        console.log("CAMPO NOME NÃO INFORMADO, FAVOR INFORMAR O SEU NOME.");
        nome = prompt("INFORME SEU NOME: ");
    }
    //inicia jogo
    while (vidas > 0) {
        const random = Math.floor(Math.random() * operacoes.length);
        operador = (random, operacoes[random]);
        let num1 = Math.floor(Math.abs(Math.random() * (numMax - 0)));
        let num2 = Math.floor(Math.abs(Math.random() * (numMax - 0)));
        const posicao = Math.floor(Math.random() * local.length);
        function calcular() {
            switch (operador) {
                case '+':
                    resultado = num1 + num2;
                    return resultado;
                case '-':
                    if (num2 > num1) {
                        let troca = num1;
                        num1 = num2;
                        num2 = troca;
                    }
                    resultado = num1 - num2;
                    return resultado;
                case '/':
                    while (num1 % num2 != 0) {
                        num1 = Math.floor(Math.abs(Math.random() * (numMax)));
                        num2 = Math.floor(Math.abs(Math.random() * (numMax)));
                    }
                    resultado = num1 / num2;
                    return resultado;
                case '*':
                    resultado = num1 * num2;
                    return resultado;
            }
        }
        //função para mudar posição de X
        function retornaPergunta() {
            switch (posicao) {
                case 0:
                    valorDigitado = prompt("quanto é x na equação: X" + operador + num2 + '=' + calcular());
                    return;
                case 1:
                    valorDigitado = prompt("quanto é x na equação: " + num1 + operador + "X" + '=' + calcular());
                    return;
                case 2:
                    valorDigitado = prompt("quanto é x na equação: " + num1 + operador + num2 + '= X');
                    return;
            }
        }

        retornaPergunta();

        if (valorDigitado == calcular()) {
            pontos = pontos + 25;
            if (pontos % 20 == 0) {
                numMax = numMax + 10;
            }
        }
        else {
            vidas = vidas - 1;
            if (vidas == 0) {
                console.log("FIM DE JOGO, " + nome + " VOCE PERDEU TODAS AS VIDAS.");
                break;
            }
            console.log("Resporta correta " + calcular() + ". " + "\nvoce ainda tem " + vidas + " vidas.");
        }

        //A cada 50 pontos o usuario recupera 1 vida
        if (pontos == 50) {
            vidas = vidas + 1;
            maxPontos = maxPontos + pontos;
            pontos = 0;
            console.log("voce fez 50 pontos e ganhou +1 vida\nTOTAL DE VIDAS: " + vidas);
        }
    }

    let joga = prompt("Você fez: " + maxPontos + " Pontos \n" + " Digite um 1 para jogar novamente");
    //vetor para armazenar dados dos jogadores

    ranking.push([nome, maxPontos]);
    for (let i = 0; i < ranking.length; i++) {
        nome = ranking[i][0];
    }
    alert(ranking);


    if (joga == 1) {
        vidas = 3;
        pontos = 0;
        numMax = 10;
        iniciaJogo();
    } else {
        console.log("Obrigado por perder seu tempo");
    }
}

console.log("Voce fez " + maxPontos + " pontos.");
console.log(ranking);
