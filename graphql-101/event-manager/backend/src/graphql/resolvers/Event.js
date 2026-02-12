const Event = {
  user: (parent, __, { db }) =>
    db.users.find((user) => user.id.toString() === parent.user_id.toString()),
  participants: (parent, __, { db }) =>
    db.participants.filter(
      (participant) => participant.event_id.toString() === parent.id.toString()
    ),
  location: (parent, __, { db }) =>
    db.locations.find(
      (location) => location.id.toString() === parent.location_id.toString()
    ),
};

export default { Event };
