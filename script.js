document.getElementById('isbn-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isbn = document.getElementById('isbn').value;
  
  fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
    .then(response => response.json())
    .then(data => {
      const bookInfo = data[`ISBN:${isbn}`];
      if (bookInfo) {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${bookInfo.title}</h3>
          <p>Yazar: ${bookInfo.authors.map(author => author.name).join(', ')}</p>
          <p>Yayıncı: ${bookInfo.publishers.map(publisher => publisher.name).join(', ')}</p>
          <p>${bookInfo.publish_date}</p>
          <button class="btn" onclick="addToLibrary('${bookInfo.title}', '${bookInfo.authors.map(author => author.name).join(', ')}', '${bookInfo.publishers.map(publisher => publisher.name).join(', ')}', '${bookInfo.publish_date}')">Kütüphaneye Ekle</button>
        `;
        document.getElementById('isbn-results').appendChild(li);
      } else {
        alert('Kitap bulunamadı.');
      }
    });
});

document.getElementById('manual-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const description = document.getElementById('description').value;
  const pdf = document.getElementById('pdf').files[0];
  
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${title}</h3>
    <p>Yazar: ${author}</p>
    <p>Açıklama: ${description}</p>
    ${pdf ? `<p><a href="${URL.createObjectURL(pdf)}" target="_blank">PDF'yi Oku</a></p>` : ''}
    <button class="btn" onclick="addToLibrary('${title}', '${author}', '', '${description}', '${pdf ? URL.createObjectURL(pdf) : ''}')">Kütüphaneye Ekle</button>
  `;
  document.getElementById('book-list').appendChild(li);

  document.getElementById('manual-form').reset();
});

function addToLibrary(title, author, publisher, description, pdfUrl) {
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${title}</h3>
    <p>Yazar: ${author}</p>
    <p>Yayıncı: ${publisher}</p>
    <p>Açıklama: ${description}</p>
    ${pdfUrl ? `<p><a href="${pdfUrl}" target="_blank">PDF'yi Oku</a></p>` : ''}
  `;
  document.getElementById('book-list').appendChild(li);
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  
  const themeIcon = document.getElementById('theme-icon');
  if (body.classList.contains('dark-theme')) {
    themeIcon.src = 'sun.svg';
  } else {
    themeIcon.src = 'moon.svg';
  }
}

function changeLanguage() {
  alert('Dil değişimi henüz desteklenmiyor.');
}

function closeBanner() {
  document.getElementById('warning-banner').style.display = 'none';
}