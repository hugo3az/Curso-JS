function maiorIdade (idade, calback){
    if(idade == 18){
        calback(["Brasil"]);
    }else if(idade == 19){
        calback(["Canada"]);
    }else if(idade == 21){
        calback(["USA"]);
    }
}

maiorIdade(21, (paises)=>{
    console.log("Paises:", paises);
});