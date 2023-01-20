
//DIGITAR A GLICEMIA E TESTAR SE ESTAR DENTRO DO INTERVALO SAUDAVÉL.

let paciente = prompt("Nome do paciente: ");
let glicemia = prompt("Valor da glicemia: ");

if (glicemia < 70){
    //hipoglicemico
    alert("O paciente: "+ paciente +" está Hipoglicemico")
}else if(glicemia > 99){
    //hiperglicemia
    alert("O paciente: "+ paciente +" está Hiperglicemia")
}else{
    //saudavel
    alert("O paciente: "+ paciente +" está Saudavel")
}