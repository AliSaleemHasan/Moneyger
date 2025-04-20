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
  }),
});

builder.queryField("record", (t) =>
  t.prismaField({
    type: "Record",
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      type: t.arg({ type: Type, required: false }),
    },
    resolve: (query, _root, { take, skip, type }, ctx) => {
      const where = type ? { type } : {};
      return prisma.record.findFirst({ ...query, where });
    },
  })
);

builder.queryField("records", (t) =>
  t.prismaField({
    type: ["Record"],
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      type: t.arg({ type: Type, required: false }),
    },
    resolve: (query, _root, { take, skip, type }, ctx) => {
      const where = type ? { type } : {};
      return prisma.record.findMany({ ...query, where });
    },
  })
);

// // Mutation to create a new Record.
// builder.mutationField("createRecord", (t) =>
//   t.prismaField({
//     type: "Record",
//     args: {
//       amount: t.arg.float({ required: true }),
//       type: t.arg({ type: Type, required: true }),
//       accountId: t.arg.int({ required: true }),
//       categoryId: t.arg.int({ required: true }),
//     },
//     resolve: async (query, _root, args, ctx) => {
//       return prisma.record.create({
//         data: {
//           amount: args.amount,
//           type: args.type,
//           account: { connect: { id: args.accountId } },
//           category: { connect: { id: args.categoryId } },
//         },
//         ...query,
//       });
//     },
//   })
// );

// Mutation to update an existing Record.
builder.mutationType({
  fields: (t) => ({
    createRecord: t.prismaField({
      type: "Record",
      args: {
        id: t.arg.int({ required: true }),
        amount: t.arg.float({ required: true }),
        type: t.arg({ type: Type, required: true }),
        accountId: t.arg.int({ required: true }),
        categoryId: t.arg.int({ required: true }),
      },
      resolve: async (query, _root, args, ctx) => {
        return prisma.record.create({
          data: {
            amount: args.amount,
            type: args.type,
            account: { connect: { id: args.accountId } },
            category: { connect: { id: args.categoryId } },
          },
          ...query,
        });
      },
    }),
    // You can add more mutations here
  }),
});
