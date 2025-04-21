import { gql } from "@apollo/client";

const userQuery = gql`
  query users {
    users {
      name
    }
  }
`;
export default async function Home() {
  return <div>This is test </div>;
}
