import {gql} from '@apollo/client';

export const CREATEETFTRANSACTION = gql`
  mutation ($amount: Float!, $etfId: String!) {
    createETFTransaction(amount: $amount, etfId: $etfId) {
      id
    }
  }
`;
