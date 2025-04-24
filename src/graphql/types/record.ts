import builder, { Type } from "../builder";

// Define the Record type.
// Exposes id and amount; the type field is mapped to our GraphQL enum.
// It also sets up relations to the associated account and category.
builder.prismaObject("Record", {
  fields: (t) => ({
    id: t.exposeID("id"),
    amount: t.exposeFloat("amount"),
    type: t.field({
      type: Type,
      resolve: (record) => record.type, // Resolves the underlying enum value from the record.
    }),
    account: t.relation("account"),
    category: t.relation("category"),
    user: t.relation("user"),
    note: t.exposeString("note"),
    createdAt: t.expose("createdAt", { type: "Date" }),
  }),
});

builder.queryField("record", (t) =>
  t.prismaField({
    type: "Record",
    args: {
      type: t.arg({ type: Type, required: false }),
    },
    resolve: (query, _root, { type }, ctx) => {
      const where = type ? { type } : {};
      return prisma.record.findFirst({ ...query, where });
    },
  })
);

builder.queryField("records", (t) =>
  t.prismaConnection({
    type: "Record",
    cursor: "id",
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: (query, _root, { userId }, ctx) => {
      return prisma.record.findMany({
        ...query,
        where: {
          user: { id: userId },
        },
        orderBy: { createdAt: "desc" },
      });
    },
  })
);

builder.mutationType({
  fields: (t) => ({
    createRecord: t.prismaField({
      type: "Record",
      args: {
        amount: t.arg.float({ required: true }),
        type: t.arg({ type: Type, required: true }),
        accountId: t.arg.int({ required: true }),
        categoryId: t.arg.int({ required: true }),
        userId: t.arg.int({ required: true }),
        note: t.arg.string({ required: true }),
      },
      resolve: async (query, _root, args, ctx) => {
        return prisma.record.create({
          data: {
            amount: args.amount,
            type: args.type,
            account: { connect: { id: args.accountId } },
            user: { connect: { id: args.userId } },
            category: { connect: { id: args.categoryId } },
            note: args.note,
            createdAt: new Date(),
          },
          ...query,
        });
      },
    }),
    // You can add more mutations here
  }),
});
