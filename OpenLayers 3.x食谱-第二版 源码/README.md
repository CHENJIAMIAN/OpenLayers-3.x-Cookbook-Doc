# Running the server

Some of the recipes perform AJAX requests, sometimes cross domain, that need to be accessible from a web server in order to work properly. Simply follow these instructions:

1. Install node.js on your machine (`https://nodejs.org`)
2. Open up a command prompt/terminal session at this directory
3. Type `npm install` to install the required npm packages
4. Type `node server` to start up the server (`http://localhost:3000` by default)
5. Navigate to `http://localhost:3000` in your browser and select a chapter to view from the index page.
For example: `http://localhost:3000/ch03/ch03-gml-layer` for the *Chapter 3* recipe on *Adding a GML layer*.