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

function displayLibrary(library) {
    let table = document.querySelector(".library");
    for (let i = 0; i < library.length; i++) {
        let newRow = table.insertRow(-1);
        newRow.insertCell(0).innerHTML = library[i].title;
        newRow.insertCell(1).innerHTML = library[i].author;
        newRow.insertCell(2).innerHTML = library[i].pages;
        newRow.insertCell(3).innerHTML = library[i].read;
    }

    // Select all the cells in the table
    const cells = table.querySelectorAll('td');

    // Iterate over the cells and right-align the third column
    for (let i = 0; i < cells.length; i++) {
        // Target every fourth cell starting from the third one (index 2)
        if (i % 4 === 2) {
            cells[i].style.textAlign = "right";
        }
    }
}

addBookToLibrary("thefix", "david baldacci", 324, "yes");
addBookToLibrary("harrypotter", "jkrowling", 500, "no");
addBookToLibrary("cat in the hat", "DR. Seuss", 38, "yes");

displayLibrary(myLibrary);