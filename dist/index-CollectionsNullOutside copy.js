import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Mock users
const USERS = [
    {
        id: 1,
        firstName: "Gaby",
        lastName: "Trejo",
        age: 10,
        points: 100,
        status: true
    },
    {
        id: 2,
        firstName: "Adris",
        lastName: "Nava",
        age: 30,
        points: 900,
        status: true
    },
    {
        id: 4,
        firstName: "Chicharin",
        lastName: "Almaraz",
        age: 30,
        points: 900,
        status: true
    }
];
//Define schema
const typeDefs = `

type User {
    id:ID!
    firstName:String!
    lastName:String
    age:Int
    points:Float
    status:Boolean
}

type Query{
   users:[User]    
}

`;
const resolvers = {
    //Query 
    Query: {
        users() {
            return USERS;
        }
    }
};
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
//Start the Webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`Apollo Server is Started at ${url}`);
