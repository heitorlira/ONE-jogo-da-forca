/* TODO:
   1. lógica
   1.1 Desenhando a forca
!  2. feedback visual
   3. validação: ganhou? <=> perdeu?
*/

//#region ---> Variáveis
var palavras = ['ALURA', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']; // Array de palavras a serem sorteadas #TODO: adicionar mais
var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]; // Sorteia uma palavra e arredonda

var vidas = 6; // Quantidade de vidas restantes antes de perder o jogo | Validação de teclas pressionadas
var letrasErradas = []; // -> Array de letras erradas & não podem ser repetidas
var letrasCorretas = []; // -> faz parte da palavra secreta

var canvas = document.querySelector('#canvas').getContext('2d'); // -> tabuleiro do jogo | Onde será desenhado
//#endregion ---> Variáveis

// TODO: Apagar LOG
console.log(palavraSecreta);

desenhaTracoLetras(palavraSecreta); // Desenha o tracinho na tela(canvas)
forcaDesenha();

document.addEventListener('keydown', (evento) => { // atualizaJogo();
    var codigoLetra = evento.keyCode; // evento.keyCode -> pega o código da tecla pressionada

    if (!vidas == 0) {
        if (eUmaLetra(codigoLetra)) {
            var letra = evento.key.toUpperCase(); // evento.key -> pega a letra da tecla pressionada (não o código)
    
            // Essa letra é repetida? Sim -> avisoLetraRepetida()
            if (letrasErradas.includes(letra) || letrasCorretas.includes(letra)) {
                avisoLetraRepetida(); // Evitar que a mesma letra seja usada mais de uma vez
            } else {
                // A letra tá na palavra secreta?
                if (palavraSecreta.includes(letra)) {
                    desenhaLetraCorreta(letra); // Sim -> localiza e posiciona a letra na tela
                    gameWin(); // Se todas as letras estiverem corretas -> Ganhou!
                } else {
                    letrasErradas.push(letra); // Não -> adiciona letra na array de letras erradas
                    vidas--; // Decrementa a quantidade de vidas
                    escreverLetraIncorreta(letra, vidas); // Escreve a letra errada na tela

                    switch (vidas) {
                        case 5:
                            forcaCabeca();
                            break;
                        case 4:
                            forcaCorpo();
                            break;
                        case 3:
                            forcaBracoEsquerdo();
                            break;
                        case 2:
                            forcaBracoDireito();
                            break;
                        case 1:
                            forcaPernaEsquerda();
                            break;
                        default:
                            forcaPernaDireita();
                            gameOver();
                            break;
                    }
                }
            }
        }
    } // Fim

    // TODO: Apagar LOGs
    console.log('Letra inserida: ' + letra);
    console.log('Erradas    -> ' + letrasErradas);
    console.log('Corretas   -> ' + letrasCorretas);
    console.log('Vidas      -> ' + vidas);
});



//#region ---> Funções
function configuracaoDaLinha(espessuraDaLinha) { // Configuração da linha | Melhorando visibilidade
    canvas.lineWidth = espessuraDaLinha; // Espessura(densidade, grossura) da linha
    canvas.lineCap = 'round'; // Ajusta a forma de terminar a linha (cantinhos arredondados)
    canvas.lineJoin = 'round'; // Ajusta a forma quando duas linhas se encontram (cantinhos arredondados)
    canvas.strokeStyle = '#0A3871';
}

function desenhaTracoLetras() {
    configuracaoDaLinha(6); // Configuração da linha
    
    var localizacao = 600/palavraSecreta.length; // Espaço onde será desenhado o tracinho
    canvas.beginPath(); // Inicia o desenho
    for (let i = 0; i < palavraSecreta.length; i++) {
        canvas.moveTo(500 + (localizacao * i), 640); // Mover
        canvas.lineTo(550 + (localizacao * i), 640); // Desenhar
    }
    canvas.stroke(); // Borda
    canvas.closePath(); // Finaliza o desenho
}

function eUmaLetra(intervalo) {
    // A=65 <-> Z=90
    return intervalo >= 65 && intervalo <= 90;
}

function avisoLetraRepetida() { // TODO: Modificar o alert() para um aviso visual melhor
    alert('Essa letra já foi usada!');
}

function escreverLetraCorreta(letraCorreta) {
    canvas.font = 'bold 52px Inter'; // Tipo da fonte usada (importada no HTML)
    configuracaoDaLinha(6); // Configuração da linha

    var localizacao = 600/palavraSecreta.length; // Espaço onde será desenhado o tracinho
    canvas.fillText(palavraSecreta[letraCorreta], 505 + (localizacao * letraCorreta), 620); // Desenha a letra correta acima dos tracinhos
    canvas.stroke(); // Borda
}

// Mesma construção de lógica de escreverLetraCorreta()
function escreverLetraIncorreta(letraIncorreta, margemDeErro) {
    canvas.font = 'bold 40px Inter'; // Tipo da fonte usada (importada no HTML)
    configuracaoDaLinha(6); // Configuração da linha

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

function forcaDesenha() { // Toda a base da forca está aqui
    configuracaoDaLinha(5); // Configuração da linha

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

function gameWin() { // Melhorando visibilidade
    if (letrasCorretas.length === palavraSecreta.length) {
        alert('Parabéns! Você ganhou!');
    }
}

function gameOver() {  // Melhorando visibilidade
    if (vidas == 0) {
        alert('Game Over!'); // Perdeu o jogo
    }
}

// Funções para desenhar o corpo na forca
function forcaCabeca() {
    canvas.beginPath();
    canvas.arc(700, 180, 30, 0, 2 * Math.PI);
    canvas.stroke();
}

function forcaCorpo() {
    canvas.beginPath();
    canvas.moveTo(700, 210);
    canvas.lineTo(700, 300);
    canvas.stroke();
}

function forcaBracoEsquerdo() {
    canvas.beginPath();
    canvas.moveTo(700, 240);
    canvas.lineTo(660, 270);
    canvas.stroke();
}

function forcaBracoDireito() {
    canvas.beginPath();
    canvas.moveTo(700, 240);
    canvas.lineTo(740, 270);
    canvas.stroke();
}

function forcaPernaEsquerda() {
    canvas.beginPath();
    canvas.moveTo(700, 300);
    canvas.lineTo(660, 350);
    canvas.stroke();
}

function forcaPernaDireita() {
    canvas.beginPath();
    canvas.moveTo(700, 300);
    canvas.lineTo(740, 350);
    canvas.stroke();
}

//#endregion ---> Funções