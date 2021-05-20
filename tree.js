
var axiom = "F";
var sentences = [];
var rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

var trees = [];

class Tree {
  constructor (x, y, s, age) {
    // this.x = random(width*0.2, width*0.8);
    // this.y = random(height * 0.5, height * 0.8);
    // this.s = Math.round(random(10, 15));
    this.x = x;
    this.y = y;
    this.s = s;
    this.angle = random(20, 40);
    // this.color = [random(255), random(200, 255), random(128)];
    this.color = [0, 120, 0];
    // this.age = Math.round(random(2, sentences.length)-1);
    // this.age = sentences.length-1;
    this.age = 3;
  }

  display() {
      var sentence;
      sentence = sentences[this.age];
      //console.log(`age=${this.age}`);
      push();
      angleMode(DEGREES);
      translate(this.x, this.y);
      stroke(this.color);
      strokeWeight(3);

      for (let i=0; i<sentence.length; i++){
        var current = sentence.charAt(i);
        switch(current) {
          case "F": line(0, 0, 0, -this.s);
            translate(0,-this.s); break;
          case "+": rotate(this.angle); break;
          case "-": rotate(-this.angle); break;
          case "[": push(); break;
          case "]": pop(); break;
          default: break;
        }
      }
      pop();
    }
}

function generate(sentence) {
  var nextSentence = "";
  for (let i=0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (let j=0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }

  }
  sentence = nextSentence;
  //createP(sentence);
  return nextSentence;
}

function tree_setup() {
  sentences.push(axiom);
  //createP(axiom);
  for (i=0; i<3; i++) {
    nextSentence = generate(sentences[i]);
    //createP(nextSentence);
    sentences.push(nextSentence);
  }

  // for (let i=0; i<5; i++) {
  //   trees.push(new Tree());
  // }
  w = windowWidth;
  h = windowHeight;

  trees.push(new Tree(w*0.2, h*0.5, 10));
  trees.push(new Tree(w*0.4, h*0.3, 8));
  trees.push(new Tree(w*0.5, h*0.5, 10));
  trees.push(new Tree(w*0.6, h*0.3, 8));
  trees.push(new Tree(w*0.8, h*0.5, 10));
}

function tree_display() {
  for (let i=0; i<trees.length; i++) {
    trees[i].display();
  }
}
