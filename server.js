const express = require('express');
const fs = require('fs');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');


//Define Graphql schema
const schema = buildSchema(`
  type Query {
    states: [String]
    state(stateCode: StateCode): State
    delegate(id: ID): Delegate
  }

  type State {
    id: ID!
    stateCode: StateCode!
    name: String!
    allotedDelegates: Int
  }

  type Delegate {
    id: ID!
    state: ID!
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


// Define Graphql resolvers
const root = {

  states: () => {
    return ['AZ', 'CA', 'CO', 'KS', 'NV'];
  },

  state: (args) => {
    const st = stateData[args.stateCode];
    return {
      id: st.id,
      stateCode: st.code,
      name: st.name,
      allotedDelegates: st.allotedDelegates
    };
  },

  delegate: (args) => {
    const del = delegateData[args.id];
    return {
      id: del.id,
      state: del.state,
      name: del.name
    };
  }

  // const stateDataJson = JSON.stringify(stateData);
  // fs.writeFileSync('./state-data.json', stateDataJson);
  // console.log('Writing state data to file state-data.json');

  // const delegateDataJson = JSON.stringify(delegateData);
  // fs.writeFileSync('./delegate-data.json', delegateDataJson);
  // console.log('Writing delegate data to file delegate-data.json');

};


// Load data from JSON files
try {
  const stateDataJson = fs.readFileSync('./state-data.json');
  stateData = JSON.parse(stateDataJson);
}
catch(error) {
  console.log(error)
}

try {
  const delegateDataJson = fs.readFileSync('./delegate-data.json');
  delegateData = JSON.parse(delegateDataJson);
}
catch(error) {
  console.log(error)
}


// Initialize Express server with Graphql middleware
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000);
console.log('Running the RemDel API server at http://localhost:4000/graphql');
