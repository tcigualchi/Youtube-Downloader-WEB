const convertButton = document.getElementById('convert-button');
const convertInput = document.getElementById('convert-input');
const resultDisplay = document.querySelector('.result');

convertButton.addEventListener("click", () => {
    getAudio();
});

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
        const result = await response.json(); // Supondo que a resposta é um JSON. Use json() em vez de text()

        resultDisplay.innerHTML = `<p class="title">Title: ${result.title}</p>`;

        setTimeout(() => {
            window.open(result.link, "_blank");
        }, 1000);
    } catch (error) {
        console.error('Fetch error: ', error);
        alert("There was an error processing your request. Please try again.");
        // Certifique-se de limpar ou atualizar resultDisplay aqui se necessário
        resultDisplay.innerHTML = "<p>There was an error processing your request. Please try again.</p>";
    }
}
