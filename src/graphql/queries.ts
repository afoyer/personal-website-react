/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const flickrPhotos = /* GraphQL */ `query FlickrPhotos(
  $page: Int
  $per_page: Int
  $sort: String
  $tags: String
  $text: String
) {
  flickrPhotos(
    page: $page
    per_page: $per_page
    sort: $sort
    tags: $tags
    text: $text
  )
}
` as GeneratedQuery<
  APITypes.FlickrPhotosQueryVariables,
  APITypes.FlickrPhotosQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    avatar
    createdAt
    email
    id
    lastLogin
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      avatar
      createdAt
      email
      id
      lastLogin
      name
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
