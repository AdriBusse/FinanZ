import {gql} from '@apollo/client';

export const GETEXPENSE = gql`
  query GETEXPENSE($id: String!) {
    getExpense(id: $id) {
      id
      title
      sum
      transactions {
        id
        describtion
        amount
        createdAt
      }
      expenseByCategory {
        name
        amount
      }
    }
  }
`;
