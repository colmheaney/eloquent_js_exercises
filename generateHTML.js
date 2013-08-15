function tag(name, content, attributes) {
	return {name: name, attributes: attributes, content: content};
}

function link(target, text) {
	return tag("a", [text], {href: target});
}

function htmlDoc(title, bodyContent) {
	return tag("html", [tag("head", [tag("title", [title])]),
						tag("body", bodyContent)]);
}					

function image(src) {
	return tag("img",[], {src:src});
}

function renderHTML(element) {
  var pieces = [];

  function renderAttributes(attributes) {
    var result = [];
    if (attributes) {
      for (var name in attributes) 
        result.push(" " + name + "=\"" +
                    escapeHTML(attributes[name]) + "\"");
    }
    return result.join("");
  }

  function render(element) {
    // Text node
    if (typeof element == "string") {
      pieces.push(escapeHTML(element));
    }
    // Empty tag
    else if (!element.content || element.content.length == 0) {
      pieces.push("<" + element.name +
                  renderAttributes(element.attributes) + "/>");
    }
    // Tag with content
    else {
      pieces.push("<" + element.name +
                  renderAttributes(element.attributes) + ">");
      forEach(element.content, render);
      pieces.push("</" + element.name + ">");
    }
  }

  render(element);
  return pieces.join("");
}

function escapeHTML(text) {
  var replacements = [[/&/g, "&amp;"], [/"/g, "&quot;"],
                      [/</g, "&lt;"], [/>/g, "&gt;"]];
  forEach(replacements, function(replacement) {
    text = text.replace(replacement[0], replacement[1]);
  });
  return text;
}


var body = [tag("h1", ["The Test"]),
            tag("p", ["Here is a paragraph, and an image..."]),
            image("img/sheep.png")];
var doc = htmlDoc("The Test", body);
show(renderHTML(doc));
