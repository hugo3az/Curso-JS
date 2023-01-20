
let pontos = 0;
let vidas = 3;
let numMax = 10;
let operador = '+';
let calculo;
let x = 0;
const operacoes = ["+", "-", "*", "/"];
while (vidas > 0) {
    const random = Math.floor(Math.random() * operacoes.length);
    operador = (random, operacoes[random]);
    let num1 = Math.floor(Math.abs(Math.random() * (numMax)));
    let num2 = Math.floor(Math.abs(Math.random() * (numMax)));

   // let valorDigitado = prompt("quanto é " + num1 + ' ' + operador + ' ' + " X " + " = " + calcular());
    function calcular() {
        switch (operador) {
            case '+':
                x = num1 + num2;
            /*case '-':
                return num1 - num2;
            case '/':
                return num1 / num2;
            case '*':
                return num1 * num2;*/    
        }
    }
    let valorDigitado = prompt("quanto é " + num1 + ' ' + operador + ' ' + " X " + " = " + calcular());
    if (valorDigitado == calcular()) {
        pontos = pontos + 5;
        if (pontos % 20 == 0) {
            numMax = numMax + 10;
        }
        alert("correto.");
    }
    else {
        alert("Resporta correta " + calcular() + ". " + "voce ainda tem " + vidas + " vidas.");
        vidas = vidas - 1;
    }
}
alert("Voce fez " + pontos + " pontos.");