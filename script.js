const form = document.querySelector('form');
const result = document.querySelector('.result');
let volume_button; volume_button = document.querySelector('.fa-volume-low');
let bulb = document.querySelector('.fa-lightbulb');
const main_content = document.querySelector('.main_content');
const hamz = document.getElementById('hamz');
const footer_p = document.querySelector('footer p');

let result_inner_text = null;
// console.log(bulb)
let Pronounciation_url = null;

function submit_event(e) {
    e.preventDefault();
    getword(form.elements[0].value);

}
const getword = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log((data));
        let words = data[0].word;
        let meaning = data[0].meanings[0].definitions[0].definition;
        let other_Meanings = data[0].meanings[0].definitions;
        let other_Meanings_container = '';
        // console.log(data[0].meanings[0].definitions.length)
        if (other_Meanings.length <= 1) {
            other_Meanings_container = 'Not Found Any'
        }
        else if (other_Meanings.length > 1 && other_Meanings.length < 5) {
            for (let i = 0; i < other_Meanings.length - 1; i++) {
                other_Meanings_container += `${data[0].meanings[0].definitions[i + 1].definition}`
            }
        }
        else if (other_Meanings.length >= 5) {
            for (let i = 0; i <= 3; i++) {
                other_Meanings_container += `${data[0].meanings[0].definitions[i + 1].definition}`
            }
        }

        // console.log(other_Meanings_container);
        let example = data[0].meanings[0].definitions[0].example;
        example === undefined ? (example = 'Not Found') : example;
        let phonetic = data[0].phonetic;
        if (phonetic === undefined) {
            phonetic = 'Not found';
        }
        let antonyms = data[0].meanings[0].antonyms;
        antonyms.length === 0 ? antonyms = 'Not Found' : antonyms;
        let synonyms = data[0].meanings[0].synonyms;
        synonyms.length === 0 ? synonyms = 'Not Found' : synonyms;
        let read_more_link = data[0].sourceUrls;
        let Pronounciation;
        if (data[0].phonetics.length > 0) {
            Pronounciation = data[0].phonetics[0].audio;
        }
        else {
            Pronounciation = 'url Not found';
        }
        Pronounciation_url = Pronounciation;
        result.style.justifyContent = 'space-between';
        result.style.alignItems = 'flex-start';
        result.innerHTML = `
    <p> <strong>Word</strong> : ${words}</p>
    <p><b>Meaning</b> : ${meaning}</p>
    <p><b>Other Meanings</b> : ${other_Meanings_container}</p>
    <p><b>Example : </b>${example} </p>
    <p><b>Phonetics : </b>${phonetic} </p> 
    <p><b>Antonyms : </b>${antonyms}</p>
    <p><b>Synonyms : </b>${synonyms}</p>
    <p><b>Pronounciation :</b><i class="fa-solid fa-volume-low" onclick="volume()"></i></p>
    <p>Read More on  <a href = "${read_more_link}" target="_blank">  Wikipedia </a></p>
    `

        result_inner_text = Array.from(document.querySelectorAll('.result p'));
        volume_button = document.querySelector('.fa-volume-low');
    } catch (error) {
        result.style.justifyContent = 'center';
        result.style.alignItems = 'center';
        result.innerHTML = `<p> No Result Found </p>
    <p>Try to Find another word</p>`
    }
    if (window.innerWidth <= 300) {
        result_inner_text.forEach((Element) => {
            Element.style.fontSize = '20px';
        })
    }

    if (bulb.classList.contains('yellow')) {
        if (result_inner_text !== null) {
            result_inner_text.forEach((Element) => {
                Element.style.color = 'black';
            })
        }
    }
    else {
        if (result_inner_text !== null) {
            result_inner_text.forEach((Element) => {
                Element.style.color = '#fff';
            })
        }
    }

}

function switch_text_color() {
    if (bulb.classList.contains('yellow')) {
        result_inner_text.forEach((Element) => {
            Element.style.color = 'black';
        })
    }
    else {
        result_inner_text.forEach((Element) => {
            Element.style.color = '#fff';
        })
    }
}
function volume() {
    console.log(Pronounciation_url);
    if (Pronounciation_url === 'url Not found' || Pronounciation_url === '') {
        volume_button.classList.remove('fa-volume-low');
        volume_button.classList.add('fa-volume-xmark');
    }
    else {

        let audio = new Audio(Pronounciation_url)
        audio.play();
    }

}

function bulb_event() {

    bulb.classList.toggle('yellow');
    if (bulb.classList.contains('yellow')) {
        main_content.style.backgroundColor = 'white';
        result.style.backgroundColor = 'white';
        hamz.style.color = 'black';
        footer_p.style.color = 'black';
    }
    else {
        main_content.style.backgroundColor = 'rgb(28, 27, 27)';
        result.style.backgroundColor = 'rgb(28, 27, 27)';
        hamz.style.color = '#fff';
        footer_p.style.color = '#fff';
    }

    if (result_inner_text !== null) {
        switch_text_color();
    }

}
form.addEventListener('submit', submit_event);
bulb.addEventListener('click', bulb_event);


