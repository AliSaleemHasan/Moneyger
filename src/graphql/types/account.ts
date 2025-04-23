import builder from "../builder";

builder.prismaObject("Account", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    user: t.relation("user"),
    records: t.relation("records"),
  }),
});

builder.queryField("account", (t) =>
  t.prismaField({
    type: "Account",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: (query, _root, { name }, ctx) => {
      return prisma.account.findFirst({ ...query, where: { name: name } });
    },
  })
);
builder.queryField("accounts", (t) =>
  t.prismaField({
    type: ["Account"],
    args: {
      userId: t.arg.int(),
    },
    resolve: (query, _root, { userId }, ctx) => {
      const where = userId ? { userId } : {};
      return prisma.account.findMany({ ...query, where });
    },
  })
);

builder.mutationType({
  fields: (t) => ({
    createAccount: t.prismaField({
      type: "Account",
      args: {
        name: t.arg.string({ required: true }),
        userId: t.arg.int({ required: true }),
      },

      resolve: async (query, _root, args, context) => {
        return prisma.account.create({
          data: {
            name: args.name,
            user: { connect: { id: args.userId } },
          },
          ...query,
        });
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    updateAccount: t.prismaField({
      type: "Account",
      args: {
        id: t.arg.int({ required: true }),

        name: t.arg.string({ required: true }),
        userId: t.arg.int({ required: true }),
      },

      resolve: async (query, _root, args, context) => {
        return prisma.account.update({
          data: {
            name: args.name,
            user: { connect: { id: args.userId } },
          },
          ...query,
          where: { id: args.id },
        });
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    deleteAccount: t.prismaField({
      type: "Account",
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (query, _root, args, context) => {
        return prisma.account.delete({ ...query, where: { id: args.id } });
      },
    }),
  }),
});
