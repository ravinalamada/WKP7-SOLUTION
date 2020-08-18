let books = [];

// add an element to the list with the form
// The element is added on the list
// reset the form after submission
// Not add an empty element
// delete an element
// edit the state of an element
// save new element to local storage
// save the new state of object in local storage
// form validation?

const tableList = document.querySelector('tbody');
const form = document.querySelector('form')
const showBooks = () => {
  const html = books.map(book => {
    return `
      <tr>
        <td class="left">${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.pages}</td>
        <td>
          <button class="check"aria-label="Update read attribute of ${book.title}" value="${book.id}">
            <img
            ${book.read ? "" : "hidden"}
            src="./assets/icons/checked.svg"
            alt="the book ${book.title} is read"/>
            <img ${book.read ? "hidden" : ""}
            src="./assets/icons/unchecked.svg"
            alt="the book ${book.title} is not read yet"/>
          </button>
        </td>
        <td>
          <button class="delete" aria-label="Delete book ${book.title}" value="${book.id}">
            <img src="./assets/icons/trash.svg"
            alt="Delete ${book.title} from the list"/>
          </button>
        </td>
      </tr>
    `
  }).join('');
  tableList.innerHTML = html;
};showBooks();

const addBook = e => {
  e.preventDefault();
  const formEl = e.currentTarget;
  const newBook = {
    title: formEl.title.value,
    author: formEl.author.value,
    genre: formEl.genre.value,
    pages: formEl.pages.value,
    read: formEl.read.value === "true",// true or false
    id: Date.now(),
  };
  books.push(newBook);
  tableList.dispatchEvent(new CustomEvent('listUpdated'));
  formEl.reset();
};

const handleClick = e => {
  console.log(e.target);
  // update read attribute
  const checkBtn = e.target.closest('button.check')
  if(checkBtn) {
    console.log('update that book please');
    const id = Number(checkBtn.value);
    updateRead(id);
  };
  // delete book
  const deleteBtn = e.target.closest('button.delete');
  if(deleteBtn) {
    console.log('update that book please');
    const id = Number(deleteBtn.value);
    deleteBook(id);
  };
};

const deleteBook = idToDelete => {
  books = books.filter(book => book.id !== idToDelete);
  tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

const updateRead = idFromTheButton => {
  const bookToUpdate = books.find(book => book.id === idFromTheButton);
  // object and arrays are passed by reference (and not by value)
  bookToUpdate.read = !bookToUpdate.read;
  // if we updated it here, it will also update to
  tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

//When we reload, we want to look inside the local storage and put

const initLocalStorage = () => {
  const booksLs = JSON.parse(localStorage.getItem('books'));
  if(booksLs) {
    books = booksLs;
  }
  tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

// we want to update the local storage each time we update delete
const updateLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

form.addEventListener('submit', addBook);
tableList.addEventListener('listUpdated', showBooks);
window.addEventListener('DOMContentLoaded', showBooks);
tableList.addEventListener('click', handleClick);

initLocalStorage();
