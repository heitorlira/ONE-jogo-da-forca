//#region ---> Variáveis
var btnIniciarJogo = document.querySelector('.btn-iniciar-jogo');
var btnMostrarDiv = document.querySelector('.btn-mostrar-div');
var divOculta = document.querySelector('.div-add-nova-palavra');
var btnSalvarPalavra = document.querySelector('.btn-nova-palavra');
sessionStorage.setItem('palavraStorage', 'PALAVRA'); // Evita que a palavra seja 'null'
//#endregion ---> Variáveis

btnIniciarJogo.onclick = () => {
    window.location.href = 'https://heitorlira.github.io/forca.html'; // Redireciona para a página do jogo
}

//#region ---> Funções
btnMostrarDiv.onclick = () => {
    divOculta.style.display = 'block';
    btnMostrarDiv.innerHTML = 'Digite sua palavra abaixo';
}

btnSalvarPalavra.onclick = () => {
    var novaPalavra = document.querySelector('.nova-palavra').value.toUpperCase(); // Pega o valor do input
    sessionStorage.setItem('palavraStorage', novaPalavra); // Salva o valor do input no sessionStorage
}
//#endregion ---> Funções