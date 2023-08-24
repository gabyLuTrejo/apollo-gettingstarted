import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
// LAB
const LIBRARIES = [{ branch: 'a' }, { branch: 'b' }];
const BOOKS = [{ title: 'title', author: 'author', branch: 'a' }, { title: 'titleB', author: 'authorB', branch: 'b' }, { title: 'title2', author: 'author', branch: 'a' }];
const AUTHORS = [{ id: 1, author: 'author', title: 'title' }, { id: 2, author: 'authorB', title: 'titleB' }, { id: 3, author: 'author', title: 'title2' }];
//Define schema
const typeDefs = `
 type Library{
    branch:String!
    books:[Book!]
  }

  type Book {
   title:String!
   author:Author!
  }

  type Author {
     name:String!
  }

  type Query {
     libraries:[Library]
  }

`;
const resolvers = {
    //Query 
    Query: {
        libraries() {
            return LIBRARIES;
        }
    },
    Library: {
        books(parent) {
            console.log(parent);
            return BOOKS.filter(books => {
                return books.branch == parent.branch;
            });
        }
    },
    Book: {
        author(parent) {
            console.log(parent);
            return {
                name: parent.author
            };
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
