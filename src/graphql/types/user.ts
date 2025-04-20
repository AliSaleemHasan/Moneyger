import builder from "@/graphql/builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
    accounts: t.relation("accounts"),
    categories: t.relation("categories"),
  }),
});

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      id: t.arg.int({ required: true }),
    },
    resolve: (query, _root, { take, skip, id }, ctx) => {
      return prisma.user.findUniqueOrThrow({ ...query, where: { id } });
    },
  })
);

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    args: {
      take: t.arg.int({ required: false }),
      skip: t.arg.int({ required: false }),
      name: t.arg.string({ required: false }),
    },
    resolve: (query, _root, { take, skip, name }, ctx) => {
      const where = name ? { name: { contains: name } } : {};
      return prisma.user.findMany({ ...query, where });
    },
  })
);

builder.mutationType({
  fields: (t) => ({
    createUser: t.prismaField({
      type: "User",
      args: {
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, _root, args, ctx) => {
        return prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: args.password,
          },
          ...query,
        });
      },
    }),
  }),
});
