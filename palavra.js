var btnMostrarDiv = document.querySelector('.btn-mostrar-div');
var divOculta = document.querySelector('.div-add-nova-palavra');
var btnSalvarPalavra = document.querySelector('.btn-nova-palavra');
sessionStorage.setItem('palavraStorage', 'PALAVRA');

// TODO: LOGS
console.log(palavras);
console.log(sessionStorage.getItem('palavraStorage'));


btnMostrarDiv.onclick = () => {
    divOculta.style.display = 'block';
    btnMostrarDiv.innerHTML = 'Digite sua palavra abaixo';
}

btnSalvarPalavra.onclick = () => {
    var novaPalavra = document.querySelector('.nova-palavra').value.toUpperCase(); // Pega o valor do input
    sessionStorage.setItem('palavraStorage', novaPalavra); // Salva o valor do input no sessionStorage
    //! Apagar linhas abaixo
    // TODO: Apagar LOG
    palavras.push(novaPalavra.toUpperCase()); // Adiciona a palavra nova na array palavras
    console.log(palavras);
}