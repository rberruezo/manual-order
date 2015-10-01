# Getting Started

```bash
git clone git@github.com:rberruezo/manual-order.git
cd manual-order
npm install
npm start
```

# Steps to run

#### Compile
```bash
npm start
```

##### How it works

npm looks in your package.json file, and if you have something like
```json
"scripts": { "start": "coffee server.coffee" }
```
then it will do that. If npm can't find your start script, it defaults to: `node server.js`

#### Start server
```bash
python -m SimpleHTTPServer 8000
```
#### See it
Open a browser and go to `http://localhost:8000/index.html`

# Source

#### React
https://facebook.github.io/react/docs/getting-started.html

#### ALT
http://alt.js.org/guide/

