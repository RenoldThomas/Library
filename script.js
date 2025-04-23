// Array to store all book objects in the library
const myLibrary = [];

/**
 * Book class - Creates book objects with consistent structure
 * @class
 * Contains properties for title, author, page count, and read status
 */
class Book {
    /**
     * @constructor
     * @param {string} title - The title of the book
     * @param {string} author - The author of the book
     * @param {number} pages - Number of pages in the book
     * @param {boolean} read - Whether the book has been read (true/false)
     */
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? "Read" : "Not read"; // Converts boolean to display string
    }
}

/**
 * Creates a new book object and adds it to the library array
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} pages - Number of pages in the book
 * @param {boolean} read - Whether the book has been read
 */
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayLibrary(myLibrary); // Update the display with the new book
}

/**
 * Removes all book rows from the table to prepare for redrawing
 * Preserves the header row by not selecting it
 */
function clearTableBody() {
    const table = document.querySelector(".library");
    const rows = table.querySelectorAll("tr:not(:first-child)"); // Select all rows except the header

    rows.forEach(row => row.remove());
}

/**
 * Renders the library array to the DOM as table rows
 * @param {Array} library - Array of book objects to display
 */
function displayLibrary(library) {
    clearTableBody(); // Remove existing rows before redrawing
    let table = document.querySelector(".library");

    // Loop through each book in the library array
    for (let i = 0; i < library.length; i++) {
        // Check if row already exists with this book (optimization)
        let existingRow = table.querySelector(`tr:nth-child(${i + 1})`);

        // Create a new row if needed
        if (!existingRow || existingRow.cells[0].textContent !== library[i].title) {
            let newRow = table.insertRow(-1); // Add row at the end
            
            // Insert book details into cells
            newRow.insertCell(0).innerHTML = library[i].title;
            newRow.insertCell(1).innerHTML = library[i].author;

            // Page count cell with right alignment
            let pagesCell = newRow.insertCell(2);
            pagesCell.innerHTML = library[i].pages;
            pagesCell.classList.add("pages-column");

            // Read status cell with toggle button
            let readCell = newRow.insertCell(3);
            readCell.innerHTML = library[i].read;

            // Create button to toggle read status
            let button = document.createElement("button");
            button.classList.add("tablebutton", "readbutton");
            button.textContent = "Change Status";
            button.addEventListener("click", function () {
                toggleReadStatus(library[i]); // Pass book object reference
            });
            readCell.appendChild(button);

            // Add delete button
            newRow.insertCell(4).innerHTML = '<button class="tablebutton" onclick="deleteBook(this)">Delete</button>';
        }
    }
}

/**
 * Toggles the read status of a book between "Read" and "Not read"
 * @param {Object} book - The book object to modify
 */
function toggleReadStatus(book) {
    if (book.read === "Read") {
        book.read = "Not read";
    } else {
        book.read = "Read";
    }
    displayLibrary(myLibrary); // Refresh the display
}

/**
 * Removes a book row from the DOM when delete button is clicked
 * Note: This only removes from display, not from the myLibrary array
 * @param {HTMLElement} self - The button element that was clicked
 */
function deleteBook(self) {
    const row = self.parentNode.parentNode;
    row.parentNode.removeChild(row);
    // TODO: Also remove from myLibrary array to fully delete the book
}

// Get reference to the dialog element
let dialogAddBook = document.querySelector("dialog");

/**
 * Opens the dialog modal for adding a new book
 */
function showDialog() {
    dialogAddBook.showModal();
}

/**
 * Closes the add book dialog
 */
function closeAdd() {
    dialogAddBook.close();
}

// Get form element and cancel button references
let formNewBook = document.querySelector("form");
let cancelButton = document.getElementById("cancelAdd");

// Set up event listener for cancel button
cancelButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    dialogAddBook.close(); // Close the dialog
    formNewBook.reset(); // Clear form fields
})

// Set up event listener for form submission
formNewBook.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get values from form fields
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    // Create new book using the form values
    addBookToLibrary(title, author, pages, read);
    dialogAddBook.close(); // Close dialog after submission

    formNewBook.reset(); // Clear form for next use
})

// Add initial sample books to the library
addBookToLibrary("The Fix", "David Baldacci", 432, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 309, false);
addBookToLibrary("The Cat In the Hat", "Dr. Seuss", 61, true);

// Display the initial library contents
displayLibrary(myLibrary);