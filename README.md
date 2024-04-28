React.js: Build a Cookie Clicker in React

User Stories
🐿️ As a user, I want to be able to click the cookie and increment the counter
🐿️ As a user, I want to see the counter automatically increment using an interval timer
🐿️ As a user, I want to purchase items i can afford in the shop and increase the number of cookies every time the interval passes

Requirements
🎯 Create state variables to store the current number of cookies and the cookies PerSecond value (useState)

🎯 Set up a timer to increment the number of cookies by the cookiesPerSecond value (useEffect). Be sure to handle clearing the timer using the useEffect return value.

🎯 Set up an array of objects containing the items available for purchase in the store, their cost and their increment increase value. Map through these and create buttons for each.

🎯 Create a function to handle the purchase of an item. This should check if the user has enough cookies to purchase the item, and if so, subtract the cost of the item from the number of cookies and add the increment value to the cookiesPerSecond value.

Stretch Goals
🏹 Store the cookies and cookiesPerSecond values in localStorage so they persist between page refreshes

All Requirements and Stretch Goals achieved

Reflections

What went really well and what could have gone better?

1) Once i got the hang of mutability/immutability

e.g a= [{"b": "c"}]  then if d = [...a] we get that a!=d as the reference changed but a[0] == d[0] is true since both objects have the same reference you also have to say let e= [...a[0]] and then let d[0] = e only then will a[0] != d[0]

so the spread operator only mutates the first layer, the objects inside don't get mutated
so for state this is a problem, there are libraries to help with this, but once i understood it, everything went much better

2) To begin with i was trying to control what each component did from it's parent, this was causing significant code bloat; but again once i realised i could let each component decide for itself what to do, it suddenly became much easier.

External sources

MDN, youtube, react.dev, Stackoverflow

Bugs

the main one was with immutability and also i was having a weird css issue, where the gradients only show if i set the background to be <1 opacity, if it's 1 opacity they dont show