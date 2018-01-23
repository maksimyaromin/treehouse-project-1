/*
    Блок объявления глобальных переменных.
    Получение элементов DOM.
*/
var year = document.getElementById("year");
var quteTemplate = document.getElementById("quote-template").innerText;
var generator = document.getElementById("generator");
var content = document.getElementsByClassName("content")[0];
var nextButton = document.getElementById("btnNextQuote");
var quoteIndex = -1;

/*
    Массив с цитатами. В массиве представлены цитаты знаменитых белорусских
    людей. Каждая цитата имеет ссылку на статью о авторе на википедии.
    Некоторые цитаты имеют тэги (для примера).
*/
var quotes = [
    {
        tags: [ "О поэзии", "Рыгор" ],
        text: "Паэт – ён гарыць, як балючы гузак на лобе абражанага народу.",
        cite: "https://en.wikipedia.org/wiki/Ryhor_Baradulin",
        author: "Рыгор Барадулін",
        date: new Date(1956, 11, 31),
        class: "color-1",
        citation: "Ryhor Ivanavič Baradulin was a Belarusian poet, essayist and translator."
    },
    {
        text: "Як ад нараджэньня зьвяры, што ходзяць у пустыні, ведаюць ямы свае; птушкі, што лётаюць у паветры, ведаюць гнёзды свае; рыбы, што плаваюць па моры і ў рэках, чуюць віры свае; пчолы і тым падобныя бароняць вульлі свае, – так і людзі, дзе нарадзіліся і ўскормлены, да таго месца вялікую ласку маюць.",
        cite: "https://en.wikipedia.org/wiki/Francysk_Skaryna",
        author: "Францішак Скарына",
        date: new Date(1552, 1, 29),
        class: "color-2"
    },
    {
        tags: [ "О детях", "О счастье" ],
        text: "Дзеці – усьмешка Божая.",
        cite: "https://en.wikipedia.org/wiki/Uladzimir_Karatkievich",
        author: "Уладзімер Караткевіч",
        date: new Date(1976, 0, 31),
        class: "color-3"
    },
    {
        tags: [ "Рыгор" ],
        text: "Якім бы велічным ні здаваўся трон, усё роўна на ім сядзіць задніца.",
        cite: "https://en.wikipedia.org/wiki/Ryhor_Baradulin",
        author: "Рыгор Барадулін",
        date: new Date(2010, 11, 31),
        class: "color-4",
        citation: "Ryhor Ivanavič Baradulin was a Belarusian poet, essayist and translator."
    },
    {
        tags: [ "Рыгор" ],
        text: "Адчуваю сябе лепш, чым было, але горш, чым хацелася б.",
        cite: "https://en.wikipedia.org/wiki/Ryhor_Baradulin",
        author: "Рыгор Барадулін",
        date: new Date(1987, 11, 31),
        class: "color-5",
        citation: "Ryhor Ivanavič Baradulin was a Belarusian poet, essayist and translator."
    },
    {
        text: "Шчасце можа быць поўным толькі тады, калі ўсе вакол цябе адчуваюць сябе шчаслівымі.",
        cite: "https://en.wikipedia.org/wiki/Yakub_Kolas",
        author: "Якуб Колас",
        date: new Date(1924, 0, 31),
        class: "color-6"
    },
    {
        text: "Перад тварам сьмерці кожны ня рыцар, а толькі пілігрым-вандроўнік.",
        cite: "https://en.wikipedia.org/wiki/Miko%C5%82aj_Krzysztof_%22the_Orphan%22_Radziwi%C5%82%C5%82",
        author: "Макалай Крыштаф Радзівіл Сіротка",
        date: new Date(1616, 2, 28),
        class: "color-7",
        citation: "Ordynat of Nieśwież from 1586"
    }
];

/*
    Функция открывает ссылку на википедию в новой вкладке. Она 
    повешена на обработчик onClick блока с цитатой.
*/
function openLink(url) {
    var wikipedia = window.open(url, "_blank");
    wikipedia.focus();
};

/*
    Функция генерирует случайное число от min (включая) 
    до max (не включая)
*/
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/*
    Функция получает случайную цитату из массива
*/
function getRandomQuote() {
    // Сгенерировать случайный индекс от 0 до размера массива
    var index = generateRandomNumber(0, quotes.length);
    /* Если полученный индекс равен индексу текущей цитаты,
       то сгенерировать индекс ещё раз
    */
    if(quoteIndex === index) {
        return getRandomQuote();
    }
    // Изменить индекс текущей цитаты
    quoteIndex = index;
    return quotes[quoteIndex];
};

/*
    Функция генерирования HTML разметки для цитаты
*/
function generateHTML(quote) {
    // Копирование текста шаблона в новую переменную
    var quoteHTML = quteTemplate;

    /*
        Здесь и далее функцией replace заменяется место специально обозначенного
        блока [block] на содержимое объекта цитаты
    */
    quoteHTML = quoteHTML.replace(/\[id\]/i, "id" + quoteIndex);
    
    if(quote.tags) {
        var tags = "<div class=\"quote__tags\"><ul class=\"tag__list\">";
        for(var i = 0; i < quote.tags.length; i++) {
            tags += `<li class="tag__item">${quote.tags[i]}</li>\n`;
        }
        tags += "</ul></div>"
        quoteHTML = quoteHTML.replace(/\[tags\]/i, tags);
    } else {
        quoteHTML = quoteHTML.replace(/\[tags\]/i, "");
    }

    quoteHTML = quoteHTML.replace(/\[quote\]/i, `"${quote.text}"`);
    quoteHTML = quoteHTML.replace(/\[cite\]/g, quote.cite);
    quoteHTML = quoteHTML.replace(/\[author\]/i, quote.author + ".");

    if(quote.citation) {
        quoteHTML = quoteHTML.replace(/\[citation\]/i, 
            `<span>${quote.citation}</span>`);
    } else {
        quoteHTML = quoteHTML.replace(/\[citation\]/i, "");
    }

    if(quote.date) {
        quoteHTML = quoteHTML.replace(/\[date\]/i, 
            `<div class="quote__date">
                <time datetime="${quote.date.toISOString()}">${quote.date.getFullYear()}</time>
            </div>`);
    } else {
        quoteHTML = quoteHTML.replace(/\[date\]/i, "");
    }

    return quoteHTML;

};

/*
    Функция выводит цитату на экран
*/
function printQuote() {
    // Получить цитату
    var quote = getRandomQuote();
    // Сгенерировать HTML
    var quoteHTML = generateHTML(quote);

    generator.innerHTML = quoteHTML;
    // Изменить цвет фона
    content.className = "content " + quote.class;
};

/*
    Выполнить логику после загрузки окна
*/
window.onload = function() {
    year.innerText = (new Date()).getFullYear();

    printQuote();
    // Обновлять цитату каждые 15 секунд
    var timer = setInterval(printQuote, 15000);


    /* Обработчик нажатия на кнопку "Следующая цитата". Модно было бы конечно
       как в старые-добрые времена обработать ещё и attachEvent, но я думаю
       что в рамках данного проекта это не нужно, все равно вы почти наверняка
       будете запускать этот пример в последнем Хроме
    */
    nextButton.addEventListener("click", function(e) {
        e.preventDefault();
        // Сбросить таймер
        clearInterval(timer);
        printQuote();
        // Запустить обновление цитаты заново после печати новой цитаты
        timer = setInterval(printQuote, 15000);
    });
};