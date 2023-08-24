import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//Define schema
const typeDefs = `

type Query{
   greatings(name:String!):String   
}

`;
const resolvers = {
    //Query 
    Query: {
        greatings(parents, args, context) {
            console.log(args);
            return `Welcome ${args.name}`;
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
