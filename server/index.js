const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

mongoose.connect(process.env.MONGO_URL);

const startServer = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(express.json());
  app.use("/graphql", cors(), expressMiddleware(apolloServer));

  app.listen(4000, () => console.log("Server UP & Running 4000"));
};

startServer();
