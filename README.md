# Library Application

## Overview
This web application creates a personal book library management system that enables users to track their reading collection with a clean, intuitive interface. The application is built with vanilla JavaScript, HTML, and CSS, requiring no external frameworks or dependencies.

## Features
- **Add new books:** Enter book details (title, author, page count, read status) through a modal form
- **View book collection:** See all your books displayed in a well-organized table format
- **Update read status:** Toggle whether you've read each book with a single click
- **Remove books:** Delete books from your collection when needed
- **Persistent display:** Books remain visible in your browser tab until refresh

## How It Works
1. The application uses a JavaScript class-based approach to create and manage book objects
2. Book data is stored in memory within an array (no persistence between sessions)
3. The interface updates dynamically as you add, modify, or remove books
4. A modal dialog provides a clean form experience for adding new books

## Project Structure
- **index.html** - Core structure and interface elements
- **styles.css** - Visual styling and responsive design
- **script.js** - Application logic and functionality

## Installation Instructions
1. Clone this repository to your local machine
2. Open index.html in any modern web browser
3. Alternatively, access the deployed version at https://renoldthomas.github.io/Library

## Future Enhancements
- Local storage implementation for data persistence between sessions
- Sorting and filtering capabilities
- Book search functionality
- Rating system for books
- Book cover image support

## Author
Renold T (@renold)