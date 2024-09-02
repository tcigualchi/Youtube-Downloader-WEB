// Seleciona o botão de conversão, a caixa de entrada e o elemento de exibição de resultados
const convertButton = document.getElementById('convert-button');
const convertInput = document.getElementById('convert-input');
const resultDisplay = document.querySelector('.result');

// Adiciona um evento de clique ao botão de conversão
convertButton.addEventListener("click", () => {
    getAudio();
});

// Função assíncrona para obter o áudio do YouTube
async function getAudio(){
    let link = convertInput.value;
    let parts = link.split("="); // URLs do YouTube geralmente têm o ID após "=", não "-"
    let videoId = "";

    if (parts.length > 1) {
        videoId = parts[parts.length - 1]; // Pega a última parte após o último "=", que deve ser o ID do vídeo
    } else {
        console.log("Error!");
        alert("Error! Youtube URL Invalid");
        resultDisplay.innerHTML = "<p>Error! Youtube URL Invalid. Please try again.</p>";
        return;
    }

    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`; // Use aspas invertidas para interpolação
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c312ee3d26mshfcc97a03e04aa50p1e05fbjsn29eaf86c0296',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json(); 

        // Exibe o título do vídeo
        resultDisplay.innerHTML = `<p class="title">Title: ${result.title}</p>`;

        // Abre uma nova janela com o link de download após 1 segundo
        setTimeout(() => {
            window.open(result.link, "_blank");
        }, 1000);
    } catch (error) {
        console.error('Fetch error: ', error);
        alert("There was an error processing your request. Please try again.");
        resultDisplay.innerHTML = "<p>There was an error processing your request. Please try again.</p>";
    }
}

document.getElementById('toggleTheme').addEventListener('click', function() {
    document.documentElement.classList.toggle('modo-branco');
    alterarImagem();
});

function alterarImagem() {
    const imagem = document.getElementById("toggleTheme");
    const modoBranco = document.documentElement.classList.contains("modo-branco");

    if (modoBranco) {
        imagem.src = "imgs/white.png"; // Caminho da imagem do botão no modo gold
    } else {
        imagem.src = "imgs/gold.png"; // Caminho da imagem do botão no modo branco
    }
}
  
