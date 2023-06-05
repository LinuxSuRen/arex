/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  /** Returns a list of all admin users in infra */
  admins: Array<User>;
  /** Returns a list of all the teams in the infra */
  allTeams: Array<Team>;
  /** Returns a list of all the users in infra */
  allUsers: Array<User>;
  /** Return count of all the stored collections in a team */
  collectionCountInTeam: Scalars['Int']['output'];
  /** Return count of all the stored environments in a team */
  environmentCountInTeam: Scalars['Int']['output'];
  /** Returns a list of all the invited users */
  invitedUsers: Array<InvitedUser>;
  /** Return count of all the members in a team */
  membersCountInTeam: Scalars['Int']['output'];
  /** Return all the pending invitations in a team */
  pendingInvitationCountInTeam: Array<TeamInvitation>;
  /** Return count of all the stored requests in a team */
  requestCountInTeam: Scalars['Int']['output'];
  /** Return total number of Team Collections in organization */
  teamCollectionsCount: Scalars['Int']['output'];
  /** Returns a team info by ID when requested by Admin */
  teamInfo: Team;
  /** Return total number of Team Requests in organization */
  teamRequestsCount: Scalars['Int']['output'];
  /** Return total number of Teams in organization */
  teamsCount: Scalars['Int']['output'];
  /** Returns a user info by UID */
  userInfo: User;
  /** Return total number of Users in organization */
  usersCount: Scalars['Int']['output'];
};


export type AdminAllTeamsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type AdminAllUsersArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type AdminCollectionCountInTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminEnvironmentCountInTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminMembersCountInTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminPendingInvitationCountInTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminRequestCountInTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminTeamInfoArgs = {
  teamID: Scalars['ID']['input'];
};


export type AdminUserInfoArgs = {
  userUid: Scalars['ID']['input'];
};

export type CollectionReorderData = {
  __typename?: 'CollectionReorderData';
  /** Team Collection being moved */
  collection: TeamCollection;
  /** Team Collection succeeding the collection being moved in its new position */
  nextCollection?: Maybe<TeamCollection>;
};

export type CreateTeamRequestInput = {
  /** JSON string representing the request data */
  request: Scalars['String']['input'];
  /** ID of the team the collection belongs to */
  teamID: Scalars['ID']['input'];
  /** Displayed title of the request */
  title: Scalars['String']['input'];
};

export type InvitedUser = {
  __typename?: 'InvitedUser';
  /** Admin email */
  adminEmail: Scalars['String']['output'];
  /** Admin UID */
  adminUid: Scalars['ID']['output'];
  /** Date when the user invitation was sent */
  invitedOn: Scalars['DateTime']['output'];
  /** Invitee email */
  inviteeEmail: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept an Invitation */
  acceptTeamInvitation: TeamMember;
  /** Add a user to a team with email and team member role */
  addUserToTeamByAdmin: TeamMember;
  /** Change the role of a user in a team */
  changeUserRoleInTeamByAdmin: TeamMember;
  /** Deletes all variables inside a users global environment */
  clearGlobalEnvironments: UserEnvironment;
  /** Create a collection that has a parent collection */
  createChildCollection: TeamCollection;
  /** Create a duplicate of an existing environment */
  createDuplicateEnvironment: TeamEnvironment;
  /** Creates a new child GraphQL user collection */
  createGQLChildUserCollection: UserCollection;
  /** Creates root GraphQL user collection(no parent user collection) */
  createGQLRootUserCollection: UserCollection;
  /** Create a new user GraphQL request */
  createGQLUserRequest: UserRequest;
  /** Creates a new child REST user collection */
  createRESTChildUserCollection: UserCollection;
  /** Creates root REST user collection(no parent user collection) */
  createRESTRootUserCollection: UserCollection;
  /** Create a new user REST request */
  createRESTUserRequest: UserRequest;
  /** Create a team request in the given collection. */
  createRequestInCollection: TeamRequest;
  /** Creates a collection at the root of the team hierarchy (no parent collection) */
  createRootCollection: TeamCollection;
  /** Create a shortcode for the given request. */
  createShortcode: Shortcode;
  /** Creates a team owned by the executing user */
  createTeam: Team;
  /** Create a new team by providing the user uid to nominate as Team owner */
  createTeamByAdmin: Team;
  /** Create a new Team Environment for given Team ID */
  createTeamEnvironment: TeamEnvironment;
  /** Creates a Team Invitation */
  createTeamInvitation: TeamInvitation;
  /** Create a new personal user environment for given user uid */
  createUserEnvironment: UserEnvironment;
  /** Create a new global user environment for given user uid */
  createUserGlobalEnvironment: UserEnvironment;
  /** Adds a new REST/GQL request to user history */
  createUserHistory: UserHistory;
  /** Creates a new user setting */
  createUserSettings: UserSettings;
  /** Deletes all REST/GQL history for a user based on Request type */
  deleteAllUserHistory: UserHistoryDeletedManyData;
  /** Delete all variables from a Team Environment */
  deleteAllVariablesFromTeamEnvironment: TeamEnvironment;
  /** Delete a collection */
  deleteCollection: Scalars['Boolean']['output'];
  /** Delete a request with the given ID */
  deleteRequest: Scalars['Boolean']['output'];
  /** Deletes the team */
  deleteTeam: Scalars['Boolean']['output'];
  /** Delete a team */
  deleteTeamByAdmin: Scalars['Boolean']['output'];
  /** Delete a Team Environment for given Team ID */
  deleteTeamEnvironment: Scalars['Boolean']['output'];
  /** Delete an user account */
  deleteUser: Scalars['Boolean']['output'];
  /** Delete a user collection */
  deleteUserCollection: Scalars['Boolean']['output'];
  /** Deletes a users personal environment */
  deleteUserEnvironment: Scalars['Boolean']['output'];
  /** Deletes all of users personal environments */
  deleteUserEnvironments: Scalars['Int']['output'];
  /** Delete a user request */
  deleteUserRequest: Scalars['Boolean']['output'];
  /** Import collections from JSON string to the specified Team */
  importCollectionsFromJSON: Scalars['Boolean']['output'];
  /** Import collections from JSON string to the specified Team */
  importUserCollectionsFromJSON: Scalars['Boolean']['output'];
  /** Invite a user to the infra using email */
  inviteNewUser: InvitedUser;
  /** Leaves a team the executing user is a part of */
  leaveTeam: Scalars['Boolean']['output'];
  /** Make user an admin */
  makeUserAdmin: Scalars['Boolean']['output'];
  /** Move a collection into a new parent collection or the root of the team */
  moveCollection: TeamCollection;
  /** Move a request to the given collection */
  moveRequest: TeamRequest;
  /** Move user collection into new parent or root */
  moveUserCollection: UserCollection;
  /** Move and re-order of a user request within same or across collection */
  moveUserRequest: UserRequest;
  /** Removes a REST/GQL request from user history */
  removeRequestFromHistory: UserHistory;
  /** Removes the team member from the team */
  removeTeamMember: Scalars['Boolean']['output'];
  /** Remove user as admin */
  removeUserAsAdmin: Scalars['Boolean']['output'];
  /** Delete an user account from infra */
  removeUserByAdmin: Scalars['Boolean']['output'];
  /** Remove the user from a team */
  removeUserFromTeamByAdmin: Scalars['Boolean']['output'];
  /** Rename a collection */
  renameCollection: TeamCollection;
  /** Renames a team */
  renameTeam: Team;
  /** Change a team name */
  renameTeamByAdmin: Team;
  /** Rename a user collection */
  renameUserCollection: UserCollection;
  /** Replace existing collections of a specific team with collections in JSON string */
  replaceCollectionsWithJSON: Scalars['Boolean']['output'];
  /** Revoke a user generated shortcode */
  revokeShortcode: Scalars['Boolean']['output'];
  /** Revokes an invitation and deletes it */
  revokeTeamInvitation: Scalars['Boolean']['output'];
  /** Stars/Unstars a REST/GQL request in user history */
  toggleHistoryStarStatus: UserHistory;
  /** Update the order of collections */
  updateCollectionOrder: Scalars['Boolean']['output'];
  /** Update a user GraphQL request */
  updateGQLUserRequest: UserRequest;
  /** Update the order of requests in the lookup table */
  updateLookUpRequestOrder: Scalars['Boolean']['output'];
  /** Update a user REST request */
  updateRESTUserRequest: UserRequest;
  /** Update a request with the given ID */
  updateRequest: TeamRequest;
  /** Add/Edit a single environment variable or variables to a Team Environment */
  updateTeamEnvironment: TeamEnvironment;
  /** Update role of a team member the executing user owns */
  updateTeamMemberRole: TeamMember;
  /** Update the order of UserCollections inside parent collection or in root */
  updateUserCollectionOrder: Scalars['Boolean']['output'];
  /** Updates a users personal or global environment */
  updateUserEnvironment: UserEnvironment;
  /** Update user sessions */
  updateUserSessions: User;
  /** Update user setting for a given user */
  updateUserSettings: UserSettings;
};


