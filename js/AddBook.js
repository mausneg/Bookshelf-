const storage = window.localStorage;
const form = document.querySelector('.book-form');

document.querySelector('.button-add').addEventListener('click', function(e) {
    e.preventDefault();

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
        id: +new Date(),
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
    alert('Book added successfully!'); 
})