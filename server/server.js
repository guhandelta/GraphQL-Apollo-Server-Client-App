const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

// Keeping the code modular by separating the Schema and Resolver Logic
// gql can be used as a fn here, instead of using it as a template literal
// utf-8 encoding is provided to make sure the file is read as a string and not as a binary file
const typeDefs =  gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));

const resolvers = require('./resolvers')

const apolloServer = new ApolloServer({ typeDefs, resolvers });
// applyMiddleware() => Integrates Apollo server into Express app, rather than running it as a standalone server
apolloServer.applyMiddleware({ app, path: '/graphql' }); 

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));
