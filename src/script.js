

//get elems
const searchBox = document.querySelector('.search__box'),
    input = document.querySelector('.search__input'),
    suggestionsBox = document.querySelector('.search__autocomplete');

//Storage
class Storage {
    static getItems() {
        const suggList = JSON.parse(localStorage.getItem('suggList'));
        return suggList;
    }
    static saveItems(list) {
        //transform to lowerCase first
        list = list.map(item => item.toLocaleLowerCase());
        localStorage.setItem('suggList', JSON.stringify(list))
    }
}




window.addEventListener('DOMContentLoaded', () => {
    //setup application
    setupApp();
    //get suggestions from storage, either its newly created array from our list
    //either its already filled with user inputs array
    suggestions = Storage.getItems();

    //input event listener on key press
    input.addEventListener('input', (e) => {
        let userInput = e.target.value; // get user input
        let arr = [];
        if (userInput) {
            //filter user input based on starting word
            arr = suggestions.filter(item => {
                return item.startsWith(userInput.toLocaleLowerCase());
            })
            //transform to html, to show in suggestionsBox
            arr = arr.map(item => {
                return item = `<li>${item}</li>`
            })
            console.log(arr);
            //show suggestions
            showList(arr);
            suggestionsBox.classList.add('active')
            //add click events to all list items
            const listItems = suggestionsBox.querySelectorAll('li');
            listItems.forEach(item => {
                item.addEventListener('click', () => {
                    //set input value to value of clicked element
                    input.value = item.textContent;
                    suggestionsBox.classList.remove('active') //hide suggestions box
                })
            })
        } else {
            suggestionsBox.classList.remove('active')
        }
    })

    //listen for enter key, if its pressed add new item to suggestions
    input.addEventListener('keydown', (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            const value = e.target.value;
            //put value in suggestions only if theres no dublicate
            if (!suggestions.includes(value.toLocaleLowerCase())) {
                suggestions.push(value);
                //and save it in storage
                Storage.saveItems(suggestions);
            }
            //hide suggestion box
            suggestionsBox.classList.remove('active')
        }
    })

    function showList(list) {
        //if we have items in suggestions list show them in list
        if (list.length) {
            //show result in suggestions box
            suggestionsBox.innerHTML = `${list.join('')}`
            //else show user input
        } else {
            let userInput = input.value;
            suggestionsBox.innerHTML = `<li>${userInput}</li>`
        }
    }

    

    //setup page
    function setupApp() {
        //if there is suggestions in storage get them
        //else set them
        if (Storage.getItems()) {
            suggestions = Storage.getItems;
        } else {
            Storage.saveItems(suggestions);
        }
    }
})