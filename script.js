document.getElementById('isbn-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isbn = document.getElementById('isbn').value;
  
  fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
    .then(response => response.json())
    .then(data => {
      const bookInfo = data[`ISBN:${isbn}`];
      const isbnResults = document.getElementById('isbn-results');
      isbnResults.innerHTML = ''; // Önceki sonuçları temizle
      if (bookInfo) {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${bookInfo.title}</h3>
          <p>Yazar: ${bookInfo.authors ? bookInfo.authors.map(author => author.name).join(', ') : 'Bilinmiyor'}</p>
          <p>Yayıncı: ${bookInfo.publishers ? bookInfo.publishers.map(publisher => publisher.name).join(', ') : 'Bilinmiyor'}</p>
          <p>Yayın Tarihi: ${bookInfo.publish_date || 'Bilinmiyor'}</p>
          <button class="btn" onclick="addToLibrary('${bookInfo.title}', '${bookInfo.authors ? bookInfo.authors.map(author => author.name).join(', ') : 'Bilinmiyor'}', '${bookInfo.publishers ? bookInfo.publishers.map(publisher => publisher.name).join(', ') : 'Bilinmiyor'}', '${bookInfo.publish_date || 'Bilinmiyor'}')">Kütüphaneye Ekle</button>
        `;
        isbnResults.appendChild(li);
      } else {
        const li = document.createElement('li');
        li.innerHTML = '<p>Kitap bulunamadı.</p>';
        isbnResults.appendChild(li);
      }
    })
    .catch(error => console.error('Error fetching book data:', error));
});

document.getElementById('manual-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const publisher = document.getElementById('publisher').value;
  const description = document.getElementById('description').value;
  const pdf = document.getElementById('pdf').files[0];
  
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${title}</h3>
    <p>Yazar: ${author}</p>
    <p>Yayınevi: ${publisher}</p>
    <p>Açıklama: ${description}</p>
    ${pdf ? `<p><a href="${URL.createObjectURL(pdf)}" target="_blank">PDF'yi Oku</a></p>` : ''}
    <button class="btn" onclick="addToLibrary('${title}', '${author}', '${publisher}', '${description}', '${pdf ? URL.createObjectURL(pdf) : ''}')">Kütüphaneye Ekle</button>
  `;
  document.getElementById('isbn-results').appendChild(li);

  document.getElementById('manual-form').reset();
});

function addToLibrary(title, author, publisher, description, pdfUrl = '') {
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  bookList.push({ title, author, publisher, description, pdfUrl });
  localStorage.setItem('bookList', JSON.stringify(bookList));
  renderLibrary();
}

function removeFromLibrary(index) {
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  bookList.splice(index, 1);
  localStorage.setItem('bookList', JSON.stringify(bookList));
  renderLibrary();
}

function editBook(index) {
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  const book = bookList[index];
  document.getElementById('edit-title').value = book.title;
  document.getElementById('edit-author').value = book.author;
  document.getElementById('edit-publisher').value = book.publisher;
  document.getElementById('edit-description').value = book.description;
  document.getElementById('edit-form').onsubmit = function(e) {
    e.preventDefault();
    bookList[index] = {
      title: document.getElementById('edit-title').value,
      author: document.getElementById('edit-author').value,
      publisher: document.getElementById('edit-publisher').value,
      description: document.getElementById('edit-description').value,
      pdfUrl: book.pdfUrl
    };
    localStorage.setItem('bookList', JSON.stringify(bookList));
    renderLibrary();
    hideEditForm();
  };
  showEditForm();
}

function renderLibrary() {
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  const bookListElement = document.getElementById('book-list');
  bookListElement.innerHTML = '';
  bookList.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${book.title}</h3>
      <p>Yazar: ${book.author}</p>
      <p>Yayınevi: ${book.publisher}</p>
      <p>Açıklama: ${book.description}</p>
      ${book.pdfUrl ? `<p><a href="${book.pdfUrl}" target="_blank">PDF'yi Oku</a></p>` : ''}
      <button class="red-btn" onclick="removeFromLibrary(${index})">Kitabı Kaldır</button>
      <button class="blue-btn" onclick="editBook(${index})">Kitabı Düzenle</button>
    `;
    bookListElement.appendChild(li);
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
  if (sectionId === 'my-library') {
    renderLibrary();
  }
}

function showEditForm() {
  document.getElementById('edit-book-form').style.display = 'block';
}

function hideEditForm() {
  document.getElementById('edit-book-form').style.display = 'none';
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    themeToggle.style.backgroundColor = 'var(--theme-toggle-bg-night)';
  } else {
    themeToggle.style.backgroundColor = 'var(--theme-toggle-bg-day)';
  }

  const themeIcon = document.getElementById('theme-icon');
  themeIcon.classList.toggle('moon');
  themeIcon.classList.toggle('sun');
}

function changeLanguage() {
  alert('Dil değişimi henüz desteklenmiyor.');
}

function closeBanner() {
  document.getElementById('warning-banner').style.display = 'none';
}

// Başlangıçta tema simgesini ayarla ve kütüphaneyi yükle
document.addEventListener('DOMContentLoaded', () => {
  const themeIcon = document.getElementById('theme-icon');
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.add('sun');
  } else {
    themeIcon.classList.add('moon');
  }
  renderLibrary();
});