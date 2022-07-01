import {gql} from '@apollo/client';

export const UPDATEEXPENSETRANSACTION = gql`
  mutation UPDATEEXPENSETRANSACTION(
    $transactionId: String!
    $amount: Float
    $describtion: String
  ) {
    updateExpenseTransaction(
      transactionId: $transactionId
      describtion: $describtion
      amount: $amount
    ) {
      id
      amount
      describtion
    }
  }
`;
