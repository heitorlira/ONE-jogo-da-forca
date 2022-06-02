/* TODO:
!  1. lógica
   2. feedback visual
   3. validação: ganhou? <=> perdeu?
*/
//#region ----- Variáveis -----
var palavras = ['ALURA', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT']; // Array de palavras a serem sorteadas #TODO: adicionar mais
var palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]; // Sorteia uma palavra e arredonda

var vidas = 5; // Quantidade de vidas restantes antes de perder o jogo
var letrasErradas = []; // -> Array de letras erradas & não podem ser repetidas
var letrasCorretas = []; // -> faz parte da palavra secreta

var canvas = document.querySelector('#canvas').getContext('2d'); // -> tabuleiro do jogo | Onde será desenhado
//#endregion ----- Variáveis -----

