import builder from "../builder";
// Define the Account type.
// Exposes id and name and the relations to its owner (User) and its records.
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
      return prisma.account.findFirst({ ...query, where: { name } });
    },
  })
);

builder.queryField("accounts", (t) =>
  t.prismaField({
    type: ["Account"],
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      name: t.arg.string({ required: false }),
    },
    resolve: (query, _root, { take, skip, name }, ctx) => {
      const where = name ? { name: { contains: name } } : {};
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
      resolve: async (query, _root, { name, userId }, ctx) => {
        return prisma.account.create({
          data: {
            name,
            user: { connect: { id: userId } },
          },
          ...query,
        });
      },
    }),
  }),
});
