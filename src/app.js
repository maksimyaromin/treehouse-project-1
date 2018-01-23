/*
    Global variables declaration block.
    DOM elements receiving.
*/
var year = document.getElementById("year");
var quteTemplate = document.getElementById("quote-template").innerText;
var generator = document.getElementById("generator");
var content = document.getElementsByClassName("content")[0];
var nextButton = document.getElementById("btnNextQuote");
var quoteIndex = -1;

/*
    Quote array. An array contains quotes of famous Belorussian people. 
	Each quote has a reference to a wiki article about the author.
    Certain quotes have tags (as an example).
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
    Function opens wiki page reference in a new tab. 
	It is executed by a handler onClick of the quote block.
*/
function openLink(url) {
    var wikipedia = window.open(url, "_blank");
    wikipedia.focus();
};

/*
    Function generates random numbers from min (including) 
    to max (excluding)
*/
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/*
    Function receives  a random quote out of the array
*/
function getRandomQuote() {
    // Generate a random index from 0 to array size
    var index = generateRandomNumber(0, quotes.length);
    /* Whether received index equals current quote index
       an index should be regenerated
    */
    if(quoteIndex === index) {
        return getRandomQuote();
    }
    // Change current index quote
    quoteIndex = index;
    return quotes[quoteIndex];
};

/*
    HTML markup generation function for a quote 
*/
function generateHTML(quote) {
    // Template text copying in a new variable
    var quoteHTML = quteTemplate;

    /*
        Here and after replace function replaces specified 
		block [block] with quote object content 
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
    Function displays a quote 
*/
function printQuote() {
    // Get a quote
    var quote = getRandomQuote();
    // Generate HTML
    var quoteHTML = generateHTML(quote);

    generator.innerHTML = quoteHTML;
    // Change background color
    content.className = "content " + quote.class;
};

/*
    Execute logics after window onload 
*/
window.onload = function() {
    year.innerText = (new Date()).getFullYear();

    printQuote();
    // Quote updates every 15 seconds
    var timer = setInterval(printQuote, 15000);


    /* Button "Next quote" click handler. 
       For old time's sake it could probably be handled also by attachEvent.  
       But I consider it is of less importance under that project as far as you most certainly  
       would run this work in Chrome recent version.
    */
    nextButton.addEventListener("click", function(e) {
        e.preventDefault();
        // Clear timer
        clearInterval(timer);
        printQuote();
        // Restart quote update after new quote print
        timer = setInterval(printQuote, 15000);
    });
};