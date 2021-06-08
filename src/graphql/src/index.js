'use strict';

const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
    type Query {
        getAgeDemoByItem(item:String):[AgeDemo]
        getAllUser:[User]
        getAllItems:[String]
    }

    type User{
        username:String
        age:String
    }
    type AgeDemo{
        age:String
        count:Int
    }
`;

const resolvers = {

    Query: {
        getAgeDemoByItem: async (args) => {
            const { item } = args;
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/users/age?item=${item}`
            );
            const AgeDemoByItem = responseFromDataSource.data;
            return  AgeDemoByItem;
        },
        getAllUser:async()=>{
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/users`
            );
            const allUsers=responseFromDataSource.data;
            return allUsers;
        },
        getAllItems:async()=>{
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/items`
            );
            const allItems=responseFromDataSource.data;
            return allItems;
        }
        
    }
};


const port = 4000;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({ app });


app.listen({ port }, () => {
    console.log(
        `Graphql endpoint is at http://localhost:${port}${apolloServer.graphqlPath}`
    );
});
