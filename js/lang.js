const translations = {
    en: {
        placeholder : "Paste YouTube Video link here...",
        convbtn : "Download",
        err : "Error! Youtube URL Invalid. Please try again.",
        erralrt : "Error! Youtube URL Invalid",
        neterr : "Network response was not ok",
        fetcherr : "There was an error processing your request. Please try again.",
        fetchdisplayerr: "There was an error processing your request. Please try again.",
        titleText: "Title:"
    },
    ptbr: {
        placeholder : "Cole a URL do seu Video aqui",
        convbtn : "Baixar",
        err : "Ocorreu um Erro, URL Invalida!",
        erralrt : "URL Invalida!",
        neterr : "Ocorreu um Erro na Rede!",
        fetcherr : "Houve um erro ao processar seu pedido. Por favor, tente novamente.",
        fetchdisplayerr: "Houve um erro ao processar seu pedido. Por favor, tente novamente.",
        titleText: "Título:"
    },
    es: {
        placeholder: "Pega la URL de tu vídeo aquí",
        convbtn: "Descargar",
        err: "Ocurrió un error, ¡URL inválida!",
        erralrt: "¡URL inválida!",
        neterr: "¡Ocurrió un error en la red!",
        fetcherr: "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.",
        fetchdisplayerr: "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.",
        titleText: "Título:"
    },
};

const languageSelect = document.querySelector(".language-select");
const convertButton1 = document.getElementById("convert-button");
const convertInput1 = document.getElementById("convert-input");
const resultDisplay1 = document.querySelector('.result');

languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
});

const setLanguage = (language) => {
    document.documentElement.lang = language;

    convertInput.placeholder = translations[language].placeholder;
    convertButton.innerText = translations[language].convbtn;
};

async function getAudio(){
    let link = convertInput.value;
    let parts = link.split("="); // URLs do YouTube geralmente têm o ID após "=", não "-"
    let videoId = "";

    if (parts.length > 1) {
        videoId = parts[parts.length - 1]; // Pega a última parte após o último "=", que deve ser o ID do vídeo
    } else {
        alert(translations[document.documentElement.lang].err);
        resultDisplay.innerHTML = `<p>${translations[document.documentElement.lang].err}</p>`;
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
        if (!response.ok) throw new Error(translations[document.documentElement.lang].neterr);
        const result = await response.json(); 

        resultDisplay.innerHTML = `<p class="title">${translations[document.documentElement.lang].titleText} ${result.title}</p>`;

        setTimeout(() => {
            window.open(result.link, "_blank");
        }, 1000);
    } catch (error) {
        console.error('Fetch error: ', error);
        alert(translations[document.documentElement.lang].fetcherr);
        resultDisplay.innerHTML = `<p>${translations[document.documentElement.lang].fetchdisplayerr}</p>`;
    }
}

// Inicializa o idioma com o valor padrão do select
setLanguage(languageSelect.value);
