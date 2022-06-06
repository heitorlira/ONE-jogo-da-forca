/* TODO:
   1. lógica                            OK
   1.1 Desenhando a forca               OK
!  2. feedback visual                   ?
   3. validação: ganhou? <=> perdeu?    OK
?  4. Bugs                              OK?
*/

//#region ---> Variáveis
var palavras = ['ALURA', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']; // Array de palavras a serem sorteadas #TODO: adicionar mais
palavras.push(sessionStorage.getItem('palavraStorage')); // Adiciona a palavra do storage na array de palavras antes de sortear uma palavra
var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]; // Sorteia uma palavra e arredonda

var vidas = 6; // Quantidade de vidas restantes antes de perder o jogo | Validação de teclas pressionadas
var letrasErradas = []; // -> Array de letras erradas & não podem ser repetidas
var letrasCorretas = []; // -> faz parte da palavra secreta

var canvas = document.querySelector('#canvas').getContext('2d'); // -> tabuleiro do jogo | Onde será desenhado
//#endregion ---> Variáveis

// TODO: Apagar LOG
console.log(palavraSecreta);
console.log(sessionStorage.getItem('palavraStorage'));
//! Essa abaixo tá quase

console.log(palavras);
//TODO: APAGAR

desenhaTracoLetras(palavraSecreta); // Desenha o tracinho na tela(canvas)
forcaDesenha(); // Suporte da forca

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
                    vidas--; // Diminui a quantidade de vidas
                    escreverLetraIncorreta(letra, vidas); // Escreve a letra errada na tela
                    forcaBoneco();
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
    
    var tamanhoLinha = 600/palavraSecreta.length; // Espaço onde será desenhado o tracinho
    canvas.beginPath(); // Inicia o desenho
    for (let i = 0; i < palavraSecreta.length; i++) {
        canvas.moveTo(300 + (tamanhoLinha * i), 540); // Mover
        canvas.lineTo(350 + (tamanhoLinha * i), 540); // Desenhar
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

    var tamanhoLinha = 600/palavraSecreta.length; //  Espaço onde será desenhado o tracinho
    canvas.fillText(palavraSecreta[letraCorreta], 308 + (tamanhoLinha * letraCorreta), 525); // Desenha a letra correta acima dos tracinhos
    canvas.stroke(); // Borda
}

// Mesma construção de lógica de escreverLetraCorreta()
function escreverLetraIncorreta(letraIncorreta, margemDeErro) {
    canvas.font = 'bold 40px Inter'; // Tipo da fonte usada (importada no HTML)
    configuracaoDaLinha(6); // Configuração da linha

    canvas.fillText(letraIncorreta, 250 + (40 *(10 - margemDeErro)), 610, 40); // Desenha a letra incorreta abaixo dos tracinhos
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
    canvas.moveTo(500, 400); // Base (baixo): inicio
    canvas.lineTo(600, 400); // Base (baixo): Final

    canvas.moveTo(550, 400); // 'Poste': Inicio
    canvas.lineTo(550, 100); // 'Poste': Final

    canvas.moveTo(550, 100); // Base (cima): Inicio
    canvas.lineTo(650, 100); // Base (cima): Final

    canvas.moveTo(650, 100); // Suporte cabeça: Inicio
    canvas.lineTo(650, 150); // Suporte cabeça: Final
    canvas.stroke(); // Borda
}

function gameWin() { // Melhorando visibilidade
    if (letrasCorretas.length === palavraSecreta.length) {
        canvas.font = 'bold 52px Inter'; // Tipo da fonte usada (importada no HTML)
        configuracaoDaLinha(6); // Configuração da linha
        canvas.fillStyle = '#5CFF5C'; // Cor da letra
        canvas.fillText('Você venceu!', 750, 300); // Desenha a letra correta acima dos tracinhos
        canvas.stroke(); // Borda

        vidas = 0;
    }
}

function gameOver() {  // Melhorando visibilidade
    if (vidas == 0) {
        canvas.font = 'bold 52px Inter'; // Tipo da fonte usada (importada no HTML)
        configuracaoDaLinha(6); // Configuração da linha
        canvas.fillStyle = '#FF5C5C'; // Cor da letra
        canvas.fillText('Você perdeu!', 750, 300); // Desenha a letra correta acima dos tracinhos
        canvas.stroke(); // Borda
    }
}

// Funções para desenhar o corpo na forca
function forcaBoneco() { // Melhorando visibilidade
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

function forcaCabeca() {
    canvas.beginPath();
    canvas.arc(650, 180, 30, 0, 2 * Math.PI);
    canvas.stroke();
}

function forcaCorpo() {
    canvas.beginPath();
    canvas.moveTo(650, 210);
    canvas.lineTo(650, 300);
    canvas.stroke();
}

function forcaBracoEsquerdo() {
    canvas.beginPath();
    canvas.moveTo(650, 240);
    canvas.lineTo(610, 270);
    canvas.stroke();
}

function forcaBracoDireito() {
    canvas.beginPath();
    canvas.moveTo(650, 240);
    canvas.lineTo(690, 270);
    canvas.stroke();
}

function forcaPernaEsquerda() {
    canvas.beginPath();
    canvas.moveTo(650, 300);
    canvas.lineTo(610, 350);
    canvas.stroke();
}

function forcaPernaDireita() {
    canvas.beginPath();
    canvas.moveTo(650, 300);
    canvas.lineTo(690, 350);
    canvas.stroke();
}
//#endregion ---> Funções