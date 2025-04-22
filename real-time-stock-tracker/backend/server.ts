import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { Pool } from "pg";
import Redis from "ioredis";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(require("cors")());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

// Redis Connection
const redis = new Redis();

// Kafka Producer (Stock Prices)
const kafka = new Kafka({ clientId: "stock-tracker", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const typeDefs = gql`
  type Stock {
    symbol: String
    price: Float
  }
  type Query {
    getStock(symbol: String!): Stock
  }
`;

const resolvers = {
  Query: {
    async getStock(_: any, { symbol }: { symbol: string }) {
      // Check Redis cache
      const cachedStock = await redis.get(`stock:${symbol}`);
      if (cachedStock) return JSON.parse(cachedStock);

      // Fetch from PostgreSQL
      const result = await pool.query(`SELECT * FROM stocks WHERE symbol = $1 ORDER BY timestamp DESC LIMIT 1`, [symbol]);
      return result.rows[0] || null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Backend running on http://localhost:4000/graphql"));
});
