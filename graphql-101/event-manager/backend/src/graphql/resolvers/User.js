const User = {
  participants: (parent, __, { db }) =>
    db.participants.filter(
      (participant) => participant.user_id.toString() === parent.id.toString()
    ),
  events: (parent, _, { db }) =>
    db.events.filter(
      (event) => event.user_id.toString() === parent.id.toString()
    ),
};

export default { User };
