const Participant = {
  user: (parent, __, { db }) =>
    db.users.find((user) => user.id.toString() === parent.user_id.toString()),
  event: (parent, __, { db }) =>
    db.events.find(
      (event) => event.id.toString() === parent.event_id.toString()
    ),
};

export default { Participant };
