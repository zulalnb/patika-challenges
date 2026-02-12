import { nanoid } from "nanoid";

const Mutation = {
  // User
  addUser: (_, { data }, { db, pubSub }) => {
    const user = { id: nanoid(), ...data };
    db.users.push(user);

    pubSub.publish("userCreated", { userCreated: user });

    return user;
  },
  updateUser: (_, { id, data }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id.toString() === id);
    if (user_index === -1) {
      throw new Error("User not found.");
    }

    const updated_user = (db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    });
    return updated_user;
  },
  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id.toString() === id);

    if (user_index === -1) {
      throw new Error("User not found.");
    }

    const deleted_user = db.users[user_index];
    users.splice(user_index, 1);

    return deleted_user;
  },
  deleteAllUsers: (_, __, { db }) => {
    const length = db.users.length;
    db.users.splice(0, length);
    return { count: length };
  },

  // User
  addEvent: (_, { data }, { db, pubSub }) => {
    const event = { id: nanoid(), ...data };
    db.events.unshift(event);

    pubSub.publish("eventCreated", { eventCreated: event });

    return event;
  },
  updateEvent: (_, { id, data }, { db }) => {
    const event_index = db.events.findIndex(
      (event) => event.id.toString() === id,
    );
    if (event_index === -1) {
      throw new Error("Event not found.");
    }

    const updated_event = (db.events[event_index] = {
      ...db.events[event_index],
      ...data,
    });
    return updated_event;
  },
  deleteEvent: (_, { id }, { db }) => {
    const event_index = db.events.findIndex(
      (event) => event.id.toString() === id,
    );

    if (event_index === -1) {
      throw new Error("Event not found.");
    }

    const deleted_event = db.events[event_index];
    db.events.splice(event_index, 1);

    return deleted_event;
  },
  deleteAllEvents: (_, __, { db }) => {
    const length = db.events.length;
    db.events.splice(0, length);
    return { count: length };
  },

  // Location
  addLocation: (_, { data }, { db }) => {
    const location = { id: nanoid(), ...data };
    db.locations.push(location);
    return location;
  },
  updateLocation: (_, { id, data }, { db }) => {
    const loc_index = db.locations.findIndex((loc) => loc.id.toString() === id);
    if (loc_index === -1) {
      throw new Error("Location not found.");
    }

    const updated_loc = (db.locations[loc_index] = {
      ...db.locations[loc_index],
      ...data,
    });
    return updated_loc;
  },
  deleteLocation: (_, { id }, { db }) => {
    const loc_index = db.locations.findIndex((loc) => loc.id.toString() === id);

    if (loc_index === -1) {
      throw new Error("Location not found.");
    }

    const deleted_loc = db.locations[loc_index];
    db.locations.splice(loc_index, 1);

    return deleted_loc;
  },
  deleteAllLocations: (_, __, { db }) => {
    const length = db.locations.length;
    db.locations.splice(0, length);
    return { count: length };
  },

  // Participant
  addParticipant: (_, { data }, { db, pubSub }) => {
    const participant = { id: nanoid(), ...data };
    db.participants.push(participant);

    pubSub.publish("participantAdded", { participantAdded: participant });

    return participant;
  },
  updateParticipant: (_, { id, data }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id.toString() === id,
    );
    if (participant_index === -1) {
      throw new Error("Participant not found.");
    }

    const updated_participant = (db.participants[participant_index] = {
      ...db.participants[participant_index],
      ...data,
    });
    return updated_participant;
  },
  deleteParticipant: (_, { id }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id.toString() === id,
    );

    if (participant_index === -1) {
      throw new Error("Participant not found.");
    }

    const deleted_participant = db.participants[participant_index];
    db.participants.splice(participant_index, 1);

    return deleted_participant;
  },
  deleteAllParticipants: (_, __, { db }) => {
    const length = db.participants.length;
    db.participants.splice(0, length);
    return { count: length };
  },
};

export default { Mutation };
