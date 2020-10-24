




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


document.addEventListener('copy', function (e){
  var textString = '';
  var data = e.clipboardData;
  var copyDIV = document.getElementById("CopyDIV");
  var htmlString = copyDIV.parentNode.innerHTML;
  var trList = copyDIV.childNodes[0].childNodes[0];

  for (var i=0;i<trList.childElementCount;i++) {
    var formatting = '';
    for (var j=0;j<trList.childNodes[i].childElementCount;j++) {
      console.log("(" + i + ", "+ j + ") => " + trList.childNodes[i].childNodes[j].innerText)
      textString += '|' + trList.childNodes[i].childNodes[j].innerText;
      formatting += ':--:|';
    }
    textString += '|\n';
    if (i==0) {
      textString += formatting + '\n';
    }
  }

  data.setData('text/plain', textString);
  data.setData('text/html', htmlString);
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
	
	var fullObject = {
		"entityMap": {},
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