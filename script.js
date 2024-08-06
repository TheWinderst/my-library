document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const li = document.createElement('li');
  li.textContent = `Title: ${title}, Author: ${author}, ISBN: ${isbn}`;
  document.getElementById('book-list').appendChild(li);

  // Formu temizle
  document.getElementById('book-form').reset();
});