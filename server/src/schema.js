import { gql } from 'apollo-server-express'
import { filter, find, remove } from 'lodash'

const people = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
  ]
  
  const cars = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura ',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
  ]
  

  const typeDefs = gql`
    type Person{
      id: String!
      firstName: String!
      lastName: String!
    }

    type Car {
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    }

    type Query {
      people: [Person]
      cars: [Car]
      car(personId: String!): [Car]
    }

    type Mutation{
      addPerson(id: String!, firstName: String!, lastName:String!): Person
      addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car

      updatePerson(id:String!, firstName: String, lastName: String): Person
      updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car

      removePerson(id:String!): Person
      removeCar(id:String!): Car
    }
  `

  const resolvers = {
    Query: {
      people: () => people,
      cars: () => cars,
      car: (root, args) => {
        //filter will get all the results, as opposed by find that will get only the first result
        return filter(cars, {personId: args.personId})
      }
    },
    Mutation: {
      addPerson: (root, args) => {
        const newPerson = {
          id: args.id,
          firstName: args.firstName,
          lastName: args.lastName
        }

        people.push(newPerson)
        return newPerson
      },

      addCar: (root, args) => {
        const newCar = {
          id: args.id,
          year: args.year,
          make: args.make,
          model: args.model,
          price: args.price,
          personId: args.personId
        }

        cars.push(newCar)
        return newCar
      },

      updatePerson: (root, args) => {
        const person = find(people, { id: args.id })

        if(!person) throw new Error(`Couldn't find person with id ${args.is}`)

        person.firstName = args.firstName
        person.lastName = args.lastName

        return person
      },

      updateCar: (root, args) => {
        const car = find(cars, {id: args.id})

        if(!car) throw new Error(`Couldn't find car with id ${args.is}`)

        car.year = args.year
        car.make = args.make
        car.model = args.model
        car.price = args.price
        car.personId = args.personId

        return car
      },

      removePerson: (root, args) => {
        const removedPerson = find(people, {id: args.id})

        if(!removedPerson) throw new Error(`Couldn't find person with id ${args.is}`)

        remove(people, p => {
          return p.id === removedPerson.id
        })

        return removedPerson
      }, 

      removeCar: (root, args) => {
        const removedCar = find(cars, {id: args.id})

        if(!removedCar) throw new Error(`Couldn't find car with id ${args.is}`)

        remove(cars, p => {
          return p.id === removedCar.id
        })

        return removedCar
      }, 
    }
  }

  export{ typeDefs, resolvers }