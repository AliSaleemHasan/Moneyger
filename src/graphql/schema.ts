import "./types/account";
import "./types/user";
import "./types/record";
import "./types/category";
import builder from "./builder";

export const schema = builder.toSchema();
