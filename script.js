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
  document.getElementById('isbn-results').appendChild(li);

  document.getElementById('manual-form').reset();
});

function addToLibrary(title, author, publisher, description, pdfUrl = '') {
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