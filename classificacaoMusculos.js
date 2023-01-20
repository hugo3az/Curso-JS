let musculos = [
    ["Músculo esquelético", "Bíceps braquial", "Braço superior"],
    ["Músculo esquelético", "Quadríceps femoral", "Coxa"],
    ["Músculo esquelético", "Trapezóide", "Costas superiores"],
    ["Músculo esquelético", "Deltóide", "Ombro"],
    ["Músculo esquelético", "Abdômen reto", "Abdômen"],
    ["Músculo liso", "Músculo intestinal", "Tracto gastrointestinal"],
    ["Músculo cardíaco", "Músculo cardíaco", "Coração"],
    ["Músculo liso", "Músculo vascular", "Vasos sanguíneos"],
    ["Músculo esquelético", "Pectoral maior", "Peito"],
    ["Músculo esquelético", "Eretor da espinha", "Costas"],
    ["Músculo esquelético", "Soleus", "Perna"],
    ["Músculo liso", "Músculo liso da bexiga", "Bexiga"],
    ["Músculo esquelético", "Músculo temporal", "Cabeça"],
    ["Músculo esquelético", "Gastrocnêmio", "Perna"],
    ["Músculo esquelético", "Músculo oblíquo externo", "Abdômen"],
    ["Músculo esquelético", "Músculo oblíquo interno", "Abdômen"],
    ["Músculo esquelético", "Músculo transverso do abdômen", "Abdômen"],
    ["Músculo esquelético", "Músculo flexor do cotovelo", "Braço"],
    ["Músculo esquelético", "Músculo estiloide radial", "Punho"],
    ["Músculo esquelético", "Músculo estiloide ulnar", "Punho"],
    ["Músculo esquelético", "Músculo extensor do cotovelo", "Braço"]
]

let esqueletico = [];
let liso = [];
let cardiaco = [];

for (let i = 0; i < musculos.length; i++) {
    if (musculos[i][0] == "Músculo esquelético") {
        esqueletico.push(musculos[i]);
    } else if (musculos[i][0] == "Músculo liso") {
        liso.push(musculos[i]);
    } else if (musculos[i][0] == "Músculo cardíaco") {
        cardiaco.push(musculos[i]);
    }
}
console.log(esqueletico);
console.log(liso);
console.log(cardiaco);

//DESAFIO
//[vertebrado|intertebrado, animal]
//No Classificacao, devemos criar duas listas e separar os animais
let animais = [["vertebrado", "baleia"],
["vertebrado", "pinguim"],
["vertebrado", "peixe-boi-da-amazônia"],
["vertebrado", "peixe-espada"],
["vertebrado", "arara"],
["vertebrado", "rato"],
["vertebrado", "cobra"],
["vertebrado", "lagarto"],
["vertebrado", "macaco"],
["invertebrado", "polvo"],
["invertebrado", "lula"],
["invertebrado", "ostras"],
["invertebrado", "caracóis"],
["invertebrado", "insetos"],
["invertebrado", "aracnídeos"],
["invertebrado", "crustáceos"]];

let vertebrados = [];
let invertebrado = [];

for(let i = 0; i < animais.length; i++){
    if(animais[i][0] == "vertebrado"){
        vertebrados.push(animais[i]);
    }else if(animais[i][0] == "invertebrado"){
        invertebrado.push(animais[i]);
    }
}
console.log(vertebrados);
console.log(invertebrado);