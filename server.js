var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Data constants
const stateData = {
  AZ: {
    id: 'az123',
    code: 'AZ',
    name: 'Arizona'},

  CA: {
    id: 'ca123',
    code: 'CA',
    name: 'California'},

  CO: {
    id: 'co123',
    code: 'CO',
    name: 'Colorado'},

  KS: {
    id: 'ks123',
    code: 'KS',
    name: 'Kansas'},

  NV: {
    id: 'nv123',
    code: 'NV',
    name: 'Nevada'}
};

var schema = buildSchema(`
  type Query {
    states: [String]
    state(stateCode: StateCode): State
  }

  type State {
    id: ID!
    stateCode: StateCode!
    name: String!
  }

  enum StateCode {
    AZ
    CA
    CO
    KS
    NV
  }
`);

var root = {

  states: () => {
    return ['AZ', 'CA', 'CO', 'KS', 'NV'];
  },

  state: (args) => {
    const st = stateData[args.stateCode];
    return {
      id: st.id,
      stateCode: st.code,
      name: st.name
    };
  }

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running the RemDel API server at http://localhost:4000/graphql');
