const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (read.toLowerCase() === "yes") {
        this.read = "has read";
    }
    else {
        this.read = "hasn't read yet";
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

