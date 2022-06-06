var btnMostrarDiv = document.querySelector('.btn-mostrar-div');
var divOculta = document.querySelector('.div-add-nova-palavra');
var btnSalvarPalavra = document.querySelector('.btn-nova-palavra');

btnMostrarDiv.onclick = () => {
    divOculta.style.display = 'block';
    btnMostrarDiv.innerHTML = 'Ocultar';
}

btnSalvarPalavra.onclick = () => {
    var novaPalavra = document.querySelector('.nova-palavra').value; // Pega o valor do input
    palavras.push(novaPalavra.toUpperCase()); // Adiciona a palavra nova na array palavras
    novaPalavra.value = 'Salvo!'; // Limpa o input
    // TODO: Apagar LOG
    console.log(palavras);
}