import { gql } from '@apollo/client';

const GET_ALL_NEWS = gql`
  query {
    allNews {
      novedadId
      nombre
      fecha
      comentario
      investigacionId
    }
  }
`;