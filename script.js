const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    this.read = read
        ? "has read" : "hasn't read yet";
    // if (read) {
    //     this.read = "has read";
    // }
    // else {
    //     this.read = "hasn't read yet";
    // }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayLibrary(myLibrary);
}

function clearTableBody() {
    const table = document.querySelector(".library");
    const rows = table.querySelectorAll("tr:not(:first-child)"); // Select all rows except the first (header)

    rows.forEach(row => row.remove());
}

function displayLibrary(library) {
    clearTableBody();
    let table = document.querySelector(".library");

    for (let i = 0; i < library.length; i++) {
        let existingRow = table.querySelector(`tr:nth-child(${i + 1})`);

        if (!existingRow || existingRow.cells[0].textContent !== library[i].title) {
            let newRow = table.insertRow(-1);
            newRow.insertCell(0).innerHTML = library[i].title;
            newRow.insertCell(1).innerHTML = library[i].author;

            let pagesCell = newRow.insertCell(2);
            pagesCell.innerHTML = library[i].pages;
            pagesCell.classList.add("pages-column");

            let readCell = newRow.insertCell(3);
            readCell.innerHTML = library[i].read;

            let button = document.createElement("button");
            button.classList.add("tablebutton", "readbutton");
            button.textContent = "Change Status";
            button.addEventListener("click", function () {
                toggleReadStatus(library[i]); // Pass book object
            });
            readCell.appendChild(button);

            newRow.insertCell(4).innerHTML = '<button class="tablebutton" onclick="deleteBook(this)">Delete</button>';
        }
    }
}

function toggleReadStatus(book) {
    if (book.read === "has read") {
        book.read = "hasn't read yet";
    } else {
        book.read = "has read";
    }
    displayLibrary(myLibrary); // Update table with new read status
}

function deleteBook(self) {
    const row = self.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Dialog to add new book
let dialogAddBook = document.querySelector("dialog");

function showDialog() {
    dialogAddBook.showModal();
}

function closeAdd() {
    dialogAddBook.close();
}

// Receive form data and create book object
let formNewBook = document.querySelector("form");
let cancelButton = document.getElementById("cancelAdd");

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialogAddBook.close();
    formNewBook.reset();
})

formNewBook.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab form entries and place in FormData object
    const bookData = new FormData(formNewBook);
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    // Create new book from the FormData object and add to library
    addBookToLibrary(title, author, pages, read);
    dialogAddBook.close();

    formNewBook.reset();
})

addBookToLibrary("The Fix", "David Baldacci", 432, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 309, false);
addBookToLibrary("The Cat In the Hat", "Dr. Seuss", 61, true);

displayLibrary(myLibrary);