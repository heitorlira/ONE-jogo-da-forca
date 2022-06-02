/* TODO:
!  1. lógica
   2. feedback visual
   3. validação: ganhou? <=> perdeu?
   4. FIXME: eixo, desenharTracinho(), escreverLetraCorreta(); <-- Mudar o nome das funções e variáveis
*/
//#region --- Variáveis
var palavras = ['ALURA', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']; // Array de palavras a serem sorteadas #TODO: adicionar mais
var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]; // Sorteia uma palavra e arredonda

var vidas = 5; // Quantidade de vidas restantes antes de perder o jogo
var letrasErradas = []; // -> Array de letras erradas & não podem ser repetidas
var letrasCorretas = []; // -> faz parte da palavra secreta

var canvas = document.querySelector('#canvas').getContext('2d'); // -> tabuleiro do jogo | Onde será desenhado
//#endregion --- Variáveis

//#region --- Funções
function desenharTracinho() {
    // FIXME: mudar o nome da função, pelo amor de deus
    canvas.lineWidth = 6; // Espessura(densidade, grossura) da linha
    canvas.lineCap = 'round'; // Ajusta a forma de terminar a linha (cantinhos arredondados)
    canvas.lineJoin = 'round'; // Ajusta a forma quando duas linhas se encontram (cantinhos arredondados)
    canvas.strokeStyle = '#0A3871'; // Cor das linhas
    
    var eixo = 600/palavraSecreta.length; // Descobrir o motivo do nome????? | Espaço onde será desenhado o tracinho
    canvas.beginPath(); // Inicia o desenho
    for (let i = 0; i < palavraSecreta.length; i++) {
        canvas.moveTo(500 + (eixo * i), 640); // Mover
        canvas.lineTo(550 + (eixo * i), 640); // Desenhar
    }
    canvas.stroke(); // Borda
    canvas.closePath(); // Finaliza o desenho
}

function escreverLetraCorreta(indice) {
    canvas.font = 'bold 52px Inter'; // Tipo da fonte usada (importada no HTML)
    canvas.lineWidth = 6; // Espessura(densidade, grossura) da linha
    canvas.lineCap = 'round'; // Ajusta a forma de terminar a linha (cantinhos arredondados)
    canvas.lineJoin = 'round'; // Ajusta a forma quando duas linhas se encontram (cantinhos arredondados)
    canvas.strokeStyle = '#0A3871'; // Cor das linhas

    var eixo = 600/palavraSecreta.length; // Descobrir o motivo do nome????? | Espaço onde será desenhado o tracinho
    canvas.fillText(palavraSecreta[indice], 505 + (eixo * indice), 620); // Desenha a letra na posição correta
    canvas.stroke(); // Borda
}

//! function escreverLetraIncorreta() {} ----> 42:20

//! function pegandoTeclado() {}

//#endregion --- Funções


desenharTracinho(palavraSecreta); // Desenha o tracinho na tela(canvas)


//#region LOGs TODO: remover
console.log(palavraSecreta);
