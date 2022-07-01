import {gql} from '@apollo/client';

export const CREATEETF = gql`
  mutation createETF($name: String!, $short: String!) {
    createETF(name: $name, short: $short) {
      id
    }
  }
`;
