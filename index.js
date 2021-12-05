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

const mainRoot = document.querySelector('#root');
const leftDiv = document.createElement('div');
const rightDiv = document.createElement('div');

mainRoot.append(leftDiv, rightDiv);

rightDiv.classList.add('right-area');
leftDiv.classList.add('left-area');
const h2 = document.createElement('h2');
h2.textContent = 'Заголовок';
const ul = document.createElement('ul');
const addButton = document.createElement('button');
addButton.textContent = 'add';
leftDiv.append(h2, ul, addButton);

const insertUl = document.querySelector('ul');

const renderMarkUp = () => {
  const bookMarkUp = books
    .map(
      ({ title, id }) =>
        `<li id='${id}'><p class='bookTitle'>${title}</p><button class='edit-element'>Edit</button><button class='delete-element'>Delete</button></li>`
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
  const bookInf = event.currentTarget.textContent;
  const { title, author, img, plot } = books.find(
    (book) => book.title === bookInf
  );

  const bookToFind = () => {
    rightDiv.innerHTML = '';
    const bookMarkUp = `<h2>${title}</h2><p>${author}</p><img src = '${img}'><p>${plot}</p><button>Save</button>`;
    rightDiv.insertAdjacentHTML('beforeend', bookMarkUp);
  };

  bookToFind();
};

const editBook = () => {
  console.log('edit');
};

const deleteBook = (event) => {
  const bookToDelete = event.currentTarget.parentNode;
  const bookFind = books.find((element) => element.id === bookToDelete.id);

  if (rightDiv.children[0].textContent === bookFind.title) {
    rightDiv.innerHTML = '';
  }

  // arrayOfLi.filter((element) => element !== event.currentTarget.id);
};

renderMarkUp();

console.log(mainRoot);
