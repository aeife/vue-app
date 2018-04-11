const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongo = require('mongodb').MongoClient;
const app = express();
require('dotenv').load();

(async () => {
  const mongoClient = await mongo.connect(process.env.MONGODB_LOCATION);
  const db = mongoClient.db(process.env.DB);

  app.get('/api/v1/env', (req, res) => res.send(process.env));
  app.get('/api/v1/status', (req, res) => res.send({
    status: true
  }));
  // app.get('/api/v1/posts', (req, res) => res.send({
  //   posts: [{
  //     title: 'post 1',
  //     text: 'text 1'
  //   }, {
  //     title: 'post 2',
  //     text: 'text 2'
  //   }]
  // }));
  app.get('/api/v1/posts', async (req, res) => {
    const posts = await db.collection('posts').find({}).toArray();
    res.send({posts});
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
  }

  const port = process.env.PORT || '9000';
  app.set('port', port);

  const server = http.createServer(app);
  server.listen(port, () => console.log(`Running on ${port}`));
})().catch(err => {
  console.error(err);
});
