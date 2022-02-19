const books = [
  {
    id: '1',
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: '2',
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: '3',
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];
if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(books));
}

const mainRoot = document.querySelector('#root');
const leftDiv = document.createElement('div');
const rightDiv = document.createElement('div');

mainRoot.append(leftDiv, rightDiv);

rightDiv.classList.add('right-area');
leftDiv.classList.add('left-area');

const h2 = document.createElement('h2');
h2.textContent = 'All books';
h2.classList.add('form-title');
const ul = document.createElement('ul');
const addButton = document.createElement('button');
addButton.classList.add('addButton');
addButton.textContent = 'Add';
leftDiv.append(h2, ul, addButton);

const insertUl = document.querySelector('ul');

// if (localStorage.getItem('object')) {
//   createBookMarkup(JSON.parse(localStorage.getItem('object')));
// }

const renderMarkUp = () => {
  const bookMarkUp = JSON.parse(localStorage.getItem('books'))
    .map(
      ({ title, id }) =>
        `<li class='bookList' id='${id}'><p class='bookTitle'>${title}</p><button class='edit-element'>Edit</button><button class='delete-element'>Delete</button></li>`
    )
    .join('');

  insertUl.insertAdjacentHTML('beforeend', bookMarkUp);

  const bookName = document.querySelectorAll('.bookTitle');

  bookName.forEach((element) =>
    element.addEventListener('click', renderPreview)
  );

  const buttonEdit = document.querySelectorAll('.edit-element');
  buttonEdit.forEach((button) => button.addEventListener('click', editBook));

  const buttonDelete = document.querySelectorAll('.delete-element');
  buttonDelete.forEach((buttonDel) =>
    buttonDel.addEventListener('click', deleteBook)
  );
};

const renderPreview = (event) => {
  const bookInf = event.target.textContent;
  const { title, author, img, plot } = JSON.parse(
    localStorage.getItem('books')
  ).find((book) => book.title === bookInf);

  const bookToFind = () => {
    rightDiv.innerHTML = '';
    const bookMarkUp = `<div class='right-div_book-info'><h2 class="form-title">${title}</h2><p class='bookTitle'>${author}</p><img src = '${img}'><p class='bookAbout'>${plot}</p><button class='close-element'>Close</button></div>`;
    rightDiv.insertAdjacentHTML('beforeend', bookMarkUp);
    const closeBtn = document.querySelector('.close-element');
    closeBtn.addEventListener('click', clearInfo);
  };
  // console.log(img);

  bookToFind();
};

function createBookMarkup(object) {
  rightDiv.innerHTML = '';
  const { title, author, img, plot } = object;
  localStorage.setItem('object', JSON.stringify(object));
  rightDiv.insertAdjacentHTML(
    'beforeend',
    `<h2>${title}</h2><p>${author}</p><img src = '${img}'><p>${plot}</p>`
  );
}

const editBook = (event) => {
  const bookToEdit = event.currentTarget.parentNode;
  console.log('edit');
  rightDiv.innerHTML = '';

  const localStorageData = JSON.parse(localStorage.getItem('books'));
  const editBook = localStorageData.find((element) => {
    if (element.id === bookToEdit.id) {
      return element;
    }
  });
  console.log(bookToEdit);
  console.log(editBook);

  rightDiv.insertAdjacentHTML('beforeend', createFormMarkup(editBook));

  formFunctional(editBook);

  const btnEditSave = document.querySelector('.save-btn');
  btnEditSave.addEventListener('click', onBtnEditSaveClick);

  function onBtnEditSaveClick(e) {
    e.preventDefault();

    localStorage.setItem('books', JSON.stringify(localStorageData));
    insertUl.innerHTML = '';
    renderMarkUp();
    createBookMarkup(editBook);
    setTimeout(() => alert('books saccesfull'), 300);
  }
};

const deleteBook = (event) => {
  const bookToDelete = event.currentTarget.parentNode;
  const localData = JSON.parse(localStorage.getItem('books'));
  const bookFind = localData.find((element) => {
    if (element.id === bookToDelete.id) {
      return element;
    }
  });

  const newData = localData.filter((book) => {
    if (book.id !== bookToDelete.id) {
      return book;
    }
  });
  localStorage.setItem('books', JSON.stringify(newData));
  insertUl.innerHTML = '';

  renderMarkUp(newData);

  if (rightDiv.children[0] === undefined) {
    return;
  }

  if (rightDiv.children[0].textContent === bookFind.title) {
    rightDiv.innerHTML = '';
  }
};

renderMarkUp();

addButton.addEventListener('click', onAddClick);

function onAddClick() {
  const newBook = {
    id: `${Date.now()}`,
    title: '',
    author: '',
    img: '',
    plot: '',
  };

  rightDiv.innerHTML = '';

  rightDiv.insertAdjacentHTML('beforeend', createFormMarkup(newBook));

  formFunctional(newBook);

  const btnSave = document.querySelector('.save-btn');
  const input = document.querySelectorAll('input');
  btnSave.addEventListener('click', onBtnSaveClick);

  let formData = {};

  function onBtnSaveClick(e) {
    e.preventDefault();

    input.forEach((el) => {
      if (el.value === '') {
        alert('please');
        return;
      }
    });

    if (newBook.title && newBook.author && newBook.img && newBook.plot) {
      const localStorageData = JSON.parse(localStorage.getItem('books'));
      const newLS = [...localStorageData, newBook];

      localStorage.setItem('books', JSON.stringify(newLS));
      // console.log(localStorageData);
      // console.log(newBook);
      insertUl.innerHTML = '';

      renderMarkUp();
      createBookMarkup(newBook);
      setTimeout(() => alert('book succesfully added'), 300);
    }
  }
}

function createFormMarkup(book) {
  // if (localStorage.removeItem('object')) {
  //   localStorage.removeItem('object')
  // }

  return `
  <div class="container"
  <div class="form">      
      <form class="form-wrap">
      <h2 class="form-title">Login Form</h2>
      <label class="input-box">      
        <input name="title" placeholder="Название книги" type = 'text' value ="${book.title}"/>
      </label>
      <label class="input-box">       
        <input name="author" placeholder="Имя автора" type = 'text' value ='${book.author}'/>
      </label>
      <label class="input-box">      
        <input name="img" placeholder="Ссылка" type = 'text' value ='${book.img}'/>
      </label>
      <label class="input-box">      
        <input name="plot" placeholder="Описание" type = 'text' value ='${book.plot}'/>
      </label>
      <button class='save-btn' type="submit">Save</button>
    </form>
    </div>
    </div>`;
}

function formFunctional(book) {
  // if (book === null) {
  //   return;
  // }
  const input = document.querySelectorAll('input');

  input.forEach((el) => el.addEventListener('change', onInputChange));

  function onInputChange(e) {
    book[e.target.name] = e.target.value;
    console.log(book);
  }
}

function clearInfo(e) {
  rightDiv.innerHTML = '';
}
