////////////////////////////////// Copy formatted code adapted from https://jsfiddle.net/Loilo/xymhgLjc/4/

// This is the actual copy function.
// It expects an HTML string to copy as rich text.

function copyFormatted (rtjson, html) {
  // Create an iframe (isolated container) for the HTML
  var container = document.getElementById("container")
  container.innerHTML="container"
  var divToCopy = document.createElement('div')
  
  divToCopy.setAttribute("data-reddit-rtjson", rtjson)
  
  divToCopy.innerHTML = html
  
  container.appendChild(divToCopy)
  
  // Hide element
  // container.style.position = 'fixed'
  // container.style.pointerEvents = 'none'
  // container.style.opacity = 0
  //container.style.visibility="hidden"
  
  

  // Detect all style sheets of the page
  var activeSheets = Array.prototype.slice.call(document.styleSheets)
    .filter(function (sheet) {
      return !sheet.disabled
  })

  // Mount the iframe to the DOM to make `contentWindow` available
//  document.body.appendChild(parentcontainer)
//  parentcontainer.appendChild(container)

  // Copy to clipboard
  window.getSelection().removeAllRanges()
  
  var range = document.createRange()
  range.selectNode(container)
//  range.selectNodeContents(container.childNodes[0])
  
//  console.log(container.childNodes[0])
  window.getSelection().addRange(range)

//  console.log(range)

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
  
  // Remove the iframe
//  document.body.removeChild(container)
}

// Create nice animation on copy button click
document.querySelector('button').onclick = function () {
    var animatedClone = this.cloneNode(true)
  animatedClone.classList.add('fading')
  animatedClone.addEventListener('animationend', function () {
      animatedClone.parentNode.removeChild(animatedClone)
  })
  this.parentNode.appendChild(animatedClone)
  
  var contents = window.editor.getData()
  var div = document.getElementById("copy space")
//  div.style.visibility="hidden"
//  document.body.appendChild(div)
  div.innerHTML = contents
  
  table = div.getElementsByTagName("table")[0]

  if (!table) {
	  alert("No table found")
	  return 
  }

  
  
//  result = '<div data-reddit-rtjson="' + tableToJson(table).replace('"', '&quot;') + '"></div>'
  result = tableToJson(table)    //.replace('"', '&quot;')
  
  //console.log(result)
  
  contents = "<table>" + table.innerHTML + "</table>" 


  
// Remove the div with the table
//  div.parentNode.removeChild(div);
  
  // Do the copy!
//  console.log(result)
//  alert(contents)
  copyFormatted(result, contents)
}

///////////////////// End copy formatted code from https://jsfiddle.net/Loilo/xymhgLjc/4/

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
