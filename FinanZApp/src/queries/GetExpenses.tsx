import {gql} from '@apollo/client';

export const GETEXPENSES = gql`
  query GETEXPENSES {
    getExpenses {
      id
      title
      sum
    }
  }
`;
