const suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

//get elems
const searchBox = document.querySelector('.search__box'),
    input = document.querySelector('.search__input'),
    suggestionsBox = document.querySelector('.search__autocomplete');

//input event listener on key press
input.addEventListener('input', (e) => {
    let userInput = e.target.value; // get user input
    let arr = [];
    if (userInput) {
        //filter user input based on starting word
        arr = suggestions.filter(item => {
            return item.toLocaleLowerCase().startsWith(userInput);
        })
        //transform to html, to show in suggestionsBox
        arr = arr.map(item => {
            return item = `<li>${item}</li>`
        })
        console.log(arr);
        //show result in suggestions box
        suggestionsBox.innerHTML = `${arr.join('')}`
    }
})