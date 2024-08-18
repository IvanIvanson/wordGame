const randomletterEl = document.querySelector(".js-random-letters"),
  textInput = document.querySelector(".js-text"),
  answerEl = document.querySelector(".js-answer"),
  btnRefresh = document.querySelector(".js-btn-refresh"),
  btnCheck = document.querySelector(".js-btn-check"),
  container = document.querySelector(".modal-container"),
    h1 = document.querySelector("h1"),
  btnCancel = document.querySelector(".cancel"),
    btnPlay = document.querySelector(".play"),
    wordScramble = document.querySelector(".container");
    

// let initialWords = ['вид', 'кольцо', 'билет', 'издание', 'двигатель', 'банан'];
let initialWords = ['вид', 'банан'];

let words = [...initialWords];
let currentWord;

const scrambleWord = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    // console.log('CurrentWord: ', currentWord);
    let shufleWord = currentWord.split('');
    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            let k = array[i];
            array[i] = array[j];
            array[j] = k;
        }
        return array.join('');
    };
    console.log(shuffleArray(shufleWord));
    const showRandomLetters = () => {
        randomletterEl.textContent = shuffleArray(shufleWord);
    }
    showRandomLetters();
};

const checkWord = () => {
    let userWord = textInput.value.toLowerCase();

    //console.log(userWord);
    if (userWord === currentWord && words.length !== 1) {
        answerEl.textContent = 'Верно! Попробуй составить другие слова!';
        words = words.filter((item) => {
    return item != currentWord;
});
        textInput.value = '';
        scrambleWord();
    } else if(userWord === currentWord && words.length == 1){
        answerEl.textContent = 'Молодец! Ты составил все слова!';
        answerEl.classList.remove('warning');
        words = [...initialWords];
        textInput.value = '';
        randomletterEl.textContent = '';
        container.classList.add("stretch-in");
        wordScramble.classList.add("hidden");

        h1.textContent = "Молодец! Ты составил все слова!";
        btnPlay.addEventListener('click', () => {
            container.classList.remove("stretch-in");
            wordScramble.classList.remove("hidden");
            setTimeout(() => {
                scrambleWord();
            }, 200);
        });
        btnCancel.addEventListener("click", () => {
            container.classList.remove("stretch-in");
            wordScramble.classList.remove("hidden");
            btnRefresh.classList.add('disabled');
            btnCheck.classList.add("disabled");
            btnRefresh.disabled = true;
            btnCheck.disabled = true;
         
        });
       
    } else {
        answerEl.classList.add('warning');
        answerEl.textContent = 'Неверно! Попробуй ещё раз!';
    }
    // setTimeout(() => {
    //     answerEl.textContent = '';
    // }, 2000);
}

btnRefresh.addEventListener('click', () => {
    scrambleWord();
});

btnCheck.addEventListener("click", () => {
  checkWord();
});
window.addEventListener('load', scrambleWord);