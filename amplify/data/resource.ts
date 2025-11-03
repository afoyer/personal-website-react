import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { flickrApi } from "../functions/flickr-api/resource";

const schema = a.schema({
  User: a
    .model({
      email: a.string().required(),
      name: a.string().required(),
      avatar: a.string(),
      lastLogin: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  flickrPhotos: a
    .query()
    .arguments({
      tags: a.string(),
      text: a.string(),
      page: a.integer(),
      per_page: a.integer(),
      sort: a.string(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(flickrApi)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
