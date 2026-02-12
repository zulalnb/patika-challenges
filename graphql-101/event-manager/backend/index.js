import { createServer } from "node:http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
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

  type DeleteAllOutput {
    count: Int!
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
    deleteAllUsers: DeleteAllOutput!

    # Event
    addEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: DeleteAllOutput!

    # Location
    addLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: DeleteAllOutput!

    # Participant
    addParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: DeleteAllOutput!
  }

  type Subscription {
    userCreated: User!
  }
`;

const pubSub = createPubSub();

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.subscribe("userCreated"),
    },
  },
  Mutation: {
    // User
    addUser: (_, { data }, { pubSub }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);

      pubSub.publish("userCreated", { userCreated: user });

      return user;
    },
    updateUser: (_, { id, data }) => {
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
    deleteUser: (_, { id }) => {
      const user_index = users.findIndex((user) => user.id.toString() === id);

      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return deleted_user;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);
      return { count: length };
    },

    // User
    addEvent: (_, { data }) => {
      const event = { id: nanoid(), ...data };
      events.push(event);
      return event;
    },
    updateEvent: (_, { id, data }) => {
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
    deleteEvent: (_, { id }) => {
      const event_index = events.findIndex(
        (event) => event.id.toString() === id,
      );

      if (event_index === -1) {
        throw new Error("Event not found.");
      }

      const deleted_event = events[event_index];
      events.splice(event_index, 1);

      return deleted_event;
    },
    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);
      return { count: length };
    },

    // Location
    addLocation: (_, { data }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (_, { id, data }) => {
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
    deleteLocation: (_, { id }) => {
      const loc_index = locations.findIndex((loc) => loc.id.toString() === id);

      if (loc_index === -1) {
        throw new Error("Location not found.");
      }

      const deleted_loc = locations[loc_index];
      locations.splice(loc_index, 1);

      return deleted_loc;
    },
    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);
      return { count: length };
    },

    // Participant
    addParticipant: (_, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (_, { id, data }) => {
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
    deleteParticipant: (_, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id,
      );

      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }

      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);

      return deleted_participant;
    },
    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return { count: length };
    },
  },
  Query: {
    // user
    users: () => users,
    user: (_, args) => users.find((user) => user.id.toString() === args.id),

    // event
    events: () => events,
    event: (_, args) => events.find((event) => event.id.toString() === args.id),

    // location
    locations: () => locations,
    location: (_, args) =>
      locations.find((location) => location.id.toString() === args.id),

    // participant
    participants: () => participants,
    participant: (_, args) =>
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

const yoga = createYoga({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
  logging: true,
  context: { pubSub },
});

const server = createServer(yoga);
server.listen(4000, () => console.log("Server started on port 4000"));
