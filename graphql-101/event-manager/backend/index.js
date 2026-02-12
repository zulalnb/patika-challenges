import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { nanoid } from "nanoid";
import { events, locations, participants, users } from "./data.js";

const typeDefs = `#graphql

# User
  type User {
    id: ID!
    username: String!
    email: String!
    participants: [Participant!]!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  # Events
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    user: User!
    participants: [Participant!]!
    location: Location!
  }

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    user_id: ID!
    location_id: ID!
  }

  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
  }

  # Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # Participant
  type Participant {
    id: ID!
    event: Event!
    user: User!
  }

  input CreateParticipantInput {
    event_id: ID!
    user_id: ID!
  }

  input UpdateParticipantInput {
    event_id: ID
    user_id: ID
  }

  type Query {
    # User
    users: [User!]!
    user(id: ID!): User!

    # Event
    events: [Event!]!
    event(id: ID!): Event!

    # Location
    locations: [Location!]!
    location(id: ID!): Location!

    # Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }

  type Mutation {
    # User
    addUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!

    # Event
    addEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!

    # Location
    addLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput!): Location!

    # Participant
    addParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
  }
`;

const resolvers = {
  Mutation: {
    // User
    addUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id.toString() === id);
      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id.toString() === id);

      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return deleted_user;
    },

    // User
    addEvent: (parent, { data }) => {
      const event = { id: nanoid(), ...data };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex(
        (event) => event.id.toString() === id,
      );
      if (event_index === -1) {
        throw new Error("Event not found.");
      }

      const updated_event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      return updated_event;
    },

    // Location
    addLocation: (parent, { data }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const loc_index = locations.findIndex((loc) => loc.id.toString() === id);
      if (loc_index === -1) {
        throw new Error("Location not found.");
      }

      const updated_loc = (locations[loc_index] = {
        ...locations[loc_index],
        ...data,
      });
      return updated_loc;
    },

    // Participant
    addParticipant: (parent, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id,
      );
      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }

      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      return updated_participant;
    },
  },
  Query: {
    // user
    users: () => users,
    user: (parent, args) =>
      users.find((user) => user.id.toString() === args.id),

    // event
    events: () => events,
    event: (parent, args) =>
      events.find((event) => event.id.toString() === args.id),

    // location
    locations: () => locations,
    location: (parents, args) =>
      locations.find((location) => location.id.toString() === args.id),

    // participant
    participants: () => participants,
    participant: (parents, args) =>
      participants.find((participant) => participant.id.toString() === args.id),
  },

  User: {
    participants: (parent) =>
      participants.filter(
        (participant) =>
          participant.user_id.toString() === parent.id.toString(),
      ),
    events: (parent) =>
      events.filter(
        (event) => event.user_id.toString() === parent.id.toString(),
      ),
  },
  Event: {
    user: (parent) =>
      users.find((user) => user.id.toString() === parent.user_id.toString()),
    participants: (parent) =>
      participants.filter(
        (participant) =>
          participant.event_id.toString() === parent.id.toString(),
      ),
    location: (parent) =>
      locations.find(
        (location) => location.id.toString() === parent.location_id.toString(),
      ),
  },

  Participant: {
    user: (parent) =>
      users.find((user) => user.id.toString() === parent.user_id.toString()),
    event: (parent) =>
      events.find(
        (event) => event.id.toString() === parent.event_id.toString(),
      ),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
