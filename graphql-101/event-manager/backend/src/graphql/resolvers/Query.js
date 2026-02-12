const Query = {
  // user
  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) =>
    db.users.find((user) => user.id.toString() === args.id),

  // event
  events: (_, __, { db }) => db.events,
  event: (_, args, { db }) =>
    db.events.find((event) => event.id.toString() === args.id),

  // location
  locations: (_, __, { db }) => db.locations,
  location: (_, args, { db }) =>
    db.locations.find((location) => location.id.toString() === args.id),

  // participant
  participants: (_, __, { db }) => db.participants,
  participant: (_, args, { db }) =>
    db.participants.find(
      (participant) => participant.id.toString() === args.id
    ),
};

export default { Query };
