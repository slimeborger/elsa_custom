var sec = document.getElementById("section");
const quoteFileURL = browser.runtime.getURL('quotes.txt');
let quote = ""
let author = "";

async function getQuotes() {
    const response = await fetch(quoteFileURL);
    if (!response.ok) {
        throw new Error("ERROR");
    }
    var text = await response.text();
    var quoteArray = text.split('\n');
    var size = quoteArray.length
    var x = Math.floor(size * Math.random());
    var chosenQuote = quoteArray[x];
    let delimiter = chosenQuote.search('~');
    return {
        quote: chosenQuote.slice(0, delimiter),
        author: chosenQuote.slice(delimiter + 1)
    }
}

(async () => {
    const quoteFile = await getQuotes();
    if (quoteFile !== null) {
        quote = quoteFile.quote;
        author = quoteFile.author

        //document.write('"'+description[x]+'."<br> <div class="author">- '+auth[x]+'</div>');
        sec.appendChild(document.createTextNode(quote));
        let brk = document.createElement('br');
        sec.appendChild(brk);
        let div = document.createElement('div');
        div.className = "author";
        div.appendChild(document.createTextNode('- ' + author));
        sec.appendChild(div);
    } else {
    }
})();


