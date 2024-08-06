document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isbn = document.getElementById('isbn').value;
  const title = document.getElementById('title').value || '';
  const author = document.getElementById('author').value || '';
  const description = document.getElementById('description').value || '';
  const pdf = document.getElementById('pdf').files[0];
  
  if (isbn) {
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
      .then(response => response.json())
      .then(data => {
        const bookInfo = data[`ISBN:${isbn}`];
        if (bookInfo) {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${bookInfo.title || title}</h3>
            <p>Author: ${bookInfo.authors ? bookInfo.authors.map(author => author.name).join(', ') : author}</p>
            <p>Description: ${bookInfo.publishers ? bookInfo.publishers.map(publisher => publisher.name).join(', ') : description}</p>
            ${pdf ? `<p><a href="${URL.createObjectURL(pdf)}" target="_blank">Read PDF</a></p>` : ''}
          `;
          document.getElementById('book-list').appendChild(li);
        }
      });
  } else {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${title}</h3>
      <p>Author: ${author}</p>
      <p>Description: ${description}</p>
      ${pdf ? `<p><a href="${URL.createObjectURL(pdf)}" target="_blank">Read PDF</a></p>` : ''}
    `;
    document.getElementById('book-list').appendChild(li);
  }

  document.getElementById('book-form').reset();
});

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

function changeLanguage() {
  alert('Dil değişimi henüz desteklenmiyor.');
}

function closeBanner() {
  document.getElementById('warning-banner').style.display = 'none';
}