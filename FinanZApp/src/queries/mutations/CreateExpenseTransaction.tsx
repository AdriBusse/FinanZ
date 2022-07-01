import {gql} from '@apollo/client';

export const CREATEEXPANSETRANSACTION = gql`
  mutation CREATEEXPENSETRANSACTION(
    $expenseId: String!
    $describtion: String!
    $amount: Float!
    $categoryId: String
  ) {
    createExpenseTransaction(
      expenseId: $expenseId
      describtion: $describtion
      amount: $amount
      categoryId: $categoryId
    ) {
      id
      expense {
        title
      }
    }
  }
`;
