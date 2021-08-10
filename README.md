# Parcel boilerplate

## Скрытые файлы

Включите отображение скрытых файлов и папок в проводнике своей операционной системы, иначе вы не
сможете выбрать и скопировать себе файлы настроек проекта, имена которых начинаются с точки.

## Зависимости

На компьютере должена быть установлена LTS-версия [Node.js](https://nodejs.org/en/) со всеми
дополнительными инструментами кроме **Chocolatey** - его ставить не нужно.

## Перед началом работы

Один раз на проект установить все зависимости.

```shell
npm ci
```

### Разработка

Запустить режим разработки.

```shell
npm run dev
```

Во вкладке браузера перейти по адресу [http://localhost:1234](http://localhost:1234).

### Деплой

Сборка будет автоматически собирать и деплоить продакшен версию проекта на GitHub Pages, в ветку
`gh-pages`, каждый раз когда обновляется ветка `main`. Например, после прямого пуша или принятого
пул-реквеста. Для этого необходимо в файле `package.json` отредактировать поле `homepage` и скрипт
`build`, заменив `имя_пользователя` и `имя_репозитория` на свои.

```json
"homepage": "https://имя_пользователя.github.io/имя_репозитория",
"scripts": {
  "build": "parcel build src/*.html --public-url /имя_репозитория/"
},
```

На всякий случай стоит зайти в настройки репозитория `Settings` > `Pages` и убедиться что продакшен
версии файлов раздаются из папки `/root` ветки `gh-pages`.

Через какое-то время живую страницу можно будет посмотреть по адресу указанному в отредактированном
свойстве `homepage`, например
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Файлы и папки

- Все паршалы файлов стилей должны лежать в папке `src/sass` и импортироваться в
  `src/sass/main.scss`
- Изображения добавляйте в папку `src/images`, заранее оптимизировав их. Сборщик просто копирует
  используемые изображения чтобы не нагружать систему оптимизацией картинок, так как на слабых
  компьютерах это может занять много времени.

Модалка

- должна центрироваться по открытому экрану, а не привязана к верху
- при скролле фон не должен прокручиваться
-
- почему-то оверлей выше модалки - модалка закрывается от клика куда угодно

Данные для карточки в модалке:

- картинка - {{poster_path}}
- название фильма - {{title}}
- Vote
- Votes
- popularity
- original title
- genre {{genre_ids}}
- about

<div class="backdrop is-hidden">
    <div class="modal is-hidden">
        <div class="modal__thumb">
            <img class="modal__image" src="./images/modal_desktop.jpg" alt="1">
        </div>
        <div class="modal__info">
            <h2 class="modal__title">A FISTFUL OF LEAD</h2>
            <div class="modal__wrapper">
                <ul class="modal__properties">
                    <li class="modal__item">Vote / Votes</li>
                    <li class="modal__item">Popularity</li>
                    <li class="modal__item">Original Title</li>
                    <li class="modal__item">Genre</li>
                </ul>
                <ul class="modal__values">
                    <li class="modal__item"> <span class="modal__values--color">7.3</span>/ 1260</li>
                    <li class="modal__item">100.2</li>
                    <li class="modal__item">A FISTFUL OF LEAD</li>
                    <li class="modal__item">Western</li>
                </ul>
            </div>
            <p class="modal__subtitle">ABOUT</p>
            <p class="modal__text">Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most
                corrupt settlement of the
                gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out
                in the
                abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the
                very same
                bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead...
                they’ve
                been double crossed – but by who and how?</p>
            <div class="modal__button-list">
                <div>
                    <button type="submit" class="modal__button">add to watched</button>
                </div>
                <div>
                    <button type="submit" class="modal__button modal__button--active">add to queue</button>
                </div>
            </div>
            <button class="button-close" data-modal-close>
                <svg class="button-close--size">
                    <use class="button-close--color" href="./images/icons.svg#icon-close"></use>
                </svg>
            </button>
        </div>
    </div>
</div>
