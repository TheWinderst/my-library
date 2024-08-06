document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isbn = document.getElementById('isbn').value;
  fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
    .then(response => response.json())
    .then(data => {
      const bookInfo = document.getElementById('book-info');
      bookInfo.innerHTML = '';

      if (data[`ISBN:${isbn}`]) {
        const book = data[`ISBN:${isbn}`];
        const li = document.createElement('li');
        li.textContent = `Title: ${book.title}, Author: ${book.authors.map(author => author.name).join(', ')}, Publisher: ${book.publishers.map(publisher => publisher.name).join(', ')}`;
        bookInfo.appendChild(li);
      } else {
        const li = document.createElement('li');
        li.textContent = 'Book not found';
        bookInfo.appendChild(li);
      }
    })
    .catch(error => {
      console.error('Error fetching book data:', error);
    });

  // Formu temizle
  document.getElementById('book-form').reset();
});
