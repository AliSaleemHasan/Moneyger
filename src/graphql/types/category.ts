import builder from "@/graphql/builder";
builder.prismaObject("Category", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    // Note: Ensure that the field name in your Prisma model matches. If it's "description", use that.
    description: t.exposeString("description", { nullable: true }),
    user: t.relation("user"),
    records: t.relation("records"),
  }),
});

builder.queryField("category", (t) =>
  t.prismaField({
    type: "Category",
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      name: t.arg.string({ required: true }),
    },
    resolve: (query, _root, { take, skip, name }, ctx) => {
      return prisma.category.findFirst({ ...query, where: { name: name } });
    },
  })
);
builder.queryField("categories", (t) =>
  t.prismaField({
    type: ["Category"],
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: (query, _root, { userId }, ctx) => {
      const where = { OR: [{ userId: null }, { userId }] };
      return prisma.category.findMany({ ...query, where });
    },
  })
);

builder.mutationType({
  fields: (t) => ({
    createCategory: t.prismaField({
      type: "Category",
      args: {
        name: t.arg.string({ required: true }),
        description: t.arg.string(),
        userId: t.arg.int({ required: true }),
      },

      resolve: async (query, _root, args, context) => {
        return prisma.category.create({
          data: {
            name: args.name,
            description: args.description,
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
    updateCategory: t.prismaField({
      type: "Category",
      args: {
        id: t.arg.int({ required: true }),

        name: t.arg.string({ required: true }),
        description: t.arg.string(),
        userId: t.arg.int({ required: true }),
      },

      resolve: async (query, _root, args, context) => {
        return prisma.category.update({
          data: {
            name: args.name,
            description: args.description,
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
    deleteCategory: t.prismaField({
      type: "Category",
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (query, _root, args, context) => {
        return prisma.category.delete({ ...query, where: { id: args.id } });
      },
    }),
  }),
});
