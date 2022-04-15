import {gql} from '@apollo/client';

export const TESTQ = gql`
  query GetSavingDepots1 {
    getSavingDepots {
      id
    }
  }
`;
