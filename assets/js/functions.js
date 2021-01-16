////////////////////////////////// Copy formatted code adapted from https://jsfiddle.net/Loilo/xymhgLjc/4/

// This is the actual copy function.
// It expects an HTML string to copy as rich text.

function copyFormatted (rtjson, html) {
  // Remove CopyDIV if it exists
  try {
    document.getElementById("CopyDIV").remove()
  } catch (error) {
    // do nothing
  }

  // Create an iframe (isolated container) for the HTML
  var container = document.getElementById("container")
  container.innerHTML="container"
  var divToCopy = document.createElement('div')
  divToCopy.id = "CopyDIV"
  
  divToCopy.setAttribute("data-reddit-rtjson", rtjson)
  
  divToCopy.innerHTML = html
  
  container.appendChild(divToCopy)
  
  // Detect all style sheets of the page
  var activeSheets = Array.prototype.slice.call(document.styleSheets)
    .filter(function (sheet) {
      return !sheet.disabled
  })

  // Copy to clipboard
  window.getSelection().removeAllRanges()
  
  var range = document.createRange()
  range.selectNode(container)
//  range.selectNodeContents(container.childNodes[0])
  
  window.getSelection().addRange(range)

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy command 1 was ' + msg + " code = " + successful);
  } catch(err) {
    console.log('Oops, unable to copy');
  }

  for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy command 2 was ' + msg + " code = " + successful);
  } catch(err) {
    console.log('Oops, unable to copy');
  }

  for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false
}


// Create nice animation on copy button click
document.querySelector('#copy').onclick = function () {
  var animatedClone = this.cloneNode(true)
  animatedClone.classList.add('fading')
  animatedClone.addEventListener('animationend', function () {
      animatedClone.parentNode.removeChild(animatedClone)
  })
  this.parentNode.appendChild(animatedClone)
  
  var contents = window.editor.getData()
  var div = document.getElementById("copy-space")

  div.innerHTML = contents
  
  table = div.getElementsByTagName("table")[0]

  if (!table) {
	  alert("No table found")
	  return 
  }

  result = tableToJson(table)    //.replace('"', '&quot;')
  
  contents = "<table>" + table.innerHTML + "</table>" 

  copyFormatted(result, contents)
}

// Create nice animation on refresh button click
document.querySelector('#refresh').onclick = function () {
  var animatedClone = this.cloneNode(true)
  animatedClone.classList.add('fading')
  animatedClone.addEventListener('animationend', function () {
    animatedClone.parentNode.removeChild(animatedClone)
  })
  this.parentNode.appendChild(animatedClone)
    
  var contents = window.editor.setData("")
}

///////////////////// End copy formatted code from https://jsfiddle.net/Loilo/xymhgLjc/4/


// The code triggers when a copy event fires
// This is needed to be able to call the setData method

