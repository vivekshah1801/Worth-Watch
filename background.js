// create a menu entry in chrome.
chrome.contextMenus.create({
	'title': 'Is "%s" Worth Watching?',
	'contexts': ['selection'],
	'onclick': async (context) =>  {
        const name = context.selectionText;

        // TODO: Create a button for 'Add to favourite list"
        let response = await fetch(`http://www.omdbapi.com/?apikey=e48e70b4&type=series&t=${name}`);
        response = await response.json();
        let alertText = "No Such Series Found";
        if(response.Response == "True" )
        {
            alertText = "";
            if(response.Title)
                alertText += `Series : ${response.Title}\r\n`;
            if(response.Year)
            {
                ryear = response.Year.split("–")[0];
                alertText += `Released year : ${ryear}\r\n`;
            }
            if(response.imdbRating && response.imdbRating != "N/A")
                alertText += `IMDB rating : ${response.imdbRating}\r\n`;
            else
                alertText += `IMDB rating NOT available.\r\n`;
        }
        
		alert(alertText);
	}
});