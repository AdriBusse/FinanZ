import {gql} from '@apollo/client';

export const GETETFDETAIL = gql`
  query getETF($id: String!) {
    getETF(id: $id) {
      id
      name
      short
      worth
      deposited
      transactions {
        id
        amount
        createdAt
      }
      snapshots {
        id
        value
        createdAt
      }
    }
  }
`;
