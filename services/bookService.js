import db from './db.js';
import storageService from './storageService.js';
export default {
  query,
  remove,
  getById,
  save,
  getBookRating,
  removeReview,
  saveBooksFromAPI,
  saveBookFromAPI,
  checkBookFromAPI,
  getNextPrevBooks,
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

function getBookRating(book) {
  const { reviews } = book;
  if (reviews === undefined) return 0;
  if (reviews.length > 0) {
    let count = 0;
    for (let i = 0; i < reviews.length; i++) {
      count += +reviews[i].rate;
    }
    const avg = count / reviews.length;
    let res = (avg * 100) / 5;
    return res;
  } else return 0;
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

function getById(bookId) {
  const book = gBooks.find((book) => book.id === bookId);
  return Promise.resolve(book);
}

function getNextPrevBooks(bookId) {
  const currentBookIdx = _getIdxById(bookId);
  const prevBookIdx = currentBookIdx - 1;
  const nextBookIdx = currentBookIdx + 1;
  if (prevBookIdx < 0)
    return {
      nextId: gBooks[nextBookIdx].id,
      prevId: bookId,
    };
  if (nextBookIdx === gBooks.length)
    return {
      nextId: bookId,
      prevId: gBooks[prevBookIdx].id,
    };
  else {
    return {
      nextId: gBooks[nextBookIdx].id,
      prevId: gBooks[prevBookIdx].id,
    };
  }
}

function _getIdxById(bookId) {
  return gBooks.findIndex((book) => book.id === bookId);
}
