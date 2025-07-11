const API_URL = 'http://localhost:4000/api/books';

const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const bookList = document.getElementById('book-list');

let editingId = null;

async function loadBooks() {
    const res = await fetch(API_URL);
    const books = await res.json();
    renderBooks(books);
}

function renderBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div>
        <strong>${book.title}</strong> by ${book.author} (${book.year})
      </div>
      <div>
        <button onclick="editBook('${book.id}')">Edit</button>
        <button onclick="deleteBook('${book.id}')">Delete</button>
      </div>
    `;
        bookList.appendChild(li);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const book = {
        title: titleInput.value,
        author: authorInput.value,
        year: parseInt(yearInput.value)
    };

    if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        editingId = null;
        form.querySelector('button').textContent = 'Add Book';
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
    }

    form.reset();
    loadBooks();
});

window.editBook = async (id) => {
    const res = await fetch(API_URL);
    const books = await res.json();
    const book = books.find(b => b.id === id);
    if (!book) return;

    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year;
    editingId = id;
    form.querySelector('button').textContent = 'Update Book';
};

window.deleteBook = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadBooks();
};

loadBooks();
