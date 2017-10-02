
![Kindom Logo](https://github.com/montaque22/KingDOM/blob/master/artifacts/kindgom_logo.png "KingDOM")
---
[![Build Status](https://travis-ci.org/montaque22/KingDOM.svg?branch=master)](https://travis-ci.org/montaque22/KingDOM)


Kingdom allows you to dynamically create and manipulate DOM elements using a virtual DOM. 
This is particularly handy when you have massive changes to apply to the DOM. For example:

```javascript
// Instantiate the Virtual Dom with a <div class="container"></div> as the root
let kingdom = new Kingdom({
    
    // the element you want to create
    element: 'div',
    
    // keys in properties correspond to the properties that are found on HTML elements
    // Keep that in mind when trying to set things like class as they are called className
    properties: {
        className: 'container',
    }
})


kingdom.addSubject({
    element: 'h1',
    
    // Place text inside your element
    textAsString: 'Welcome to my kingdom',
    
    // Set attributes is like "properties" except it uses the Element method setAttribute
    // This lets you bypass some of the caveats like 'className' and lets you set properties like you are used to seeing
    // but this methods still have it's downside (like class being a reserved keyword and needs to be encased in quotes
    setAttributes: {
        id: 'title',
        'class' : 'large-title', // Class is encased quotes since it is a key word
    }
})

// most of the Kingdom's methods are chainable!!
.addSubject({
    element:'a',
    
    // Alternative to textAsString. You can use html (as string) and it will act as your inner content
    textAsHTML: '<span> Enter Here </span>',
    
   
    properties: {
        className : 'cta', // Class is encased quotes since it is a key word
        href: '#',
        id: 'action',
        onclick: ()=> alert('Welcome friends!') // set event methods since if they are part of the element's properties.
      
    }
})

let domRepresentation = kingdom.buildKingdom();

$(body).html(domRepresentation)
```
This will render the following:
```html
<div class="container">
    <h1 id="title" class="large-title">Welcome to my kingdom</h1>
    <a href="#" class="cta" id="action">
        <span>Enter Here</span>
    </a>
</div>
```


This framework is simple, but admittedly the method names are kinda kitchy and may weird to remember methods but 
once you get the theme everything will make perfect sense. If you don't care, that's cool too. I've documented all the 
methods to spare your eyes of all the kitchiness. [To see the docs check out the documentation folder.](./documentation/index.html)
  
  [But if you are interested in learning more about the framework check out the small demo.]() 
  
  
  # Installation
  
  This project was written in typescript and exported to UMD. Feel free to use the UMD version in the dist folder or 
  you can use the typescript version if your project can bare it. Because this project uses the DOM it does not work 
  in a node environment unless you are using something like jsdom. Still for your convenience you can install this 
  framework via npm and bower.
  
  
```bash
npm install king-dom --save
```

```bash
yarn add king-dom 
```


```bash
bower install king-doms
```
  

---
# MIT License

Copyright (c) 2017 Michael Montaque

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
