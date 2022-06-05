/* TODO:
!  1. lógica
?  1.1 Desenhando a forca
   2. feedback visual
   3. validação: ganhou? <=> perdeu?
   4. FIXME: eixo, desenhaTracoLetras(), escreverLetraCorreta(); <-- Mudar o nome das funções e variáveis
*/

//#region ---> Variáveis
var palavras = ['ALURA', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']; // Array de palavras a serem sorteadas #TODO: adicionar mais
var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]; // Sorteia uma palavra e arredonda

var vidas = 5; // Quantidade de vidas restantes antes de perder o jogo
var letrasErradas = []; // -> Array de letras erradas & não podem ser repetidas
var letrasCorretas = []; // -> faz parte da palavra secreta
var menosDois = 2;

var canvas = document.querySelector('#canvas').getContext('2d'); // -> tabuleiro do jogo | Onde será desenhado
//#endregion ---> Variáveis

// FIXME: Apagar LOG
console.log(palavraSecreta);

desenhaTracoLetras(palavraSecreta); // Desenha o tracinho na tela(canvas)
desenhaForca();

document.addEventListener('keydown', (evento) => {
    var codigoLetra = evento.keyCode; // evento.keyCode -> pega o código da tecla pressionada

    if (eUmaLetra(codigoLetra)) {
        var letra = evento.key.toUpperCase(); // evento.key -> pega a letra da tecla pressionada (não o código)

        // Essa letra é repetida? Sim -> mostrarAvisoLetraRepetida()
        if (letrasErradas.includes(letra) || letrasCorretas.includes(letra)) {
            mostrarAvisoLetraRepetida(); // Evitar que a mesma letra seja usada mais de uma vez
        } else {
            // A letra tá na palavra secreta?
            if (palavraSecreta.includes(letra)) {
                desenhaLetraCorreta(letra); // Sim -> localiza e posiciona a letra na tela
                gameWin(); // Se todas as letras estiverem corretas -> Ganhou!
            } else {
                letrasErradas.push(letra); // Não -> adiciona letra na array de letras erradas
                vidas--; // Diminui uma vida
                escreverLetraIncorreta(letra, vidas); // Escreve a letra errada na tela
                gameOver(); // Se não houver mais vidas -> Perdeu
            }
        }
        // Fim
    }

    //FIXME: Apagar LOGs
    console.log('Letra inserida: ' + letra);
    console.log('Erradas    -> ' + letrasErradas);
    console.log('Corretas   -> ' + letrasCorretas);
    console.log('Vidas      -> ' + vidas);
});

function desenhaForca() { // Toda a base da forca está aqui
    desenharTipoDaLinha(5); // Configuração da linha
    canvas.beginPath(); // Inicia o desenho
    canvas.moveTo(550, 450); // Base (baixo): inicio
    canvas.lineTo(650, 450); // Base (baixo): Final
    canvas.moveTo(600, 450); // 'Poste': Inicio
    canvas.lineTo(600, 100); // 'Poste': Final
    canvas.moveTo(600, 100); // Base (cima): Inicio
    canvas.lineTo(700, 100); // Base (cima): Final
    canvas.moveTo(700, 100); // Suporte cabeça: Inicio
    canvas.lineTo(700, 150); // Suporte cabeça: Final
    canvas.stroke(); // Borda
}

function desenhaBoneco() {
    // cabeça
    // corpo
    // braço esquerdo
    // braço direito
    // perna esquerda
    // perna direita
}


//#region ---> Funções
function desenharTipoDaLinha(espessuraDaLinha) { // Configuração da linha | Melhorando visibilidade
    canvas.lineWidth = espessuraDaLinha; // Espessura(densidade, grossura) da linha
    canvas.lineCap = 'round'; // Ajusta a forma de terminar a linha (cantinhos arredondados)
    canvas.lineJoin = 'round'; // Ajusta a forma quando duas linhas se encontram (cantinhos arredondados)
    canvas.strokeStyle = '#0A3871';
}

function desenhaTracoLetras() { // FIXME: mudar o nome da função, pelo amor de deus
    desenharTipoDaLinha(6); // Configuração da linha
    
    var eixo = 600/palavraSecreta.length; // Descobrir o motivo do nome????? | Espaço onde será desenhado o tracinho
    canvas.beginPath(); // Inicia o desenho
    for (let i = 0; i < palavraSecreta.length; i++) {
        canvas.moveTo(500 + (eixo * i), 640); // Mover
        canvas.lineTo(550 + (eixo * i), 640); // Desenhar
    }
    canvas.stroke(); // Borda
    canvas.closePath(); // Finaliza o desenho
}

function eUmaLetra(intervalo) {
    // A=65 <-> Z=90
    return intervalo >= 65 && intervalo <= 90;
}

function mostrarAvisoLetraRepetida() { // FIXME: Modificar o alert() para um aviso visual melhor
    alert('Essa letra já foi usada!');
}

function escreverLetraCorreta(letraCorreta) {
    canvas.font = 'bold 52px Inter'; // Tipo da fonte usada (importada no HTML)
    desenharTipoDaLinha(6); // Configuração da linha

    var eixo = 600/palavraSecreta.length; // Descobrir o motivo do nome????? | Espaço onde será desenhado o tracinho
    canvas.fillText(palavraSecreta[letraCorreta], 505 + (eixo * letraCorreta), 620); // Desenha a letra correta acima dos tracinhos
    canvas.stroke(); // Borda
}

// Mesma construção de lógica de escreverLetraCorreta()
function escreverLetraIncorreta(letraIncorreta, margemDeErro) {
    canvas.font = 'bold 40px Inter'; // Tipo da fonte usada (importada no HTML)
    desenharTipoDaLinha(6); // Configuração da linha

    canvas.fillText(letraIncorreta, 375 + (40 *(10 - margemDeErro)), 710, 40); // Desenha a letra incorreta abaixo dos tracinhos
}

function desenhaLetraCorreta(letra) { // Melhorando visibilidade
    escreverLetraCorreta(palavraSecreta.indexOf(letra)); // Localiza a posição da letra na palavra secreta
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            escreverLetraCorreta(i); // Desenha a letra
            letrasCorretas.push(letra);
        }
    }
}

function gameWin() { // Melhorando visibilidade
    if (letrasCorretas.length === palavraSecreta.length) {
        alert('Parabéns! Você ganhou!');
    }
}

function gameOver() {  // Melhorando visibilidade
    if (vidas <= 0) {
        alert('Game Over!'); // Perdeu o jogo
    }
}
//#endregion ---> Funções