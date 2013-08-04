debugger

var paragraphs = map(processParagraph, recluseFile().split("\n\n"));

function processParagraph(paragraph) {
	
	var header = 0;
	while (paragraph.charAt(0) == '%') {
		header++;
		paragraph = paragraph.slice(1);
	}
	return {type: (header == 0 ? "p" : "h" + header),
			content: splitParagraph(paragraph)};
}

// function splitParagraph(paragraph) {

// 	var emp, ref = null;
// 	var fragments = [];

// 	for (var i = 0; i < paragraph.length; i++) {
// 		if (paragraph.charAt(i) == '*') {
// 			emp = between(paragraph, '*', '*');
// 			var new_emp = {content: emp.text, type: "emphasised"}
// 			fragments.push(new_emp);
// 			paragraph = paragraph.slice(emp.lastPos + 1);
// 			i = -1;
// 		} else if (paragraph.charAt(i) == '{') {
// 			ref = between(paragraph, '{', '}');
// 			var new_ref = {content: ref.text, type: "reference"}
// 			fragments.push(new_ref);			
// 			paragraph = paragraph.slice(ref.lastPos + 1);
// 			i = -1;
// 		} else {
// 			norm = upTo(paragraph);
// 			var new_norm = {content: norm.text, type: "normal"}			
// 			fragments.push(new_norm);
// 			paragraph = paragraph.slice(norm.lastPos);
// 			i = -1;
// 		}
// 	}

// 	return fragments;	

// }

// function upTo(string) {
// 	var end = 0;

// 	while (string.charAt(end) != "*") {
// 		if (end == string.length) {
// 			break;
// 		}
// 		end++;
// 	}

// 	return {text: string.slice(0, end),
// 			lastPos: end};
// }

function splitParagraph(text) {
  function indexOrEnd(character) {
    var index = text.indexOf(character);
    return index == -1 ? text.length : index;
  }

  function takeNormal() {
    var end = reduce(Math.min, text.length,
                     map(indexOrEnd, ["*", "{"]));
    var part = text.slice(0, end);
    text = text.slice(end);
    return part;
  }

  function takeUpTo(character) {
    var end = text.indexOf(character, 1);
    if (end == -1)
      throw new Error("Missing closing '" + character + "'");
    var part = text.slice(1, end);
    text = text.slice(end + 1);
    return part;
  }

  var fragments = [];

  while (text != "") {
    if (text.charAt(0) == "*")
      fragments.push({type: "emphasised",
                      content: takeUpTo("*")});
    else if (text.charAt(0) == "{")
      fragments.push({type: "footnote",
                      content: takeUpTo("}")});
    else
      fragments.push({type: "normal",
                      content: takeNormal()});
  }
  return fragments;
}

//show(paragraphs);
show(splitParagraph("rsdfo *asdadf* sfsd"));