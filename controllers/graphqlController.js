const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const { parseBestsellers } = require('../utils/parseBestsellers');

const typeDefs = gql`
    type Bestseller {
        name: String
        imageUrl: String
        rating: String
        reviews: String
        price: String
    }

    type Query {
        bestsellers: [Bestseller]
    }
`;

const resolvers = {
    Query: {
        bestsellers: () => {
            const data = fs.readFileSync("./file.txt", "utf8");
            return parseBestsellers(data);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server };
