import {gql} from '@apollo/client';

export const CREATEETFSNAPSHOT = gql`
  mutation AddETFSnapshot($value: Float!, $etfId: String!) {
    createETFSnapshot(value: $value, etfId: $etfId) {
      id
    }
  }
`;
