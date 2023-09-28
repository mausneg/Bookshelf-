const storage = window.localStorage
if (storage.getItem('books') === null) generateDefault()
renderBooks(JSON.parse(storage.getItem('books')))



function card(title,author,year,isComplete,genre,sinopsis,imgLink){
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `  <div class="card-header">
                            <img class="card-img" src=${imgLink} alt="">
                        </div>
                        <div class="card-body">
                            <div class="card-title">${title} (${year})</div>
                            <div class="card-author">${author}</div>
                            <div class="card-genre">${genre}</div>
                            <div class="card-sinopsis">${sinopsis}</div>
                            <div class="card-status">${isComplete ? 'Done' : 'Undone'}</div>
                            <div class="card-button">
                                <button class="button-edit"><i class="fa-solid fa-pencil"></i></button>
                                <button class="button-delete"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                        `
    if(isComplete) card.getElementsByClassName('card-status')[0].classList.add('done')
    else card.getElementsByClassName('card-status')[0].classList.add('undone')

    return card
}
function generateDefault(){
    const book = [
        {
            id: +new Date(),
            title: 'The Hobbit',
            author: 'J.R.R Tolkien',
            year: 1937,
            isComplete: true,
            genre: 'Fantasy', 
            sinopsis: 'Bilbo Baggins, a hobbit who enjoys a comfortable, unambitious life, is swept away by Gandalf the Wizard and a company of dwarves. He embarks on a journey that takes him to the Lonely Mountain where he must face Smaug, a dragon.',
            imgLink:'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Hobbit_cover.JPG/220px-Hobbit_cover.JPG'
        },
        {
            id: +new Date(),
            title: 'The Lord of The Rings',
            author: 'J.R.R Tolkien',
            year: 1954,
            isComplete: false,
            genre: 'Fantasy',
            sinopsis: 'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.',
            imgLink:'https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif'
        },
        {
            id: +new Date(),
            title: 'The Chronicles of Narnia',
            author: 'C.S Lewis',
            year: 1950,
            isComplete: false,
            genre: 'Fantasy',
            sinopsis: 'The Chronicles of Narnia is a series of fantasy novels by British author C. S. Lewis. Written by Lewis, illustrated by Pauline Baynes, and originally published in London between 1950 and 1956, The Chronicles of Narnia has been adapted for radio, television, the stage, and film.',
            imgLink:'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/The_Chronicles_of_Narnia_box_set_cover.jpg/220px-The_Chronicles_of_Narnia_box_set_cover.jpg'
        },
        {
            id: +new Date(),
            title: 'The Hunger Games',
            author: 'Suzanne Collins',
            year: 2008,
            isComplete: false,
            genre: 'Science Fiction',
            sinopsis: 'The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
            imgLink:'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/The_Hunger_Games_cover.jpg/220px-The_Hunger_Games_cover.jpg'
        },
        {
            id: +new Date(),
            title: 'Harry Potter',
            author: 'J.K Rowling',
            year: 1997,
            isComplete: true,
            genre: 'Fantasy',
            sinopsis: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.',
            imgLink:'https://m.media-amazon.com/images/I/515E2f9WO+L._SY445_SX342_.jpg'
        }
    ]
    storage.setItem('books',JSON.stringify(book))
}
function renderBooks(books){
    const container = document.getElementsByClassName('main-body')[0]
    container.innerHTML = '';
    for (const book of books) { 
        const cardElement = card(book.title,book.author,book.year,book.isComplete,book.genre,book.sinopsis,book.imgLink)
        container.appendChild(cardElement)
    } 
}

let currentSearchResult = [];

function filterAndSortBooks() {
    const filterValue = document.getElementById('filter').value;
    const sortValue = document.getElementById('sort').value;

    let books = (currentSearchResult.length > 0) ? currentSearchResult : JSON.parse(storage.getItem('books'))

    if (filterValue === 'done') {
        filteredBooks = books.filter(book => book.isComplete === true);
    } else if (filterValue === 'undone') {
        filteredBooks = books.filter(book => book.isComplete === false);
    } else filteredBooks = books;

    let sortedBooks = filteredBooks;

    if (sortValue === 'title-asc') {
        sortedBooks = filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'title-desc') {
        sortedBooks = filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortValue === 'author-asc') {
        sortedBooks = filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortValue === 'author-desc') {
        sortedBooks = filteredBooks.sort((a, b) => b.author.localeCompare(a.author));
    } else if (sortValue === 'oldest') {
        sortedBooks = filteredBooks.sort((a, b) => a.year - b.year);
    } else if (sortValue === 'newest') {
        sortedBooks = filteredBooks.sort((a, b) => b.year - a.year);
    }

    renderBooks(sortedBooks);
}

function searchBooks() {
    const searchValue = document.getElementsByClassName('search')[0].value.toLowerCase();
    const books = JSON.parse(storage.getItem('books'));
    currentSearchResult = books.filter(book => {
        return book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue);
    });
    filterAndSortBooks();
}

document.getElementById('filter').addEventListener('change', function () {
    filterAndSortBooks();
});

document.getElementById('sort').addEventListener('change', function () {
    filterAndSortBooks();
});

document.getElementsByClassName('search')[0].addEventListener('input', function () {
    searchBooks();
});


document.querySelectorAll('.button-delete').forEach(deleteButton => {
    deleteButton.addEventListener('click', function() {
        const card = this.closest('.card');
        const cardTitleElement = card.querySelector('.card-title');
        const cardTitle = cardTitleElement.textContent;
        const title = cardTitle.split(' (')[0];
        const books = JSON.parse(storage.getItem('books'));
        const filteredBooks = books.filter(book => book.title !== title);
        storage.setItem('books', JSON.stringify(filteredBooks));
        card.remove();
    });
});

document.getElementsByClassName('button-add')[0].addEventListener('click', function() {
    window.location.href = 'AddBook.html';
})


