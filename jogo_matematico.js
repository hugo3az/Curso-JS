//gerar numeros aleatorios convertendo para interiro
//let num1 = console.log(parseInt(Math.random() * (100 - 0))) + 0;
//let num2 = console.log(parseInt(Math.random() * (100 - 0))) + 0;

// 1. Adicionar 5 pontos sempre que a pergunta for correta
// 2. Mostrar quantos pontos ele fez no final
// 3. Se o valor for correto não precisa mostrar que o valor está correto so
// .  precisa fazer uma nova pergunta

//adicionar operações de subtração, divisão e multiplicação
// as operações devem ser aleatorias

let pontos = 0;
let vidas = 3;
let numMax = 10;
let operador = '+';
let calculo;
const operacoes = ["+", "-", "*", "/"];
while (vidas > 0) {
    const random = Math.floor(Math.random() * operacoes.length);
    operador = (random, operacoes[random]);
    let num1 = Math.floor(Math.abs(Math.random() * (numMax)));
    let num2 = Math.floor(Math.abs(Math.random() * (numMax)));

    let valorDigitado = prompt("quanto é " + num1 + ' ' + operador + ' ' + num2 + "?");
    function calcular() {
        switch (operador) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '/':
                return num1 / num2;
            case '*':
                return num1 * num2;
        }
    }

    if (valorDigitado == calcular()) {
        pontos = pontos + 5;
        if (pontos % 20 == 0) {
            numMax = numMax + 10;
        }
        alert("correto.");
    }
    else {
        alert("Resporta correta" + calcular() + ". " + "voce ainda tem " + vidas + " vidas.");
        vidas = vidas - 1;
    }
}
alert("Voce fez " + pontos + " pontos.");