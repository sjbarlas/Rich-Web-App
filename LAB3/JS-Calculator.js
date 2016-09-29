 window.onload = function() {
 
  // create a couple of elements in an otherwise empty HTML page
  var heading = document.createElement("h1");
  var paragraph = document.createElement("p");
  var heading_text = document.createTextNode("HELLO!")
  var paragraph_text = document.createTextNode("This is a para");
  heading.appendChild(heading_text);
  paragraph.appendChild(paragraph_text);

  document.body.appendChild(heading);
  document.body.appendChild(paragraph);

  document.h1.style.backgroundColor = "black";
}
