debugger

function startsWith(string, pattern) {
  return string.slice(0, pattern.length) == pattern;
}

function catRecord(name, birthdate, mother) {
  return {name: name, birth: birthdate, mother: mother};
}

function addCats(set, names, birthdate, mother) {
  for (var i = 0; i < names.length; i++)
    set[names[i]] = catRecord(names[i], birthdate, mother);
}
function deadCats(set, names, deathdate) {
  for (var i = 0; i < names.length; i++)
    set[names[i]].death = deathdate;
}

function extractDate(paragraph) {
  function numberAt(start, length) {
    return Number(paragraph.slice(start, start + length));
  }
  return new Date(numberAt(11, 4), numberAt(8, 2) - 1,
                  numberAt(5, 2));
}

function catNames(paragraph) {
  var colon = paragraph.indexOf(":");
  return paragraph.slice(colon + 2).split(", ");
}

function extractMother(paragraph) {
  return between(paragraph, "(mother ", ")");
}

function between(string, start, end) {
  var startAt = string.indexOf(start) + start.length;
  var endAt = string.indexOf(end, startAt);
  return string.slice(startAt, endAt);
}

function findCats() {
  var mailArchive = retrieveMails();
  var cats = {"Spot": catRecord("Spot", new Date(1997, 2, 5),
              "unknown")};

  function handleParagraph(paragraph) {
    if (startsWith(paragraph, "born"))
      addCats(cats, catNames(paragraph), extractDate(paragraph),
              extractMother(paragraph));
    else if (startsWith(paragraph, "died"))
      deadCats(cats, catNames(paragraph), extractDate(paragraph));
  }

  for (var mail = 0; mail < mailArchive.length; mail++) {
    var paragraphs = mailArchive[mail].split("\n");
    for (var i = 0; i < paragraphs.length; i++)
      handleParagraph(paragraphs[i]);
  }
  return cats;
}

function formatDate(date) {
  return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) +
         "/" + date.getFullYear();
}

function catInfo(data, name) {
  if (!(name in data))
    return "No cat by the name of " + name + " is known.";

  var cat = data[name];
  var message = name + ", born " + formatDate(cat.birth) +
                " from mother " + cat.mother;
  if ("death" in cat)
    message += ", died " + formatDate(cat.death);
  return message + ".";
}

function oldestCat(data) {
  var oldest = null;

  for (var name in data) {
    var cat = data[name];
    if (!("death" in cat) &&
        (oldest == null || oldest.birth > cat.birth))
      oldest = cat;
  }

  if (oldest == null)
    return null;
  else
    return oldest.name;
}


//var catData = findCats();

// console.log(catData);
// console.log(catInfo(catData, "White Fang"));
// console.log(oldestCat(catData));

// var howMany = 0;
// for (var cat in findLivingCats())
//   howMany++;
// console.log("There are ", howMany, " cats.");

function retrieveMails() {
return [
"Nephew,\n\nI bought a computer as soon as I received your letter. It took me two days to make it do 'internet', but I just kept calling the nice man at the computer shop, and in the end he came down to help personally. Send me something back if you receive this, so I know whether it actually works.\n\nLove,\nAunt Emily",
"Dear Nephew,\n\nVery good! I feel quite proud about being so technologically minded, having a computer and all. I bet Mrs. Goor down the street wouldn't even know how to plug it in, that witch.\n\nAnyway, thanks for sending me that game, it was great fun. After three days, I beat it. My friend Mrs. Johnson was quite worried when I didn't come outside or answer the phone for three days, but I explained to her that I was working with my computer.\n\nMy cat had two kittens yesterday! I didn't even realize the thing was pregnant. I've listed the names at the bottom of my letter, so that you will know how to greet them the next time you come over.\n\nSincerely,\nAunt Emily\n\nborn 15/02/1999 (mother Spot): Clementine, Fireball",
"[... and so on ...]\n\nborn 21/09/2000 (mother Spot): Yellow Emperor, Black Leclère",
"...\n\nborn 02/04/2001 (mother Clementine): Bugeye, Wolverine, Miss Bushtail",
"...\n\ndied 12/12/2002: Clementine\n\ndied 15/12/2002: Wolverine",
"...\n\nborn 15/11/2003 (mother Spot): White Fang",
"...\n\nborn 10/04/2003 (mother Miss Bushtail): Yellow Bess",
"...\n\ndied 30/05/2004: Yellow Emperor",
"...\n\nborn 01/06/2004 (mother Miss Bushtail): Catharina, Fat Igor",
"...\n\nborn 20/09/2004 (mother Yellow Bess): Doctor Hobbles the 2nd, Noog",
"...\n\nborn 15/01/2005 (mother Yellow Bess): The Moose, Liger\n\ndied 17/01/2005: Liger",
"Dear nephew,\n\nYour mother told me you have taken up skydiving. Is this true? You watch yourself, young man! Remember what happened to my husband? And that was only from the second floor!\n\nAnyway, things are very exciting here. I have spent all week trying to get the attention of Mr. Drake, the nice gentleman who moved in next\ndoor, but I think he is afraid of cats. Or allergic to them? I am\ngoing to try putting Fat Igor on his shoulder next time I see him, very curious what will happen.\n\nAlso, the scam I told you about is going better than expected. I have already gotten back five 'payments', and only one complaint. It is starting to make me feel a bit bad though. And you are right that it is probably illegal in some way.\n\n(... etc ...)\n\nMuch love,\nAunt Emily\n\ndied 27/04/2006: Black Leclère\n\nborn 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois",
"...\n\nborn 22/07/2006 (mother Noog): Goblin, Reginald, Little Maggie",
"...\n\ndied 13/02/2007: Spot\n\ndied 21/02/2007: Fireball",
"...\n\nborn 05/02/2007 (mother Noog): Long-ear Johnson",
"...\n\nborn 03/03/2007 (mother Catharina): Asoka, Dark Empress, Rabbitface"];
} 

// function findSequence(goal) {
//   function find(start, history) {
//     if (start == goal)
//       return history;
//     else if (start > goal)
//       return null;
//     else
//       return find(start + 5, "(" + history + " + 5)") ||
//              find(start * 3, "(" + history + " * 3)");
//   }
//   return find(1, "1");
// }

// console.log(findSequence(13));

// function greaterThan(x) {
// 	return function(y) {
// 		return y > x;
// 	};
// }

// var greaterThanTen = greaterThan(10);
// console.log(greaterThanTen(9));

// function startsWith(first, sentence) {
// 	var getFirst = sentence.slice(0, (first.length - 1)); 
  	
//   	if (getFirst == first)
//       return true
//     else
//       return false
// }

// console.log(startsWith("hi", "hi there"));
