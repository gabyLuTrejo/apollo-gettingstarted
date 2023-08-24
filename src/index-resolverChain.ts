import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//Mock users
const USERS = [
    {
        id: 1,
        name: 'A',
        email: 'a@mail.com'
    },
    {
        id: 2,
        name: 'B',
        email: 'b@mail.com'
    },
    {
        id: 4,
        name: 'C',
        email: 'c@mail.com'
    }

]

//Address
const ADDRESS = [
    {
        city:'CDE',
        state:'TN',
        id:1 //link field
    },
    {
        city:'BNG',
        state:'KA',
        id:2 //link field
    },
    {
        city:'NYC',
        state:'NY',
        id:3 //link field
    },
]

//Define schema
const typeDefs = `
type Address {
    city:String    
 }
 type User {
    id:ID!
    name:String
    email:String 
    address:Address # api
 }
 type Query {
    users:[User!]!
 }

`
const resolvers = {
    //Query 
    Query: {
        users() {
            return USERS
        }
    },
    User: {
        address(parent) {
            console.log(parent)
            return ADDRESS.find(address => {
                return address.id === parent.id
            })
        }
    }
}
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})
//Start the Webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Started at ${url}`)