document.addEventListener('copy', function (e){
  var textString = '';
  var data = e.clipboardData;
  var copyDIV = document.getElementById("CopyDIV");


  var trList = copyDIV.childNodes[0].childNodes[0];

  for (var i=0;i<trList.childElementCount;i++) {
    // Insert row number column
    var x = trList.childNodes[i].insertCell(0);
    x.innerHTML=i+1

    var formatting = '';
    for (var j=0;j<trList.childNodes[i].childElementCount;j++) {
      // console.log("(" + i + ", "+ j + ") => " + trList.childNodes[i].childNodes[j].innerText);
      // get innerText and escape characters that can be interpreted as MarkDown
      textString += '|' + trList.childNodes[i].childNodes[j].innerText.replace(/([\[\]\*\^\`\~])/g, '\\$1');
      formatting += '|:-';  // align left
    }
    textString += '|\n';
    if (i==0) {
      textString += formatting + '|\n';
    }
  }

  textString += '\n^Table ^formatting ^brought ^to ^you ^by ^[ExcelToReddit](https://xl2reddit.github.io/)\n'

  var htmlString = copyDIV.parentNode.innerHTML;
  var htmlFooter ='<div class="" data-block="true" data-editor="037dd9" data-offset-key="79scj-0-0"><div data-offset-key="79scj-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="79scj-0-0" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">Table</span></span><span data-offset-key="79scj-0-1"><span data-text="true"> </span></span><span data-offset-key="79scj-0-2" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">formatting</span></span><span data-offset-key="79scj-0-3"><span data-text="true"> </span></span><span data-offset-key="79scj-0-4" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">brought</span></span><span data-offset-key="79scj-0-5"><span data-text="true"> </span></span><span data-offset-key="79scj-0-6" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">to</span></span><span data-offset-key="79scj-0-7"><span data-text="true"> </span></span><span data-offset-key="79scj-0-8" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">you</span></span><span data-offset-key="79scj-0-9"><span data-text="true"> </span></span><span data-offset-key="79scj-0-10" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">by</span></span><span data-offset-key="79scj-0-11"><span data-text="true"> </span></span><span><a href="https://xl2reddit.github.io/" class="_1FRfMxEAy__7c8vezYv9qP"><span data-offset-key="79scj-1-0" style="position: relative; top: -0.4em; font-size: 0.7em; line-height: 0.7em;"><span data-text="true">ExcelToReddit</span></span></a></span></div></div>'

  data.setData('text/plain', textString);
  data.setData('text/html', htmlString + htmlFooter);
  e.preventDefault();
});





function tableToJson(table) { 
	var blocks = []; 
	
	// go through cells 
	for (var i=0; i<table.rows.length; i++) { 
		var tableRow = table.rows[i]; 

		var block = {}; 
		var colCount = tableRow.cells.length
		for (var j=0; j<colCount; j++) { 
			var text = tableRow.cells[j].innerText 
			var key = Math.random().toString(36).substring(2, 7)	// generate a 5 character random key
  		block = {
				"key": key,
				"text": text,
				"type": "table-cell",
				"depth": 0,
				"inlineStyleRanges": [],
				"entityRanges": [],
				"data": {
					"colCount": colCount,
					"colIndex": j,
					"rowIndex": i
				}
      }
    
			blocks.push(block)
		} 
	} 
  
  blocks.push({
    "key": "ei81j",
    "text": "Table formatting brought to you by ExcelToReddit",
    "type": "unstyled",
    "inlineStyleRanges": [{
            "offset": 0,
            "length": 5,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 6,
            "length": 10,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 17,
            "length": 7,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 25,
            "length": 2,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 28,
            "length": 3,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 32,
            "length": 2,
            "style": "SUPERSCRIPT"
        }, {
            "offset": 35,
            "length": 13,
            "style": "SUPERSCRIPT"
        }
    ],
    "entityRanges": [{
            "offset": 35,
            "length": 13,
            "key": 0
        }
    ],
    "data": {}
  })
    
 	var fullObject = {
		"entityMap": {
      "0": {
          "type": "LINK",
          "mutability": "MUTABLE",
          "data": {
              "url": "https://xl2reddit.github.io/"
          }
      }
    },
		"blocks": blocks
  }
 	
	return JSON.stringify(fullObject)
}

// Create the ckeditor 5 instance
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
		toolbar: [  ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );


// Initialize GDPR cookie warning
/*gdprCookieNotice({
  locale: 'en', //This is the default value
  timeout: 500, //Time until the cookie bar appears
  expiration: 30, //This is the default value, in days
  domain: 'tirlibibi17.github.io', //If you run the same cookie notice on all subdomains, define the main domain starting with a .
  implicit: true, //Accept cookies on scroll
  statement: 'https://google.com', //Link to your cookie statement page
//  performance: ['JSESSIONID'], //Cookies in the performance category.
  analytics: ['ga'], //Cookies in the analytics category.
//  marketing: ['SSID'] //Cookies in the marketing category.
});
*/