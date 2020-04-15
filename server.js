var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Data constants
const stateData = {
  AZ: {
    id: 'az',
    code: 'AZ',
    name: 'Arizona',
    allotedDelegates: 79
  },

  CA: {
    id: 'ca',
    code: 'CA',
    name: 'California',
    allotedDelegates: 494
  },

  CO: {
    id: 'co',
    code: 'CO',
    name: 'Colorado',
    allotedDelegates: 80
  },

  KS: {
    id: 'ks',
    code: 'KS',
    name: 'Kansas',
    allotedDelegates: 45
  },

  NV: {
    id: 'nv',
    code: 'NV',
    name: 'Nevada',
    allotedDelegates: 48
  }
};

const delegateData = {
  az001: {
    id: 'az001',
    state: 'AZ',
    name: 'Debora Anderson',
    votes: []
  },

  az002: {
    id: 'az002',
    state: 'AZ',
    name: 'John Bailey',
    votes: []
  },

  az003: {
    id: 'az003',
    state: 'AZ',
    name: 'Ana Jimenez',
    votes: []
  },

  az004: {
    id: 'az004',
    state: 'AZ',
    name: 'Brian Nederfeld',
    votes: []
  },

  az005: {
    id: 'az005',
    state: 'AZ',
    name: 'Thomas Ramirez',
    votes: []
  },

  ca001: {
    id: 'ca001',
    state: 'CA',
    name: 'Joshua Billings',
    votes: []
  },

  ca002: {
    id: 'ca002',
    state: 'CA',
    name: 'Virginia Davis',
    votes: []
  },

  ca003: {
    id: 'ca003',
    state: 'CA',
    name: 'Wanda Harris',
    votes: []
  },

  ca004: {
    id: 'ca004',
    state: 'CA',
    name: 'Henry Kingston',
    votes: []
  },

  ca005: {
    id: 'ca005',
    state: 'CA',
    name: 'Valerie Williams',
    votes: []
  },

  co001: {
    id: 'co001',
    state: 'CO',
    name: 'Eddie Danforth',
    votes: []
  },

  co002: {
    id: 'co002',
    state: 'CO',
    name: 'Brenda Gordon',
    votes: []
  },

  co003: {
    id: 'co003',
    state: 'CO',
    name: 'Yvonne Londres',
    votes: []
  },

  co004: {
    id: 'co004',
    state: 'CO',
    name: 'James Neff',
    votes: []
  },

  co005: {
    id: 'co005',
    state: 'CO',
    name: 'Sandra Parker',
    votes: []
  },

  ks001: {
    id: 'ks001',
    state: 'KS',
    name: 'Timothy Chandler',
    votes: []
  },

  ks002: {
    id: 'ks002',
    state: 'KS',
    name: 'Martha Fogel',
    votes: []
  },

  ks003: {
    id: 'ks003',
    state: 'KS',
    name: 'Karen Newman',
    votes: []
  },

  ks004: {
    id: 'ks004',
    state: 'KS',
    name: 'Larry Perkins',
    votes: []
  },

  ks005: {
    id: 'ks005',
    state: 'KS',
    name: 'Robert Quinn',
    votes: []
  },

  nv001: {
    id: 'nv001',
    state: 'NV',
    name: 'Jeremiah Adams',
    votes: []
  },

  nv002: {
    id: 'nv002',
    state: 'NV',
    name: 'Paul Conner',
    votes: []
  },

  nv003: {
    id: 'nv003',
    state: 'NV',
    name: 'Brian Edwards',
    votes: []
  },

  nv004: {
    id: 'nv004',
    state: 'NV',
    name: 'Wilma Miller',
    votes: []
  },

  nv005: {
    id: 'nv005',
    state: 'NV',
    name: 'Pamela Young',
    votes: []
  }
};

var schema = buildSchema(`
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

var root = {

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

// delegate(id: ID): Delegate

  delegate: (args) => {
    const del = delegateData[args.id];
    return {
      id: del.id,
      state: del.state,
      name: del.name
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
