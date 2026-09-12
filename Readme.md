Green Earth 🌱

A tree plantation campaign website where you can browse trees by category, check out full details in a modal, and add trees to your cart — all built with vanilla JavaScript and the Programming Hero open API.


Live Link
https://nazmul-islam24.github.io/Green-Earth/


GitHub Repository
https://github.com/Nazmul-Islam24/Green-Earth.git

---

JavaScript Questions & Answers

1.  What is the difference between var, let, and const?

`var` is function-scoped and can be re-declared/updated freely, which often causes bugs. `let` is block-scoped and can be updated but not re-declared. `const` is also block-scoped but can't be reassigned — though if it holds an array/object, its contents can still change. I mostly use `const`, and `let` only when a value needs to change.

2.  What is the difference between map(), forEach(), and filter()?

`forEach()` just loops through an array and runs a function on each item — it returns nothing. `map()` loops through and returns a **new array** with every item transformed. `filter()` loops through and returns a **new array** with only the items that match a condition.

3.  What are arrow functions in ES6?

Arrow functions are a shorter syntax for writing functions using `=>`, like `const add = (a, b) => a + b;`. They also don't have their own `this` — they use `this` from the surrounding code, which is handy inside callbacks like `.then()` or `.map()`.

4.  How does destructuring assignment work in ES6?

Destructuring lets you pull values out of an object or array into variables in one line, instead of accessing them one by one. Example: `const { name, price } = plant;` instead of `const name = plant.name; const price = plant.price;`. It works the same way for arrays with `[ ]`.

5.  Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`` ` ``) and let you insert variables directly with `${ }`, like `` `Hello ${name}` `` instead of `"Hello " + name`. They're easier to read and also support multi-line strings without needing `+` or `\n`.

---

Tech Stack

- HTML5
- Tailwind CSS + DaisyUI
- Vanilla JavaScript (no frameworks)
- [Programming Hero Open API](https://openapi.programming-hero.com/) for plants & categories data
