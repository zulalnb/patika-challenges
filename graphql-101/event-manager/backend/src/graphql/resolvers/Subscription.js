const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubSub }) => pubSub.subscribe("userCreated"),
  },
  eventCreated: {
    subscribe: (_, __, { pubSub }) => pubSub.subscribe("eventCreated"),
  },
  participantAdded: {
    subscribe: (_, __, { pubSub }) => pubSub.subscribe("participantAdded"),
  },
};

export default { Subscription };
