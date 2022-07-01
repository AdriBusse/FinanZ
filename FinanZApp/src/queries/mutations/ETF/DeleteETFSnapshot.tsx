import {gql} from '@apollo/client';

export const DELETEETFSNAPSHOT = gql`
  mutation ($id: String!) {
    deleteETFSnapshot(id: $id)
  }
`;
