// listar todos os numeros menores de 100 que são multiplos de 3 ou 5

for(let i = 0; i < 100; i++){
    if(i % 3 == 0 || i % 5 == 0){
        console.log(i + " é divisivel por 3 e 5");
    }
}

for(let i = 0; i < 100; i++){
    if(i % 3 == 0 || i % 5 == 0){
    console.log("fizz");
    }else{
    console.log(i);   
    }
}

for(let i = 1; i < 100; i++){
    if(i % 3 == 0 && i % 5 == 0){
        console.log("FizzBuzz");
    }else if(i % 5 == 0){
        console.log("FIZZ");
    }else if(i % 3 == 0){
        console.log("BUZZ");
    }else{
        console.log(i);
    }
}