export type MutationAcceptTeamInvitationArgs = {
  inviteID: Scalars['ID']['input'];
};


export type MutationAddUserToTeamByAdminArgs = {
  role: TeamMemberRole;
  teamID: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationChangeUserRoleInTeamByAdminArgs = {
  newRole: TeamMemberRole;
  teamID: Scalars['ID']['input'];
  userUID: Scalars['ID']['input'];
};


export type MutationClearGlobalEnvironmentsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateChildCollectionArgs = {
  childTitle: Scalars['String']['input'];
  collectionID: Scalars['ID']['input'];
};


export type MutationCreateDuplicateEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateGqlChildUserCollectionArgs = {
  parentUserCollectionID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateGqlRootUserCollectionArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateGqlUserRequestArgs = {
  collectionID: Scalars['ID']['input'];
  request: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateRestChildUserCollectionArgs = {
  parentUserCollectionID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateRestRootUserCollectionArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateRestUserRequestArgs = {
  collectionID: Scalars['ID']['input'];
  request: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateRequestInCollectionArgs = {
  collectionID: Scalars['ID']['input'];
  data: CreateTeamRequestInput;
};


export type MutationCreateRootCollectionArgs = {
  teamID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateShortcodeArgs = {
  request: Scalars['String']['input'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTeamByAdminArgs = {
  name: Scalars['String']['input'];
  userUid: Scalars['ID']['input'];
};


export type MutationCreateTeamEnvironmentArgs = {
  name: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
  variables: Scalars['String']['input'];
};


export type MutationCreateTeamInvitationArgs = {
  inviteeEmail: Scalars['String']['input'];
  inviteeRole: TeamMemberRole;
  teamID: Scalars['ID']['input'];
};


export type MutationCreateUserEnvironmentArgs = {
  name: Scalars['String']['input'];
  variables: Scalars['String']['input'];
};


export type MutationCreateUserGlobalEnvironmentArgs = {
  variables: Scalars['String']['input'];
};


export type MutationCreateUserHistoryArgs = {
  reqData: Scalars['String']['input'];
  reqType: ReqType;
  resMetadata: Scalars['String']['input'];
};


export type MutationCreateUserSettingsArgs = {
  properties: Scalars['String']['input'];
};


export type MutationDeleteAllUserHistoryArgs = {
  reqType: ReqType;
};


export type MutationDeleteAllVariablesFromTeamEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCollectionArgs = {
  collectionID: Scalars['ID']['input'];
};


export type MutationDeleteRequestArgs = {
  requestID: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type MutationDeleteTeamByAdminArgs = {
  teamID: Scalars['ID']['input'];
};


export type MutationDeleteTeamEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserCollectionArgs = {
  userCollectionID: Scalars['ID']['input'];
};


export type MutationDeleteUserEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationImportCollectionsFromJsonArgs = {
  jsonString: Scalars['String']['input'];
  parentCollectionID?: InputMaybe<Scalars['ID']['input']>;
  teamID: Scalars['ID']['input'];
};


export type MutationImportUserCollectionsFromJsonArgs = {
  jsonString: Scalars['String']['input'];
  parentCollectionID?: InputMaybe<Scalars['ID']['input']>;
  reqType: ReqType;
};


export type MutationInviteNewUserArgs = {
  inviteeEmail: Scalars['String']['input'];
};


export type MutationLeaveTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type MutationMakeUserAdminArgs = {
  userUID: Scalars['ID']['input'];
};


export type MutationMoveCollectionArgs = {
  collectionID: Scalars['ID']['input'];
  parentCollectionID?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationMoveRequestArgs = {
  destCollID: Scalars['ID']['input'];
  nextRequestID?: InputMaybe<Scalars['ID']['input']>;
  requestID: Scalars['ID']['input'];
  srcCollID?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationMoveUserCollectionArgs = {
  destCollectionID?: InputMaybe<Scalars['ID']['input']>;
  userCollectionID: Scalars['ID']['input'];
};


export type MutationMoveUserRequestArgs = {
  destinationCollectionID: Scalars['ID']['input'];
  nextRequestID?: InputMaybe<Scalars['ID']['input']>;
  requestID: Scalars['ID']['input'];
  sourceCollectionID: Scalars['ID']['input'];
};


export type MutationRemoveRequestFromHistoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  teamID: Scalars['ID']['input'];
  userUid: Scalars['ID']['input'];
};


export type MutationRemoveUserAsAdminArgs = {
  userUID: Scalars['ID']['input'];
};


export type MutationRemoveUserByAdminArgs = {
  userUID: Scalars['ID']['input'];
};


export type MutationRemoveUserFromTeamByAdminArgs = {
  teamID: Scalars['ID']['input'];
  userUid: Scalars['ID']['input'];
};


export type MutationRenameCollectionArgs = {
  collectionID: Scalars['ID']['input'];
  newTitle: Scalars['String']['input'];
};


export type MutationRenameTeamArgs = {
  newName: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
};


export type MutationRenameTeamByAdminArgs = {
  newName: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
};


export type MutationRenameUserCollectionArgs = {
  newTitle: Scalars['String']['input'];
  userCollectionID: Scalars['ID']['input'];
};


export type MutationReplaceCollectionsWithJsonArgs = {
  jsonString: Scalars['String']['input'];
  parentCollectionID?: InputMaybe<Scalars['ID']['input']>;
  teamID: Scalars['ID']['input'];
};


export type MutationRevokeShortcodeArgs = {
  code: Scalars['ID']['input'];
};


export type MutationRevokeTeamInvitationArgs = {
  inviteID: Scalars['ID']['input'];
};


export type MutationToggleHistoryStarStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCollectionOrderArgs = {
  collectionID: Scalars['ID']['input'];
  destCollID?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateGqlUserRequestArgs = {
  id: Scalars['ID']['input'];
  request?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateLookUpRequestOrderArgs = {
  collectionID: Scalars['ID']['input'];
  nextRequestID?: InputMaybe<Scalars['ID']['input']>;
  requestID: Scalars['ID']['input'];
};


export type MutationUpdateRestUserRequestArgs = {
  id: Scalars['ID']['input'];
  request?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateRequestArgs = {
  data: UpdateTeamRequestInput;
  requestID: Scalars['ID']['input'];
};


export type MutationUpdateTeamEnvironmentArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  variables: Scalars['String']['input'];
};


export type MutationUpdateTeamMemberRoleArgs = {
  newRole: TeamMemberRole;
  teamID: Scalars['ID']['input'];
  userUid: Scalars['ID']['input'];
};


export type MutationUpdateUserCollectionOrderArgs = {
  collectionID: Scalars['ID']['input'];
  nextCollectionID?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateUserEnvironmentArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  variables: Scalars['String']['input'];
};


export type MutationUpdateUserSessionsArgs = {
  currentSession: Scalars['String']['input'];
  sessionType: SessionType;
};


export type MutationUpdateUserSettingsArgs = {
  properties: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Gives details of the admin executing this query */
  admin: Admin;
  /** Get a Team Collection with ID or null (if not exists) */
  collection?: Maybe<TeamCollection>;
  /** Returns the JSON string giving the collections and their contents of the team */
  exportCollectionsToJSON: Scalars['String']['output'];
  /** Returns the JSON string giving the collections and their contents of a user */
  exportUserCollectionsToJSON: UserCollectionExportJsonData;
  /** Gives details of the user executing this query (pass Authorization 'Bearer' header) */
  me: User;
  /** List all shortcodes the current user has generated */
  myShortcodes: Array<Shortcode>;
  /** List of teams that the executing user belongs to. */
  myTeams: Array<Team>;
  /** Gives a request with the given ID or null (if not exists) */
  request?: Maybe<TeamRequest>;
  /** Gives a paginated list of requests in the collection */
  requestsInCollection: Array<TeamRequest>;
  /** Returns the collections of a team */
  rootCollectionsOfTeam: Array<TeamCollection>;
  /** Get the root GraphQL user collections for a user */
  rootGQLUserCollections: Array<UserCollection>;
  /** Get the root REST user collections for a user */
  rootRESTUserCollections: Array<UserCollection>;
  /** Search the team for a specific request with title */
  searchForRequest: Array<TeamRequest>;
  /** Resolves and returns a shortcode data */
  shortcode?: Maybe<Shortcode>;
  /** Returns the detail of the team with the given ID */
  team?: Maybe<Team>;
  /** Gets the Team Invitation with the given ID, or null if not exists */
  teamInvitation: TeamInvitation;
  /** Get user collection with ID */
  userCollection: UserCollection;
  /** Get GraphQL user requests */
  userGQLRequests: Array<UserRequest>;
  /** Get REST user requests */
  userRESTRequests: Array<UserRequest>;
  /** Get a user request by ID */
  userRequest: UserRequest;
};


export type QueryCollectionArgs = {
  collectionID: Scalars['ID']['input'];
};


export type QueryExportCollectionsToJsonArgs = {
  teamID: Scalars['ID']['input'];
};


export type QueryExportUserCollectionsToJsonArgs = {
  collectionID?: InputMaybe<Scalars['ID']['input']>;
  collectionType: ReqType;
};


export type QueryMyShortcodesArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyTeamsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryRequestArgs = {
  requestID: Scalars['ID']['input'];
};


export type QueryRequestsInCollectionArgs = {
  collectionID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootCollectionsOfTeamArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  teamID: Scalars['ID']['input'];
};


export type QueryRootGqlUserCollectionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootRestUserCollectionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchForRequestArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  searchTerm: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  teamID: Scalars['ID']['input'];
};


export type QueryShortcodeArgs = {
  code: Scalars['ID']['input'];
};


export type QueryTeamArgs = {
  teamID: Scalars['ID']['input'];
};


export type QueryTeamInvitationArgs = {
  inviteID: Scalars['ID']['input'];
};


export type QueryUserCollectionArgs = {
  userCollectionID: Scalars['ID']['input'];
};


export type QueryUserGqlRequestsArgs = {
  collectionID?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserRestRequestsArgs = {
  collectionID?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserRequestArgs = {
  id: Scalars['ID']['input'];
};

export enum ReqType {
  Gql = 'GQL',
  Rest = 'REST'
}

export type RequestReorderData = {
  __typename?: 'RequestReorderData';
  /** Team Request succeeding the request being moved in its new position */
  nextRequest?: Maybe<TeamRequest>;
  /** Team Request being moved */
  request: TeamRequest;
};

export enum SessionType {
  Gql = 'GQL',
  Rest = 'REST'
}

export type Shortcode = {
  __typename?: 'Shortcode';
  /** Timestamp of when the Shortcode was created */
  createdOn: Scalars['DateTime']['output'];
  /** The shortcode. 12 digit alphanumeric. */
  id: Scalars['ID']['output'];
  /** JSON string representing the request data */
  request: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Listen to when a collections position has changed */
  collectionOrderUpdated: CollectionReorderData;
  /** Listen for shortcode creation */
  myShortcodesCreated: Shortcode;
  /** Listen for shortcode deletion */
  myShortcodesRevoked: Shortcode;
  /** Emitted when a request has been moved from one collection into another */
  requestMoved: TeamRequest;
  /** Emitted when a requests position has been changed in its collection */
  requestOrderUpdated: RequestReorderData;
  /** Listen to when a collection has been added to a team. The emitted value is the team added */
  teamCollectionAdded: TeamCollection;
  /** Listen to when a collection has been moved */
  teamCollectionMoved: TeamCollection;
  /** Listen to when a collection has been removed */
  teamCollectionRemoved: Scalars['ID']['output'];
  /** Listen to when a collection has been updated. */
  teamCollectionUpdated: TeamCollection;
  /** Listen for Team Environment Creation Messages */
  teamEnvironmentCreated: TeamEnvironment;
  /** Listen for Team Environment Deletion Messages */
  teamEnvironmentDeleted: TeamEnvironment;
  /** Listen for Team Environment Updates */
  teamEnvironmentUpdated: TeamEnvironment;
  /** Listens to when a Team Invitation is added */
  teamInvitationAdded: TeamInvitation;
  /** Listens to when a Team Invitation is removed */
  teamInvitationRemoved: Scalars['ID']['output'];
  /** Listen to when a new team member being added to the team. The emitted value is the new team member added. */
  teamMemberAdded: TeamMember;
  /** Listen to when a team member has been removed. The emitted value is the uid of the user removed */
  teamMemberRemoved: Scalars['ID']['output'];
  /** Listen to when a team member status has been updated. The emitted value is the new team member status */
  teamMemberUpdated: TeamMember;
  /** Emits when a new request is added to a team */
  teamRequestAdded: TeamRequest;
  /** Emitted when a request has been deleted. Only the id of the request is emitted. */
  teamRequestDeleted: Scalars['ID']['output'];
  /** Emitted when a request has been updated */
  teamRequestUpdated: TeamRequest;
  /** Listen for User Collection Creation */
  userCollectionCreated: UserCollection;
  /** Listen to when a User Collection has been moved */
  userCollectionMoved: UserCollection;
  /** Listen to when a User Collections position has changed */
  userCollectionOrderUpdated: UserCollectionReorderData;
  /** Listen to when a User Collection has been deleted */
  userCollectionRemoved: UserCollectionRemovedData;
  /** Listen to when a User Collection has been updated. */
  userCollectionUpdated: UserCollection;
  /** Listen for user deletion */
  userDeleted: User;
  /** Listen for User Environment Creation */
  userEnvironmentCreated: UserEnvironment;
  /** Listen for User Environment DeleteMany */
  userEnvironmentDeleteMany: Scalars['Int']['output'];
  /** Listen for User Environment deletion */
  userEnvironmentDeleted: UserEnvironment;
  /** Listen for User Environment updates */
  userEnvironmentUpdated: UserEnvironment;
  /** Listen for User History Creation */
  userHistoryCreated: UserHistory;
  /** Listen for User History deletion */
  userHistoryDeleted: UserHistory;
  /** Listen for User History deleted many */
  userHistoryDeletedMany: UserHistoryDeletedManyData;
  /** Listen for User History update */
  userHistoryUpdated: UserHistory;
  /** Listen for User Invitation */
  userInvited: InvitedUser;
  /** Listen for User Request Creation */
  userRequestCreated: UserRequest;
  /** Listen for User Request Deletion */
  userRequestDeleted: UserRequest;
  /** Listen for User Request Moved */
  userRequestMoved: UserRequestReorderData;
  /** Listen for User Request Update */
  userRequestUpdated: UserRequest;
  /** Listen for user setting creation */
  userSettingsCreated: UserSettings;
  /** Listen for user setting updates */
  userSettingsUpdated: UserSettings;
  /** Listen for user updates */
  userUpdated: User;
};


export type SubscriptionCollectionOrderUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionRequestMovedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionRequestOrderUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamCollectionAddedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamCollectionMovedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamCollectionRemovedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamCollectionUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamEnvironmentCreatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamEnvironmentDeletedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamEnvironmentUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamInvitationAddedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamInvitationRemovedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamMemberAddedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamMemberRemovedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamMemberUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamRequestAddedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamRequestDeletedArgs = {
  teamID: Scalars['ID']['input'];
};


export type SubscriptionTeamRequestUpdatedArgs = {
  teamID: Scalars['ID']['input'];
};

export type Team = {
  __typename?: 'Team';
  /** The number of users with the EDITOR role in the team */
  editorsCount: Scalars['Int']['output'];
  /** ID of the team */
  id: Scalars['ID']['output'];
  /** Returns the list of members of a team */
  members: Array<TeamMember>;
  /** The role of the current user in the team */
  myRole?: Maybe<TeamMemberRole>;
  /** Displayed name of the team */
  name: Scalars['String']['output'];
  /** The number of users with the OWNER role in the team */
  ownersCount: Scalars['Int']['output'];
  /** Returns all Team Environments for the given Team */
  teamEnvironments: Array<TeamEnvironment>;
  /** Get all the active invites in the team */
  teamInvitations: Array<TeamInvitation>;
  /** Returns the list of members of a team */
  teamMembers: Array<TeamMember>;
  /** The number of users with the VIEWER role in the team */
  viewersCount: Scalars['Int']['output'];
};


export type TeamMembersArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
};

export type TeamCollection = {
  __typename?: 'TeamCollection';
  /** List of children Team Collections */
  children: Array<TeamCollection>;
  /** ID of the collection */
  id: Scalars['ID']['output'];
  /** Return the parent Team Collection (null if root ) */
  parent?: Maybe<TeamCollection>;
  /** ID of the collection */
  parentID?: Maybe<Scalars['ID']['output']>;
  /** Team the collection belongs to */
  team: Team;
  /** Displayed title of the collection */
  title: Scalars['String']['output'];
};


export type TeamCollectionChildrenArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type TeamEnvironment = {
  __typename?: 'TeamEnvironment';
  /** ID of the Team Environment */
  id: Scalars['ID']['output'];
  /** Name of the environment */
  name: Scalars['String']['output'];
  /** ID of the team this environment belongs to */
  teamID: Scalars['ID']['output'];
  /** All variables present in the environment */
  variables: Scalars['String']['output'];
};

export type TeamInvitation = {
  __typename?: 'TeamInvitation';
  /** Get the creator of the invite */
  creator: User;
  /** UID of the creator of the invite */
  creatorUid: Scalars['ID']['output'];
  /** ID of the invite */
  id: Scalars['ID']['output'];
  /** Email of the invitee */
  inviteeEmail: Scalars['String']['output'];
  /** The role that will be given to the invitee */
  inviteeRole: TeamMemberRole;
  /** Get the team associated to the invite */
  team: Team;
  /** ID of the team the invite is to */
  teamID: Scalars['ID']['output'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  /** Membership ID of the Team Member */
  membershipID: Scalars['ID']['output'];
  /** Role of the given team member in the given team */
  role: TeamMemberRole;
  user: User;
};

export enum TeamMemberRole {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export type TeamRequest = {
  __typename?: 'TeamRequest';
  /** Collection the request belongs to */
  collection: TeamCollection;
  /** ID of the collection the request belongs to. */
  collectionID: Scalars['ID']['output'];
  /** ID of the request */
  id: Scalars['ID']['output'];
  /** JSON string representing the request data */
  request: Scalars['String']['output'];
  /** Team the request belongs to */
  team: Team;
  /** ID of the team the request belongs to. */
  teamID: Scalars['ID']['output'];
  /** Displayed title of the request */
  title: Scalars['String']['output'];
};

export type UpdateTeamRequestInput = {
  /** JSON string representing the request data */
  request?: InputMaybe<Scalars['String']['input']>;
  /** Displayed title of the request */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Returns a users GraphQL history */
  GQLHistory: Array<UserHistory>;
  /** Returns a users REST history */
  RESTHistory: Array<UserHistory>;
  /** Date when the user account was created */
  createdOn: Scalars['DateTime']['output'];
  /** Stringified current GraphQL session for logged-in User */
  currentGQLSession?: Maybe<Scalars['String']['output']>;
  /** Stringified current REST session for logged-in User */
  currentRESTSession?: Maybe<Scalars['String']['output']>;
  /** Name of the user (if fetched) */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Email of the user */
  email?: Maybe<Scalars['String']['output']>;
  /** Returns a list of users personal environments */
  environments: Array<UserEnvironment>;
  /** Returns the users global environments */
  globalEnvironments: UserEnvironment;
  /** Flag to determine if user is an Admin or not */
  isAdmin: Scalars['Boolean']['output'];
  /** URL to the profile photo of the user (if fetched) */
  photoURL?: Maybe<Scalars['String']['output']>;
  /** Returns user settings */
  settings: UserSettings;
  /** UID of the user */
  uid: Scalars['ID']['output'];
};


export type UserGqlHistoryArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type UserRestHistoryArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UserCollection = {
  __typename?: 'UserCollection';
  /** List of children GraphQL user collection */
  childrenGQL: Array<UserCollection>;
  /** List of children REST user collection */
  childrenREST: Array<UserCollection>;
  /** ID of the user collection */
  id: Scalars['ID']['output'];
  /** Parent user collection (null if root) */
  parent?: Maybe<UserCollection>;
  /** Returns user requests of a user collection */
  requests: Array<UserRequest>;
  /** Displayed title of the user collection */
  title: Scalars['String']['output'];
  /** Type of the user collection */
  type: ReqType;
  /** User the collection belongs to */
  user: User;
};


export type UserCollectionChildrenGqlArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type UserCollectionChildrenRestArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type UserCollectionRequestsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UserCollectionExportJsonData = {
  __typename?: 'UserCollectionExportJSONData';
  /** Type of the user collection */
  collectionType: ReqType;
  /** Stringified contents of the collection */
  exportedCollection: Scalars['ID']['output'];
};

export type UserCollectionRemovedData = {
  __typename?: 'UserCollectionRemovedData';
  /** ID of User Collection being removed */
  id: Scalars['ID']['output'];
  /** Type of the user collection */
  type: ReqType;
};

export type UserCollectionReorderData = {
  __typename?: 'UserCollectionReorderData';
  /** User Collection succeeding the collection being moved in its new position */
  nextUserCollection?: Maybe<UserCollection>;
  /** User Collection being moved */
  userCollection: UserCollection;
};

export type UserEnvironment = {
  __typename?: 'UserEnvironment';
  /** ID of the User Environment */
  id: Scalars['ID']['output'];
  /** Flag to indicate the environment is global or not */
  isGlobal: Scalars['Boolean']['output'];
  /** Name of the environment */
  name?: Maybe<Scalars['String']['output']>;
  /** ID of the user this environment belongs to */
  userUid: Scalars['ID']['output'];
  /** All variables present in the environment */
  variables: Scalars['String']['output'];
};

export type UserHistory = {
  __typename?: 'UserHistory';
  /** Timestamp of when the request was executed or history was created */
  executedOn: Scalars['DateTime']['output'];
  /** ID of the user request in history */
  id: Scalars['ID']['output'];
  /** If the request in the history starred */
  isStarred: Scalars['Boolean']['output'];
  /** Type of the request in the history */
  reqType: ReqType;
  /** JSON string representing the request data */
  request: Scalars['String']['output'];
  /** JSON string representing the response meta-data */
  responseMetadata: Scalars['String']['output'];
  /** ID of the user this history belongs to */
  userUid: Scalars['ID']['output'];
};

export type UserHistoryDeletedManyData = {
  __typename?: 'UserHistoryDeletedManyData';
  /** Number of user histories deleted */
  count: Scalars['Int']['output'];
  /** Type of the request in the history */
  reqType: ReqType;
};

export type UserRequest = {
  __typename?: 'UserRequest';
  /** ID of the parent collection ID */
  collectionID: Scalars['ID']['output'];
  /** Date of the user request creation */
  createdOn: Scalars['DateTime']['output'];
  /** ID of the user request */
  id: Scalars['ID']['output'];
  /** Content/Body of the user request */
  request: Scalars['String']['output'];
  /** Title of the user request */
  title: Scalars['String']['output'];
  /** Type (GRAPHQL/REST) of the user request */
  type: ReqType;
  /** Returns the user of the user request */
  user: User;
};

export type UserRequestReorderData = {
  __typename?: 'UserRequestReorderData';
  /** User request succeeding the request being moved in its new position */
  nextRequest?: Maybe<UserRequest>;
  /** User request being moved */
  request: UserRequest;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  /** ID of the User Setting */
  id: Scalars['ID']['output'];
  /** Stringified JSON settings object */
  properties: Scalars['String']['output'];
  /** Last updated on */
  updatedOn: Scalars['DateTime']['output'];
  /** ID of the user this setting belongs to */
  userUid: Scalars['ID']['output'];
};

export type AcceptTeamInvitationMutationVariables = Exact<{
  inviteID: Scalars['ID']['input'];
}>;


export type AcceptTeamInvitationMutation = { __typename?: 'Mutation', acceptTeamInvitation: { __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, displayName?: string | null, photoURL?: string | null, email?: string | null } } };

export type CreateChildCollectionMutationVariables = Exact<{
  childTitle: Scalars['String']['input'];
  collectionID: Scalars['ID']['input'];
}>;


export type CreateChildCollectionMutation = { __typename?: 'Mutation', createChildCollection: { __typename?: 'TeamCollection', id: string } };

export type CreateDuplicateEnvironmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CreateDuplicateEnvironmentMutation = { __typename?: 'Mutation', createDuplicateEnvironment: { __typename?: 'TeamEnvironment', id: string, teamID: string, name: string, variables: string } };

export type CreateNewRootCollectionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type CreateNewRootCollectionMutation = { __typename?: 'Mutation', createRootCollection: { __typename?: 'TeamCollection', id: string } };

export type CreateRequestInCollectionMutationVariables = Exact<{
  data: CreateTeamRequestInput;
  collectionID: Scalars['ID']['input'];
}>;


export type CreateRequestInCollectionMutation = { __typename?: 'Mutation', createRequestInCollection: { __typename?: 'TeamRequest', id: string, collection: { __typename?: 'TeamCollection', id: string, team: { __typename?: 'Team', id: string, name: string } } } };

export type CreateShortcodeMutationVariables = Exact<{
  request: Scalars['String']['input'];
}>;


export type CreateShortcodeMutation = { __typename?: 'Mutation', createShortcode: { __typename?: 'Shortcode', id: string, request: string } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, myRole?: TeamMemberRole | null, ownersCount: number, editorsCount: number, viewersCount: number, members: Array<{ __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, displayName?: string | null, email?: string | null, photoURL?: string | null } }> } };

export type CreateTeamEnvironmentMutationVariables = Exact<{
  variables: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTeamEnvironmentMutation = { __typename?: 'Mutation', createTeamEnvironment: { __typename?: 'TeamEnvironment', variables: string, name: string, teamID: string } };

export type CreateTeamInvitationMutationVariables = Exact<{
  inviteeEmail: Scalars['String']['input'];
  inviteeRole: TeamMemberRole;
  teamID: Scalars['ID']['input'];
}>;


export type CreateTeamInvitationMutation = { __typename?: 'Mutation', createTeamInvitation: { __typename?: 'TeamInvitation', id: string, teamID: string, creatorUid: string, inviteeEmail: string, inviteeRole: TeamMemberRole } };

export type DeleteCollectionMutationVariables = Exact<{
  collectionID: Scalars['ID']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: boolean };

export type DeleteRequestMutationVariables = Exact<{
  requestID: Scalars['ID']['input'];
}>;


export type DeleteRequestMutation = { __typename?: 'Mutation', deleteRequest: boolean };

export type DeleteShortcodeMutationVariables = Exact<{
  code: Scalars['ID']['input'];
}>;


export type DeleteShortcodeMutation = { __typename?: 'Mutation', revokeShortcode: boolean };

export type DeleteTeamMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: boolean };

export type DeleteTeamEnvironmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTeamEnvironmentMutation = { __typename?: 'Mutation', deleteTeamEnvironment: boolean };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ImportFromJsonMutationVariables = Exact<{
  jsonString: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type ImportFromJsonMutation = { __typename?: 'Mutation', importCollectionsFromJSON: boolean };

export type LeaveTeamMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type LeaveTeamMutation = { __typename?: 'Mutation', leaveTeam: boolean };

export type MoveRestTeamCollectionMutationVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  parentCollectionID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MoveRestTeamCollectionMutation = { __typename?: 'Mutation', moveCollection: { __typename?: 'TeamCollection', id: string } };

export type MoveRestTeamRequestMutationVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  requestID: Scalars['ID']['input'];
}>;


export type MoveRestTeamRequestMutation = { __typename?: 'Mutation', moveRequest: { __typename?: 'TeamRequest', id: string } };

export type RemoveTeamMemberMutationVariables = Exact<{
  userUid: Scalars['ID']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type RemoveTeamMemberMutation = { __typename?: 'Mutation', removeTeamMember: boolean };

export type RenameCollectionMutationVariables = Exact<{
  newTitle: Scalars['String']['input'];
  collectionID: Scalars['ID']['input'];
}>;


export type RenameCollectionMutation = { __typename?: 'Mutation', renameCollection: { __typename?: 'TeamCollection', id: string } };

export type RenameTeamMutationVariables = Exact<{
  newName: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type RenameTeamMutation = { __typename?: 'Mutation', renameTeam: { __typename?: 'Team', id: string, name: string, teamMembers: Array<{ __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string } }> } };

export type RevokeTeamInvitationMutationVariables = Exact<{
  inviteID: Scalars['ID']['input'];
}>;


export type RevokeTeamInvitationMutation = { __typename?: 'Mutation', revokeTeamInvitation: boolean };

export type UpdateCollectionOrderMutationVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  destCollID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateCollectionOrderMutation = { __typename?: 'Mutation', updateCollectionOrder: boolean };

export type UpdateLookUpRequestOrderMutationVariables = Exact<{
  requestID: Scalars['ID']['input'];
  nextRequestID?: InputMaybe<Scalars['ID']['input']>;
  collectionID: Scalars['ID']['input'];
}>;


export type UpdateLookUpRequestOrderMutation = { __typename?: 'Mutation', updateLookUpRequestOrder: boolean };

export type UpdateRequestMutationVariables = Exact<{
  data: UpdateTeamRequestInput;
  requestID: Scalars['ID']['input'];
}>;


export type UpdateRequestMutation = { __typename?: 'Mutation', updateRequest: { __typename?: 'TeamRequest', id: string, title: string } };

export type UpdateTeamEnvironmentMutationVariables = Exact<{
  variables: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTeamEnvironmentMutation = { __typename?: 'Mutation', updateTeamEnvironment: { __typename?: 'TeamEnvironment', variables: string, name: string, id: string } };

export type UpdateTeamMemberRoleMutationVariables = Exact<{
  newRole: TeamMemberRole;
  userUid: Scalars['ID']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type UpdateTeamMemberRoleMutation = { __typename?: 'Mutation', updateTeamMemberRole: { __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole } };

export type UpdateUserSettingsMutationVariables = Exact<{
  properties: Scalars['String']['input'];
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSettings: { __typename?: 'UserSettings', id: string } };

export type ExportAsJsonQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type ExportAsJsonQuery = { __typename?: 'Query', exportCollectionsToJSON: string };

export type GetCollectionChildrenQueryVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCollectionChildrenQuery = { __typename?: 'Query', collection?: { __typename?: 'TeamCollection', children: Array<{ __typename?: 'TeamCollection', id: string, title: string }> } | null };

export type GetCollectionChildrenIDsQueryVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCollectionChildrenIDsQuery = { __typename?: 'Query', collection?: { __typename?: 'TeamCollection', children: Array<{ __typename?: 'TeamCollection', id: string }> } | null };

export type GetCollectionRequestsQueryVariables = Exact<{
  collectionID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCollectionRequestsQuery = { __typename?: 'Query', requestsInCollection: Array<{ __typename?: 'TeamRequest', id: string, title: string, request: string }> };

export type GetCollectionTitleQueryVariables = Exact<{
  collectionID: Scalars['ID']['input'];
}>;


export type GetCollectionTitleQuery = { __typename?: 'Query', collection?: { __typename?: 'TeamCollection', title: string } | null };

export type GetInviteDetailsQueryVariables = Exact<{
  inviteID: Scalars['ID']['input'];
}>;


export type GetInviteDetailsQuery = { __typename?: 'Query', teamInvitation: { __typename?: 'TeamInvitation', id: string, inviteeEmail: string, inviteeRole: TeamMemberRole, team: { __typename?: 'Team', id: string, name: string }, creator: { __typename?: 'User', uid: string, displayName?: string | null, email?: string | null } } };

export type GetUserShortcodesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserShortcodesQuery = { __typename?: 'Query', myShortcodes: Array<{ __typename?: 'Shortcode', id: string, request: string, createdOn: any }> };

export type GetMyTeamsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMyTeamsQuery = { __typename?: 'Query', myTeams: Array<{ __typename?: 'Team', id: string, name: string, myRole?: TeamMemberRole | null, ownersCount: number, teamMembers: Array<{ __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', photoURL?: string | null, displayName?: string | null, email?: string | null, uid: string } }> }> };

export type GetSingleCollectionQueryVariables = Exact<{
  collectionID: Scalars['ID']['input'];
}>;


export type GetSingleCollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null } | null };

export type GetSingleRequestQueryVariables = Exact<{
  requestID: Scalars['ID']['input'];
}>;


export type GetSingleRequestQuery = { __typename?: 'Query', request?: { __typename?: 'TeamRequest', id: string, collectionID: string, title: string, request: string } | null };

export type GetTeamQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, teamMembers: Array<{ __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, email?: string | null } }> } | null };

export type GetTeamEnvironmentsQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type GetTeamEnvironmentsQuery = { __typename?: 'Query', team?: { __typename?: 'Team', teamEnvironments: Array<{ __typename?: 'TeamEnvironment', id: string, name: string, variables: string, teamID: string }> } | null };

export type GetTeamMembersQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', team?: { __typename?: 'Team', members: Array<{ __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, email?: string | null } }> } | null };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, displayName?: string | null, email?: string | null, photoURL?: string | null } };

export type GetUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSettingsQuery = { __typename?: 'Query', me: { __typename?: 'User', settings: { __typename?: 'UserSettings', id: string, properties: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, displayName?: string | null, photoURL?: string | null } };

export type ResolveShortcodeQueryVariables = Exact<{
  code: Scalars['ID']['input'];
}>;


export type ResolveShortcodeQuery = { __typename?: 'Query', shortcode?: { __typename?: 'Shortcode', id: string, request: string } | null };

export type RootCollectionsOfTeamQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type RootCollectionsOfTeamQuery = { __typename?: 'Query', rootCollectionsOfTeam: Array<{ __typename?: 'TeamCollection', id: string, title: string }> };

export type GetPendingInvitesQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type GetPendingInvitesQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, teamInvitations: Array<{ __typename?: 'TeamInvitation', inviteeRole: TeamMemberRole, inviteeEmail: string, id: string }> } | null };

export type ShortcodeCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ShortcodeCreatedSubscription = { __typename?: 'Subscription', myShortcodesCreated: { __typename?: 'Shortcode', id: string, request: string, createdOn: any } };

export type ShortcodeDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ShortcodeDeletedSubscription = { __typename?: 'Subscription', myShortcodesRevoked: { __typename?: 'Shortcode', id: string } };

export type TeamCollectionAddedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamCollectionAddedSubscription = { __typename?: 'Subscription', teamCollectionAdded: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null } };

export type TeamCollectionMovedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamCollectionMovedSubscription = { __typename?: 'Subscription', teamCollectionMoved: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null } };

export type TeamCollectionOrderUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamCollectionOrderUpdatedSubscription = { __typename?: 'Subscription', collectionOrderUpdated: { __typename?: 'CollectionReorderData', collection: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null }, nextCollection?: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null } | null } };

export type TeamCollectionRemovedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamCollectionRemovedSubscription = { __typename?: 'Subscription', teamCollectionRemoved: string };

export type TeamCollectionUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamCollectionUpdatedSubscription = { __typename?: 'Subscription', teamCollectionUpdated: { __typename?: 'TeamCollection', id: string, title: string, parent?: { __typename?: 'TeamCollection', id: string } | null } };

export type TeamEnvironmentCreatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamEnvironmentCreatedSubscription = { __typename?: 'Subscription', teamEnvironmentCreated: { __typename?: 'TeamEnvironment', id: string, teamID: string, name: string, variables: string } };

export type TeamEnvironmentDeletedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamEnvironmentDeletedSubscription = { __typename?: 'Subscription', teamEnvironmentDeleted: { __typename?: 'TeamEnvironment', id: string } };

export type TeamEnvironmentUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamEnvironmentUpdatedSubscription = { __typename?: 'Subscription', teamEnvironmentUpdated: { __typename?: 'TeamEnvironment', id: string, teamID: string, name: string, variables: string } };

export type TeamInvitationAddedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamInvitationAddedSubscription = { __typename?: 'Subscription', teamInvitationAdded: { __typename?: 'TeamInvitation', id: string } };

export type TeamInvitationRemovedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamInvitationRemovedSubscription = { __typename?: 'Subscription', teamInvitationRemoved: string };

export type TeamMemberAddedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamMemberAddedSubscription = { __typename?: 'Subscription', teamMemberAdded: { __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, email?: string | null } } };

export type TeamMemberRemovedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamMemberRemovedSubscription = { __typename?: 'Subscription', teamMemberRemoved: string };

export type TeamMemberUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamMemberUpdatedSubscription = { __typename?: 'Subscription', teamMemberUpdated: { __typename?: 'TeamMember', membershipID: string, role: TeamMemberRole, user: { __typename?: 'User', uid: string, email?: string | null } } };

export type TeamRequestAddedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamRequestAddedSubscription = { __typename?: 'Subscription', teamRequestAdded: { __typename?: 'TeamRequest', id: string, collectionID: string, request: string, title: string } };

export type TeamRequestDeletedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamRequestDeletedSubscription = { __typename?: 'Subscription', teamRequestDeleted: string };

export type TeamRequestMovedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamRequestMovedSubscription = { __typename?: 'Subscription', requestMoved: { __typename?: 'TeamRequest', id: string, collectionID: string, request: string, title: string } };

export type TeamRequestOrderUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamRequestOrderUpdatedSubscription = { __typename?: 'Subscription', requestOrderUpdated: { __typename?: 'RequestReorderData', request: { __typename?: 'TeamRequest', id: string, collectionID: string, request: string, title: string }, nextRequest?: { __typename?: 'TeamRequest', id: string, collectionID: string, request: string, title: string } | null } };

export type TeamRequestUpdatedSubscriptionVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamRequestUpdatedSubscription = { __typename?: 'Subscription', teamRequestUpdated: { __typename?: 'TeamRequest', id: string, collectionID: string, request: string, title: string } };


export const AcceptTeamInvitationDocument = {"__meta__":{"hash":"0243abad0aa39a9c94c706b780d6e1b88fb5d368"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptTeamInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptTeamInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<AcceptTeamInvitationMutation, AcceptTeamInvitationMutationVariables>;
export const CreateChildCollectionDocument = {"__meta__":{"hash":"ed8f9a8a1b5f4b6056a69e6fb9856836a20a3137"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChildCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"childTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChildCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"childTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"childTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChildCollectionMutation, CreateChildCollectionMutationVariables>;
export const CreateDuplicateEnvironmentDocument = {"__meta__":{"hash":"5bed1da0e23ecbc32c814350517c15ebd3a01b5b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDuplicateEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDuplicateEnvironment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}}]}}]}}]} as unknown as DocumentNode<CreateDuplicateEnvironmentMutation, CreateDuplicateEnvironmentMutationVariables>;
export const CreateNewRootCollectionDocument = {"__meta__":{"hash":"9452ec52678a57bab378e48f1eebaeebb6264eba"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewRootCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRootCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNewRootCollectionMutation, CreateNewRootCollectionMutationVariables>;
export const CreateRequestInCollectionDocument = {"__meta__":{"hash":"d4708e862b06ae7bca40b1beac275934cd8c77e1"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRequestInCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRequestInCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRequestInCollectionMutation, CreateRequestInCollectionMutationVariables>;
export const CreateShortcodeDocument = {"__meta__":{"hash":"e61cbdd54a8bd0a7fb8ff058e637bcbd44531e89"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShortcode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShortcode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}}]}}]}}]} as unknown as DocumentNode<CreateShortcodeMutation, CreateShortcodeMutationVariables>;
export const CreateTeamDocument = {"__meta__":{"hash":"652b67f1bbe07fce0eb15346b55faec41b44d73d"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"myRole"}},{"kind":"Field","name":{"kind":"Name","value":"ownersCount"}},{"kind":"Field","name":{"kind":"Name","value":"editorsCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewersCount"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateTeamEnvironmentDocument = {"__meta__":{"hash":"6065ac35c3d4c35caf47f7e016830890cdae135d"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeamEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variables"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeamEnvironment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variables"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variables"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variables"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}}]}}]}}]} as unknown as DocumentNode<CreateTeamEnvironmentMutation, CreateTeamEnvironmentMutationVariables>;
export const CreateTeamInvitationDocument = {"__meta__":{"hash":"26c04792a54bb60cdbd74a90d3b3068a686d07d6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeamInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteeEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteeRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamMemberRole"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeamInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteeRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteeRole"}}},{"kind":"Argument","name":{"kind":"Name","value":"inviteeEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteeEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"creatorUid"}},{"kind":"Field","name":{"kind":"Name","value":"inviteeEmail"}},{"kind":"Field","name":{"kind":"Name","value":"inviteeRole"}}]}}]}}]} as unknown as DocumentNode<CreateTeamInvitationMutation, CreateTeamInvitationMutationVariables>;
export const DeleteCollectionDocument = {"__meta__":{"hash":"f4abcc3ce6d495354ef3307904303995ca84e6d2"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}]}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const DeleteRequestDocument = {"__meta__":{"hash":"e13993220f7372bb9fee639573ea7c83ce768cd7"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}}}]}]}}]} as unknown as DocumentNode<DeleteRequestMutation, DeleteRequestMutationVariables>;
export const DeleteShortcodeDocument = {"__meta__":{"hash":"603eea3798cc18d02f8eedcebc3cc0586e64d2ab"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShortcode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeShortcode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<DeleteShortcodeMutation, DeleteShortcodeMutationVariables>;
export const DeleteTeamDocument = {"__meta__":{"hash":"2038fa965f0c46ee64f0df99bc35ed60c0e9192b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const DeleteTeamEnvironmentDocument = {"__meta__":{"hash":"21d20c3fc210f0437a3a7522ec536492180f21d6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeamEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeamEnvironment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTeamEnvironmentMutation, DeleteTeamEnvironmentMutationVariables>;
export const DeleteUserDocument = {"__meta__":{"hash":"abcb97048bc169a0e70671e163438840a1869b6f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ImportFromJsonDocument = {"__meta__":{"hash":"ecbf0dc92fec84ebeb50f74e1425d7ccce4f5541"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"importFromJSON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jsonString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importCollectionsFromJSON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jsonString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jsonString"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<ImportFromJsonMutation, ImportFromJsonMutationVariables>;
export const LeaveTeamDocument = {"__meta__":{"hash":"797970a1eef9eb1c9352d2e99386398c461c577e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const MoveRestTeamCollectionDocument = {"__meta__":{"hash":"d437ef13c9fc64925b8a1b3634e7505c8dd43626"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveRESTTeamCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentCollectionID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentCollectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentCollectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MoveRestTeamCollectionMutation, MoveRestTeamCollectionMutationVariables>;
export const MoveRestTeamRequestDocument = {"__meta__":{"hash":"9e9a1f6d0c07e3d3d15b14c39a53b2f872c43d3a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveRESTTeamRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"destCollID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"requestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MoveRestTeamRequestMutation, MoveRestTeamRequestMutationVariables>;
export const RemoveTeamMemberDocument = {"__meta__":{"hash":"f9e1a28e81529a26521a442a30e67c432fc09aa4"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;
export const RenameCollectionDocument = {"__meta__":{"hash":"131c0c9148a28880465a0a8462c5a0e27115075c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RenameCollectionMutation, RenameCollectionMutationVariables>;
export const RenameTeamDocument = {"__meta__":{"hash":"725a4f7878b369bd6987c0e9bf145e8037cd7d9a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newName"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<RenameTeamMutation, RenameTeamMutationVariables>;
export const RevokeTeamInvitationDocument = {"__meta__":{"hash":"c8d95b57b35bec9e8a23c4f6fc90c731e17c838e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeTeamInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeTeamInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}}}]}]}}]} as unknown as DocumentNode<RevokeTeamInvitationMutation, RevokeTeamInvitationMutationVariables>;
export const UpdateCollectionOrderDocument = {"__meta__":{"hash":"c6026625eafcd8f4f8ab59081d1d93475cd9e2e4"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"destCollID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollectionOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"destCollID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"destCollID"}}}]}]}}]} as unknown as DocumentNode<UpdateCollectionOrderMutation, UpdateCollectionOrderMutationVariables>;
export const UpdateLookUpRequestOrderDocument = {"__meta__":{"hash":"6f007a07d92d70d9c13a7dd9833f66aa0710f42b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLookUpRequestOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextRequestID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLookUpRequestOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextRequestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextRequestID"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}]}]}}]} as unknown as DocumentNode<UpdateLookUpRequestOrderMutation, UpdateLookUpRequestOrderMutationVariables>;
export const UpdateRequestDocument = {"__meta__":{"hash":"55acc720450280c7210efaf64045ef62664608fc"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTeamRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"requestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateRequestMutation, UpdateRequestMutationVariables>;
export const UpdateTeamEnvironmentDocument = {"__meta__":{"hash":"efb18e81da388dff4e30d58e6d719ed087f320d4"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeamEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variables"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeamEnvironment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variables"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variables"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variables"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTeamEnvironmentMutation, UpdateTeamEnvironmentMutationVariables>;
export const UpdateTeamMemberRoleDocument = {"__meta__":{"hash":"7adce9fb4df396cf3d77a271d1e292d488c473fb"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeamMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamMemberRole"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeamMemberRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newRole"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>;
export const UpdateUserSettingsDocument = {"__meta__":{"hash":"bf5a231a6e0fff71a331d9496fb8746e5af91ae6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"properties"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"properties"},"value":{"kind":"Variable","name":{"kind":"Name","value":"properties"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;
export const ExportAsJsonDocument = {"__meta__":{"hash":"207bd3e68c2c20317b9005412dffb5e3018d83e0"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportAsJSON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportCollectionsToJSON"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<ExportAsJsonQuery, ExportAsJsonQueryVariables>;
export const GetCollectionChildrenDocument = {"__meta__":{"hash":"eb2928f3f5bcbacd6931bb0cb05bdbcd1cbefee1"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionChildren"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"children"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionChildrenQuery, GetCollectionChildrenQueryVariables>;
export const GetCollectionChildrenIDsDocument = {"__meta__":{"hash":"dc70c57c74c8fcbde3e7c7619b60af1ddd999b45"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionChildrenIDs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"children"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionChildrenIDsQuery, GetCollectionChildrenIDsQueryVariables>;
export const GetCollectionRequestsDocument = {"__meta__":{"hash":"49f176ca6fd20de003067e5110953ca6bd1b0593"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestsInCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"request"}}]}}]}}]} as unknown as DocumentNode<GetCollectionRequestsQuery, GetCollectionRequestsQueryVariables>;
export const GetCollectionTitleDocument = {"__meta__":{"hash":"a838fc5261eeb65978980f726f17848acb785f40"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCollectionTitleQuery, GetCollectionTitleQueryVariables>;
export const GetInviteDetailsDocument = {"__meta__":{"hash":"bbc25f5421faa9f503542639004514fa94729d05"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInviteDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"inviteeEmail"}},{"kind":"Field","name":{"kind":"Name","value":"inviteeRole"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetInviteDetailsQuery, GetInviteDetailsQueryVariables>;
export const GetUserShortcodesDocument = {"__meta__":{"hash":"bcc12885cc27619e511390004ea89519bc6b7327"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserShortcodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myShortcodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"createdOn"}}]}}]}}]} as unknown as DocumentNode<GetUserShortcodesQuery, GetUserShortcodesQueryVariables>;
export const GetMyTeamsDocument = {"__meta__":{"hash":"6eb1889289fc46133f4370aad4785f9b48920852"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyTeams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTeams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"myRole"}},{"kind":"Field","name":{"kind":"Name","value":"ownersCount"}},{"kind":"Field","name":{"kind":"Name","value":"teamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyTeamsQuery, GetMyTeamsQueryVariables>;
export const GetSingleCollectionDocument = {"__meta__":{"hash":"d877d5c1759f4af8defb6f962c6e3d13c2d2d1cf"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetSingleCollectionQuery, GetSingleCollectionQueryVariables>;
export const GetSingleRequestDocument = {"__meta__":{"hash":"f85e80f2f8a3907c67b3aec20e1119eb429b622c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"request"}}]}}]}}]} as unknown as DocumentNode<GetSingleRequestQuery, GetSingleRequestQueryVariables>;
export const GetTeamDocument = {"__meta__":{"hash":"fb65b1d364c218d6f622ac04c8d32e7bc08dab7b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamEnvironmentsDocument = {"__meta__":{"hash":"fee4004da886321bb2c672636cb438971be1a673"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamEnvironments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamEnvironments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamEnvironmentsQuery, GetTeamEnvironmentsQueryVariables>;
export const GetTeamMembersDocument = {"__meta__":{"hash":"e6fe4d5b782a2597a3aa6b198eb49ebe509fad68"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const GetUserInfoDocument = {"__meta__":{"hash":"e89ee203b442dc4de61eb627aca12304652671bb"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]} as unknown as DocumentNode<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetUserSettingsDocument = {"__meta__":{"hash":"98a4c6f212ccc8d65489325b2bca70ef82f84802"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserSettingsQuery, GetUserSettingsQueryVariables>;
export const MeDocument = {"__meta__":{"hash":"1c5c4ada0f108b1db1adeabf722f3b75797e7df5"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ResolveShortcodeDocument = {"__meta__":{"hash":"4f2a4b93c1838dd477007be24aa5c3e846d2188b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResolveShortcode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortcode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}}]}}]}}]} as unknown as DocumentNode<ResolveShortcodeQuery, ResolveShortcodeQueryVariables>;
export const RootCollectionsOfTeamDocument = {"__meta__":{"hash":"91615c5938b9449cd661eb383980b1057c7b8a58"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RootCollectionsOfTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rootCollectionsOfTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<RootCollectionsOfTeamQuery, RootCollectionsOfTeamQueryVariables>;
export const GetPendingInvitesDocument = {"__meta__":{"hash":"ff3f5efcb5991b24cb1d9cb2f91da4d8d9b6cb87"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPendingInvites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteeRole"}},{"kind":"Field","name":{"kind":"Name","value":"inviteeEmail"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPendingInvitesQuery, GetPendingInvitesQueryVariables>;
export const ShortcodeCreatedDocument = {"__meta__":{"hash":"76c9d0e019c8b9df36559a66e7d5d49155a71300"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ShortcodeCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myShortcodesCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"createdOn"}}]}}]}}]} as unknown as DocumentNode<ShortcodeCreatedSubscription, ShortcodeCreatedSubscriptionVariables>;
export const ShortcodeDeletedDocument = {"__meta__":{"hash":"bbeb4a43a845f6ff0040676c3610dd55af20e0f9"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ShortcodeDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myShortcodesRevoked"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ShortcodeDeletedSubscription, ShortcodeDeletedSubscriptionVariables>;
export const TeamCollectionAddedDocument = {"__meta__":{"hash":"448131b16224288ae3734193fae07dd16b175310"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamCollectionAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollectionAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TeamCollectionAddedSubscription, TeamCollectionAddedSubscriptionVariables>;
export const TeamCollectionMovedDocument = {"__meta__":{"hash":"469d3da8de2e19c41c52ad911e0a72c356bcb2ba"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamCollectionMoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollectionMoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TeamCollectionMovedSubscription, TeamCollectionMovedSubscriptionVariables>;
export const TeamCollectionOrderUpdatedDocument = {"__meta__":{"hash":"850aee2762017a8d44bfdc85f9d45d696518bf2e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamCollectionOrderUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionOrderUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamCollectionOrderUpdatedSubscription, TeamCollectionOrderUpdatedSubscriptionVariables>;
export const TeamCollectionRemovedDocument = {"__meta__":{"hash":"5df9f25931fb60746fbb67dc7b799236fbe3535a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamCollectionRemoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollectionRemoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<TeamCollectionRemovedSubscription, TeamCollectionRemovedSubscriptionVariables>;
export const TeamCollectionUpdatedDocument = {"__meta__":{"hash":"c0c76913415936e045a62110965fbf808d5fc5d7"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamCollectionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollectionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TeamCollectionUpdatedSubscription, TeamCollectionUpdatedSubscriptionVariables>;
export const TeamEnvironmentCreatedDocument = {"__meta__":{"hash":"6a8f8f012e1d4d393eab51eb5a3c481124962ccf"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamEnvironmentCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamEnvironmentCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}}]}}]}}]} as unknown as DocumentNode<TeamEnvironmentCreatedSubscription, TeamEnvironmentCreatedSubscriptionVariables>;
export const TeamEnvironmentDeletedDocument = {"__meta__":{"hash":"586b02e88627ad680658848f5b77db0cc0dce8cd"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamEnvironmentDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamEnvironmentDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TeamEnvironmentDeletedSubscription, TeamEnvironmentDeletedSubscriptionVariables>;
export const TeamEnvironmentUpdatedDocument = {"__meta__":{"hash":"5c266b235b7fe153e2411e46626559608f94d464"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamEnvironmentUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamEnvironmentUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}}]}}]}}]} as unknown as DocumentNode<TeamEnvironmentUpdatedSubscription, TeamEnvironmentUpdatedSubscriptionVariables>;
export const TeamInvitationAddedDocument = {"__meta__":{"hash":"463d97e2cd58d38d7b4b05a701629696adee421f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamInvitationAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamInvitationAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TeamInvitationAddedSubscription, TeamInvitationAddedSubscriptionVariables>;
export const TeamInvitationRemovedDocument = {"__meta__":{"hash":"ff2d67d8c188d374ca773c2707d9dca35427c180"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamInvitationRemoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamInvitationRemoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<TeamInvitationRemovedSubscription, TeamInvitationRemovedSubscriptionVariables>;
export const TeamMemberAddedDocument = {"__meta__":{"hash":"f42a4855512551b80f7278d78e31840de7b0722d"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamMemberAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamMemberAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<TeamMemberAddedSubscription, TeamMemberAddedSubscriptionVariables>;
export const TeamMemberRemovedDocument = {"__meta__":{"hash":"a4948034dace7318509e2ed5b1693deeffe230bf"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamMemberRemoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamMemberRemoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<TeamMemberRemovedSubscription, TeamMemberRemovedSubscriptionVariables>;
export const TeamMemberUpdatedDocument = {"__meta__":{"hash":"80f370bcabf24d42abe3b1f620ea22c46a1e1d61"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamMemberUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamMemberUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<TeamMemberUpdatedSubscription, TeamMemberUpdatedSubscriptionVariables>;
export const TeamRequestAddedDocument = {"__meta__":{"hash":"610d7587a57f4c580cde0a83c7493467a4c23480"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamRequestAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamRequestAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<TeamRequestAddedSubscription, TeamRequestAddedSubscriptionVariables>;
export const TeamRequestDeletedDocument = {"__meta__":{"hash":"cc211d6f836d5ed0ccf2b569a7ac1619b2423306"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamRequestDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamRequestDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}]}}]} as unknown as DocumentNode<TeamRequestDeletedSubscription, TeamRequestDeletedSubscriptionVariables>;
export const TeamRequestMovedDocument = {"__meta__":{"hash":"a1e4c192a8a6dc8c3db865bc81f1d30cc0db5bb5"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamRequestMoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestMoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<TeamRequestMovedSubscription, TeamRequestMovedSubscriptionVariables>;
export const TeamRequestOrderUpdatedDocument = {"__meta__":{"hash":"e3606c82a707569dddd25f2772c28d5a277cf243"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamRequestOrderUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOrderUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<TeamRequestOrderUpdatedSubscription, TeamRequestOrderUpdatedSubscriptionVariables>;
export const TeamRequestUpdatedDocument = {"__meta__":{"hash":"9c92293d68386107981d9d786cdc6f4162c72bc2"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TeamRequestUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamRequestUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collectionID"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<TeamRequestUpdatedSubscription, TeamRequestUpdatedSubscriptionVariables>;