//fazer modo de Buscar, devemos retornar somente a nota do aluno que foi pesquisado

let notas = [
  ["Augusto", 3],
  ["Joao", 9],
  ["Lucas", 2],
  ["Chico", 10],
  ["Joana", 9],
  ["Luciana", 9.5]
];

let nome = prompt("Informe o nome do Aluno que deseja pesquisar?");

for(let i=0; i < notas.length; i++){
    if(notas[i][0].toLowerCase() == nome.toLowerCase().trim()){
      console.log(notas[i][1]);
    }
}
//toLowerCase() converte letras para minusculas
//trim() remove os espaços, usamos no que o usuario digita