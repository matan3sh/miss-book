import db from './db.js';
import storageService from './storageService.js';
export default {
  query,
  remove,
  getById,
  save,
  removeReview,
  saveBooksFromAPI,
  saveBookFromAPI,
  checkBookFromAPI,
};

const KEY = 'books';
const API_KEY = 'booksAPI';
var gBooks = null;
_createBooks();

function _createBooks() {
  const defaultData = db.getDefaultData();
  gBooks = storageService.load(KEY, defaultData);
  storageService.store(KEY, gBooks);
}

function query(filterBy) {
  let books = gBooks;
  if (filterBy) {
    let { title, maxPrice, minPrice } = filterBy;
    maxPrice = maxPrice || Infinity;
    minPrice = minPrice || 0;
    books = gBooks.filter(
      (book) =>
        book.title.includes(title) &&
        book.listPrice.amount < maxPrice &&
        book.listPrice.amount > minPrice
    );
  }
  return Promise.resolve(books);
}

function save(book) {
  if (book.id) {
    const bookIdx = _getIdxById(book.id);
    gBooks[bookIdx] = book;
  } else {
    gBooks.push(book);
  }
  storageService.store(KEY, gBooks);
}

function checkBookFromAPI(bookId) {
  let res = true;
  gBooks.forEach((book) => {
    if (book.id === bookId) res = false;
  });
  return res;
}

function saveBookFromAPI(book) {
  gBooks.push(book);
  storageService.store(KEY, gBooks);
}

function saveBooksFromAPI(books) {
  storageService.store(API_KEY, books);
}

function getById(bookId) {
  const book = gBooks.find((book) => book.id === bookId);
  return Promise.resolve(book);
}

function remove(bookId) {
  const bookIdx = _getIdxById(bookId);
  gBooks.splice(bookIdx, 1);
  storageService.store(KEY, gBooks);
  return Promise.resolve();
}

function removeReview(book, reviewId) {
  const updatedReviews = book.reviews.filter(
    (review) => review.id !== reviewId
  );
  book.reviews = updatedReviews;
  const bookIdx = _getIdxById(book.id);
  gBooks[bookIdx] = book;
  storageService.store(KEY, gBooks);
  return Promise.resolve();
}

function _getIdxById(bookId) {
  return gBooks.findIndex((book) => book.id === bookId);
}
