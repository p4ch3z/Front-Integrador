import { gql } from '@apollo/client';

export const CREATE_TEAM = gql`
  mutation CreateTeam($investigacionId: Int!, $expertosIds: [Int!]!) {
    createTeam(investigacionId: $investigacionId, expertosIds: $expertosIds) {
      success
    }
  }
`;