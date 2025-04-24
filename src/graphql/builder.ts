import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "@/prisma/prisma";
import RelayPlugin from "@pothos/plugin-relay";
import { DateTimeResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relay: {},
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: { models: true, fields: true },
    // use where clause from prismaRelatedConnection for totalCount (defaults to true)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.addScalarType("Date", DateTimeResolver, {});

export const Type = builder.enumType("Type", {
  values: ["INCOME", "EXPENSE"],
});

export default builder;
