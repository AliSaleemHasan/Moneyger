import "./types/account";
import "./types/user";
import "./types/record";
import "./types/category";
import "./types/statistics";
import builder from "./builder";

export const schema = builder.toSchema();
