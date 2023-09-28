const storage = window.localStorage;
const form = document.querySelector('.book-form');

if(localStorage.getItem('book-edit')) {
    const book = JSON.parse(localStorage.getItem('book-edit'));
    form.querySelector('input[name="book-name"]').value = book.title;
    form.querySelector('input[name="author"]').value = book.author;
    form.querySelector('input[name="year"]').value = book.year;
    form.querySelector('input[name="genre"]').value = book.genre;
    form.querySelector('textarea[name="sinopsis"]').value = book.sinopsis;
    form.querySelector('input[name="book-complete"]').checked = book.isComplete;
    form.querySelector('input[name="book-img"]').value = book.imgLink;
    document.querySelector('.aside-image').setAttribute('src', book.imgLink);
    document.querySelector('.button-add').textContent = 'Edit Book';
    document.querySelector('.button-cancel').removeAttribute('hidden');
    
}
function generateId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`;
    return id;
  }
document.querySelector('.button-add').addEventListener('click', function(e) {
    e.preventDefault();
    if(localStorage.getItem('book-edit')){
        const book = JSON.parse(localStorage.getItem('book-edit'));
        const books = JSON.parse(localStorage.getItem('books'));
        const filteredBooks = books.filter(b => b.id !== book.id);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
    }
    const title = form.querySelector('input[name="book-name"]').value;
    const author = form.querySelector('input[name="author"]').value;
    const year = form.querySelector('input[name="year"]').value;
    const genre = form.querySelector('input[name="genre"]').value;
    const sinopsis = form.querySelector('textarea[name="sinopsis"]').value;
    const isComplete = form.querySelector('input[name="book-complete"]').checked;
    const imageLink = form.querySelector('input[name="book-img"]').value;
    
    if(!title || !author || !year || !genre || !sinopsis) {
        alert('Please fill in all fields');
        return;
    }
    const imgLink = (imageLink) ? imageLink : 'https://www.repository2.sttjaffray.ac.id/repository/stfj/lib_cover/na.jpg';
    const book = {
        id: generateId(),
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
        genre: genre,
        sinopsis: sinopsis,
        imgLink: imgLink
        
    }
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = 'Shelf.html'
    if(localStorage.getItem('book-edit')){
        alert('Book edited successfully!');
        localStorage.removeItem('book-edit');
    }else alert('Book added successfully!'); 
})
document.querySelector('.button-cancel').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'Shelf.html'
})