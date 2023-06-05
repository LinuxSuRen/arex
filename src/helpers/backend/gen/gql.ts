/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AcceptTeamInvitation($inviteID: ID!) {\n  acceptTeamInvitation(inviteID: $inviteID) {\n    membershipID\n    role\n    user {\n      uid\n      displayName\n      photoURL\n      email\n    }\n  }\n}": types.AcceptTeamInvitationDocument,
    "mutation CreateChildCollection($childTitle: String!, $collectionID: ID!) {\n  createChildCollection(childTitle: $childTitle, collectionID: $collectionID) {\n    id\n  }\n}": types.CreateChildCollectionDocument,
    "mutation CreateDuplicateEnvironment($id: ID!) {\n  createDuplicateEnvironment(id: $id) {\n    id\n    teamID\n    name\n    variables\n  }\n}": types.CreateDuplicateEnvironmentDocument,
    "mutation CreateNewRootCollection($title: String!, $teamID: ID!) {\n  createRootCollection(title: $title, teamID: $teamID) {\n    id\n  }\n}": types.CreateNewRootCollectionDocument,
    "mutation CreateRequestInCollection($data: CreateTeamRequestInput!, $collectionID: ID!) {\n  createRequestInCollection(data: $data, collectionID: $collectionID) {\n    id\n    collection {\n      id\n      team {\n        id\n        name\n      }\n    }\n  }\n}": types.CreateRequestInCollectionDocument,
    "mutation CreateShortcode($request: String!) {\n  createShortcode(request: $request) {\n    id\n    request\n  }\n}": types.CreateShortcodeDocument,
    "mutation CreateTeam($name: String!) {\n  createTeam(name: $name) {\n    id\n    name\n    members {\n      membershipID\n      role\n      user {\n        uid\n        displayName\n        email\n        photoURL\n      }\n    }\n    myRole\n    ownersCount\n    editorsCount\n    viewersCount\n  }\n}": types.CreateTeamDocument,
    "mutation CreateTeamEnvironment($variables: String!, $teamID: ID!, $name: String!) {\n  createTeamEnvironment(variables: $variables, teamID: $teamID, name: $name) {\n    variables\n    name\n    teamID\n  }\n}": types.CreateTeamEnvironmentDocument,
    "mutation CreateTeamInvitation($inviteeEmail: String!, $inviteeRole: TeamMemberRole!, $teamID: ID!) {\n  createTeamInvitation(\n    inviteeRole: $inviteeRole\n    inviteeEmail: $inviteeEmail\n    teamID: $teamID\n  ) {\n    id\n    teamID\n    creatorUid\n    inviteeEmail\n    inviteeRole\n  }\n}": types.CreateTeamInvitationDocument,
    "mutation DeleteCollection($collectionID: ID!) {\n  deleteCollection(collectionID: $collectionID)\n}": types.DeleteCollectionDocument,
    "mutation DeleteRequest($requestID: ID!) {\n  deleteRequest(requestID: $requestID)\n}": types.DeleteRequestDocument,
    "mutation DeleteShortcode($code: ID!) {\n  revokeShortcode(code: $code)\n}": types.DeleteShortcodeDocument,
    "mutation DeleteTeam($teamID: ID!) {\n  deleteTeam(teamID: $teamID)\n}": types.DeleteTeamDocument,
    "mutation DeleteTeamEnvironment($id: ID!) {\n  deleteTeamEnvironment(id: $id)\n}": types.DeleteTeamEnvironmentDocument,
    "mutation DeleteUser {\n  deleteUser\n}": types.DeleteUserDocument,
    "mutation importFromJSON($jsonString: String!, $teamID: ID!) {\n  importCollectionsFromJSON(jsonString: $jsonString, teamID: $teamID)\n}": types.ImportFromJsonDocument,
    "mutation LeaveTeam($teamID: ID!) {\n  leaveTeam(teamID: $teamID)\n}": types.LeaveTeamDocument,
    "mutation MoveRESTTeamCollection($collectionID: ID!, $parentCollectionID: ID) {\n  moveCollection(\n    collectionID: $collectionID\n    parentCollectionID: $parentCollectionID\n  ) {\n    id\n  }\n}": types.MoveRestTeamCollectionDocument,
    "mutation MoveRESTTeamRequest($collectionID: ID!, $requestID: ID!) {\n  moveRequest(destCollID: $collectionID, requestID: $requestID) {\n    id\n  }\n}": types.MoveRestTeamRequestDocument,
    "mutation RemoveTeamMember($userUid: ID!, $teamID: ID!) {\n  removeTeamMember(userUid: $userUid, teamID: $teamID)\n}": types.RemoveTeamMemberDocument,
    "mutation RenameCollection($newTitle: String!, $collectionID: ID!) {\n  renameCollection(newTitle: $newTitle, collectionID: $collectionID) {\n    id\n  }\n}": types.RenameCollectionDocument,
    "mutation RenameTeam($newName: String!, $teamID: ID!) {\n  renameTeam(newName: $newName, teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n      }\n      role\n    }\n  }\n}": types.RenameTeamDocument,
    "mutation RevokeTeamInvitation($inviteID: ID!) {\n  revokeTeamInvitation(inviteID: $inviteID)\n}": types.RevokeTeamInvitationDocument,
    "mutation UpdateCollectionOrder($collectionID: ID!, $destCollID: ID) {\n  updateCollectionOrder(collectionID: $collectionID, destCollID: $destCollID)\n}": types.UpdateCollectionOrderDocument,
    "mutation UpdateLookUpRequestOrder($requestID: ID!, $nextRequestID: ID, $collectionID: ID!) {\n  updateLookUpRequestOrder(\n    requestID: $requestID\n    nextRequestID: $nextRequestID\n    collectionID: $collectionID\n  )\n}": types.UpdateLookUpRequestOrderDocument,
    "mutation UpdateRequest($data: UpdateTeamRequestInput!, $requestID: ID!) {\n  updateRequest(data: $data, requestID: $requestID) {\n    id\n    title\n  }\n}": types.UpdateRequestDocument,
    "mutation UpdateTeamEnvironment($variables: String!, $id: ID!, $name: String!) {\n  updateTeamEnvironment(variables: $variables, id: $id, name: $name) {\n    variables\n    name\n    id\n  }\n}": types.UpdateTeamEnvironmentDocument,
    "mutation UpdateTeamMemberRole($newRole: TeamMemberRole!, $userUid: ID!, $teamID: ID!) {\n  updateTeamMemberRole(newRole: $newRole, userUid: $userUid, teamID: $teamID) {\n    membershipID\n    role\n  }\n}": types.UpdateTeamMemberRoleDocument,
    "mutation UpdateUserSettings($properties: String!) {\n  updateUserSettings(properties: $properties) {\n    id\n  }\n}": types.UpdateUserSettingsDocument,
    "query ExportAsJSON($teamID: ID!) {\n  exportCollectionsToJSON(teamID: $teamID)\n}": types.ExportAsJsonDocument,
    "query GetCollectionChildren($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n      title\n    }\n  }\n}": types.GetCollectionChildrenDocument,
    "query GetCollectionChildrenIDs($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n    }\n  }\n}": types.GetCollectionChildrenIDsDocument,
    "query GetCollectionRequests($collectionID: ID!, $cursor: ID) {\n  requestsInCollection(collectionID: $collectionID, cursor: $cursor) {\n    id\n    title\n    request\n  }\n}": types.GetCollectionRequestsDocument,
    "query GetCollectionTitle($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    title\n  }\n}": types.GetCollectionTitleDocument,
    "query GetInviteDetails($inviteID: ID!) {\n  teamInvitation(inviteID: $inviteID) {\n    id\n    inviteeEmail\n    inviteeRole\n    team {\n      id\n      name\n    }\n    creator {\n      uid\n      displayName\n      email\n    }\n  }\n}": types.GetInviteDetailsDocument,
    "query GetUserShortcodes($cursor: ID) {\n  myShortcodes(cursor: $cursor) {\n    id\n    request\n    createdOn\n  }\n}": types.GetUserShortcodesDocument,
    "query GetMyTeams($cursor: ID) {\n  myTeams(cursor: $cursor) {\n    id\n    name\n    myRole\n    ownersCount\n    teamMembers {\n      membershipID\n      user {\n        photoURL\n        displayName\n        email\n        uid\n      }\n      role\n    }\n  }\n}": types.GetMyTeamsDocument,
    "query GetSingleCollection($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}": types.GetSingleCollectionDocument,
    "query GetSingleRequest($requestID: ID!) {\n  request(requestID: $requestID) {\n    id\n    collectionID\n    title\n    request\n  }\n}": types.GetSingleRequestDocument,
    "query GetTeam($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}": types.GetTeamDocument,
    "query GetTeamEnvironments($teamID: ID!) {\n  team(teamID: $teamID) {\n    teamEnvironments {\n      id\n      name\n      variables\n      teamID\n    }\n  }\n}": types.GetTeamEnvironmentsDocument,
    "query GetTeamMembers($teamID: ID!, $cursor: ID) {\n  team(teamID: $teamID) {\n    members(cursor: $cursor) {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}": types.GetTeamMembersDocument,
    "query GetUserInfo {\n  me {\n    uid\n    displayName\n    email\n    photoURL\n  }\n}": types.GetUserInfoDocument,
    "query GetUserSettings {\n  me {\n    settings {\n      id\n      properties\n    }\n  }\n}": types.GetUserSettingsDocument,
    "query Me {\n  me {\n    uid\n    displayName\n    photoURL\n  }\n}": types.MeDocument,
    "query ResolveShortcode($code: ID!) {\n  shortcode(code: $code) {\n    id\n    request\n  }\n}": types.ResolveShortcodeDocument,
    "query RootCollectionsOfTeam($teamID: ID!, $cursor: ID) {\n  rootCollectionsOfTeam(teamID: $teamID, cursor: $cursor) {\n    id\n    title\n  }\n}": types.RootCollectionsOfTeamDocument,
    "query GetPendingInvites($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    teamInvitations {\n      inviteeRole\n      inviteeEmail\n      id\n    }\n  }\n}": types.GetPendingInvitesDocument,
    "subscription ShortcodeCreated {\n  myShortcodesCreated {\n    id\n    request\n    createdOn\n  }\n}": types.ShortcodeCreatedDocument,
    "subscription ShortcodeDeleted {\n  myShortcodesRevoked {\n    id\n  }\n}": types.ShortcodeDeletedDocument,
    "subscription TeamCollectionAdded($teamID: ID!) {\n  teamCollectionAdded(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}": types.TeamCollectionAddedDocument,
    "subscription TeamCollectionMoved($teamID: ID!) {\n  teamCollectionMoved(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}": types.TeamCollectionMovedDocument,
    "subscription TeamCollectionOrderUpdated($teamID: ID!) {\n  collectionOrderUpdated(teamID: $teamID) {\n    collection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n    nextCollection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n}": types.TeamCollectionOrderUpdatedDocument,
    "subscription TeamCollectionRemoved($teamID: ID!) {\n  teamCollectionRemoved(teamID: $teamID)\n}": types.TeamCollectionRemovedDocument,
    "subscription TeamCollectionUpdated($teamID: ID!) {\n  teamCollectionUpdated(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}": types.TeamCollectionUpdatedDocument,
    "subscription TeamEnvironmentCreated($teamID: ID!) {\n  teamEnvironmentCreated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}": types.TeamEnvironmentCreatedDocument,
    "subscription TeamEnvironmentDeleted($teamID: ID!) {\n  teamEnvironmentDeleted(teamID: $teamID) {\n    id\n  }\n}": types.TeamEnvironmentDeletedDocument,
    "subscription TeamEnvironmentUpdated($teamID: ID!) {\n  teamEnvironmentUpdated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}": types.TeamEnvironmentUpdatedDocument,
    "subscription TeamInvitationAdded($teamID: ID!) {\n  teamInvitationAdded(teamID: $teamID) {\n    id\n  }\n}": types.TeamInvitationAddedDocument,
    "subscription TeamInvitationRemoved($teamID: ID!) {\n  teamInvitationRemoved(teamID: $teamID)\n}": types.TeamInvitationRemovedDocument,
    "subscription TeamMemberAdded($teamID: ID!) {\n  teamMemberAdded(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}": types.TeamMemberAddedDocument,
    "subscription TeamMemberRemoved($teamID: ID!) {\n  teamMemberRemoved(teamID: $teamID)\n}": types.TeamMemberRemovedDocument,
    "subscription TeamMemberUpdated($teamID: ID!) {\n  teamMemberUpdated(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}": types.TeamMemberUpdatedDocument,
    "subscription TeamRequestAdded($teamID: ID!) {\n  teamRequestAdded(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}": types.TeamRequestAddedDocument,
    "subscription TeamRequestDeleted($teamID: ID!) {\n  teamRequestDeleted(teamID: $teamID)\n}": types.TeamRequestDeletedDocument,
    "subscription TeamRequestMoved($teamID: ID!) {\n  requestMoved(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}": types.TeamRequestMovedDocument,
    "subscription TeamRequestOrderUpdated($teamID: ID!) {\n  requestOrderUpdated(teamID: $teamID) {\n    request {\n      id\n      collectionID\n      request\n      title\n    }\n    nextRequest {\n      id\n      collectionID\n      request\n      title\n    }\n  }\n}": types.TeamRequestOrderUpdatedDocument,
    "subscription TeamRequestUpdated($teamID: ID!) {\n  teamRequestUpdated(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}": types.TeamRequestUpdatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AcceptTeamInvitation($inviteID: ID!) {\n  acceptTeamInvitation(inviteID: $inviteID) {\n    membershipID\n    role\n    user {\n      uid\n      displayName\n      photoURL\n      email\n    }\n  }\n}"): (typeof documents)["mutation AcceptTeamInvitation($inviteID: ID!) {\n  acceptTeamInvitation(inviteID: $inviteID) {\n    membershipID\n    role\n    user {\n      uid\n      displayName\n      photoURL\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateChildCollection($childTitle: String!, $collectionID: ID!) {\n  createChildCollection(childTitle: $childTitle, collectionID: $collectionID) {\n    id\n  }\n}"): (typeof documents)["mutation CreateChildCollection($childTitle: String!, $collectionID: ID!) {\n  createChildCollection(childTitle: $childTitle, collectionID: $collectionID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateDuplicateEnvironment($id: ID!) {\n  createDuplicateEnvironment(id: $id) {\n    id\n    teamID\n    name\n    variables\n  }\n}"): (typeof documents)["mutation CreateDuplicateEnvironment($id: ID!) {\n  createDuplicateEnvironment(id: $id) {\n    id\n    teamID\n    name\n    variables\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateNewRootCollection($title: String!, $teamID: ID!) {\n  createRootCollection(title: $title, teamID: $teamID) {\n    id\n  }\n}"): (typeof documents)["mutation CreateNewRootCollection($title: String!, $teamID: ID!) {\n  createRootCollection(title: $title, teamID: $teamID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRequestInCollection($data: CreateTeamRequestInput!, $collectionID: ID!) {\n  createRequestInCollection(data: $data, collectionID: $collectionID) {\n    id\n    collection {\n      id\n      team {\n        id\n        name\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateRequestInCollection($data: CreateTeamRequestInput!, $collectionID: ID!) {\n  createRequestInCollection(data: $data, collectionID: $collectionID) {\n    id\n    collection {\n      id\n      team {\n        id\n        name\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateShortcode($request: String!) {\n  createShortcode(request: $request) {\n    id\n    request\n  }\n}"): (typeof documents)["mutation CreateShortcode($request: String!) {\n  createShortcode(request: $request) {\n    id\n    request\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTeam($name: String!) {\n  createTeam(name: $name) {\n    id\n    name\n    members {\n      membershipID\n      role\n      user {\n        uid\n        displayName\n        email\n        photoURL\n      }\n    }\n    myRole\n    ownersCount\n    editorsCount\n    viewersCount\n  }\n}"): (typeof documents)["mutation CreateTeam($name: String!) {\n  createTeam(name: $name) {\n    id\n    name\n    members {\n      membershipID\n      role\n      user {\n        uid\n        displayName\n        email\n        photoURL\n      }\n    }\n    myRole\n    ownersCount\n    editorsCount\n    viewersCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTeamEnvironment($variables: String!, $teamID: ID!, $name: String!) {\n  createTeamEnvironment(variables: $variables, teamID: $teamID, name: $name) {\n    variables\n    name\n    teamID\n  }\n}"): (typeof documents)["mutation CreateTeamEnvironment($variables: String!, $teamID: ID!, $name: String!) {\n  createTeamEnvironment(variables: $variables, teamID: $teamID, name: $name) {\n    variables\n    name\n    teamID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTeamInvitation($inviteeEmail: String!, $inviteeRole: TeamMemberRole!, $teamID: ID!) {\n  createTeamInvitation(\n    inviteeRole: $inviteeRole\n    inviteeEmail: $inviteeEmail\n    teamID: $teamID\n  ) {\n    id\n    teamID\n    creatorUid\n    inviteeEmail\n    inviteeRole\n  }\n}"): (typeof documents)["mutation CreateTeamInvitation($inviteeEmail: String!, $inviteeRole: TeamMemberRole!, $teamID: ID!) {\n  createTeamInvitation(\n    inviteeRole: $inviteeRole\n    inviteeEmail: $inviteeEmail\n    teamID: $teamID\n  ) {\n    id\n    teamID\n    creatorUid\n    inviteeEmail\n    inviteeRole\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteCollection($collectionID: ID!) {\n  deleteCollection(collectionID: $collectionID)\n}"): (typeof documents)["mutation DeleteCollection($collectionID: ID!) {\n  deleteCollection(collectionID: $collectionID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteRequest($requestID: ID!) {\n  deleteRequest(requestID: $requestID)\n}"): (typeof documents)["mutation DeleteRequest($requestID: ID!) {\n  deleteRequest(requestID: $requestID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteShortcode($code: ID!) {\n  revokeShortcode(code: $code)\n}"): (typeof documents)["mutation DeleteShortcode($code: ID!) {\n  revokeShortcode(code: $code)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTeam($teamID: ID!) {\n  deleteTeam(teamID: $teamID)\n}"): (typeof documents)["mutation DeleteTeam($teamID: ID!) {\n  deleteTeam(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTeamEnvironment($id: ID!) {\n  deleteTeamEnvironment(id: $id)\n}"): (typeof documents)["mutation DeleteTeamEnvironment($id: ID!) {\n  deleteTeamEnvironment(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteUser {\n  deleteUser\n}"): (typeof documents)["mutation DeleteUser {\n  deleteUser\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation importFromJSON($jsonString: String!, $teamID: ID!) {\n  importCollectionsFromJSON(jsonString: $jsonString, teamID: $teamID)\n}"): (typeof documents)["mutation importFromJSON($jsonString: String!, $teamID: ID!) {\n  importCollectionsFromJSON(jsonString: $jsonString, teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LeaveTeam($teamID: ID!) {\n  leaveTeam(teamID: $teamID)\n}"): (typeof documents)["mutation LeaveTeam($teamID: ID!) {\n  leaveTeam(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MoveRESTTeamCollection($collectionID: ID!, $parentCollectionID: ID) {\n  moveCollection(\n    collectionID: $collectionID\n    parentCollectionID: $parentCollectionID\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation MoveRESTTeamCollection($collectionID: ID!, $parentCollectionID: ID) {\n  moveCollection(\n    collectionID: $collectionID\n    parentCollectionID: $parentCollectionID\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MoveRESTTeamRequest($collectionID: ID!, $requestID: ID!) {\n  moveRequest(destCollID: $collectionID, requestID: $requestID) {\n    id\n  }\n}"): (typeof documents)["mutation MoveRESTTeamRequest($collectionID: ID!, $requestID: ID!) {\n  moveRequest(destCollID: $collectionID, requestID: $requestID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveTeamMember($userUid: ID!, $teamID: ID!) {\n  removeTeamMember(userUid: $userUid, teamID: $teamID)\n}"): (typeof documents)["mutation RemoveTeamMember($userUid: ID!, $teamID: ID!) {\n  removeTeamMember(userUid: $userUid, teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RenameCollection($newTitle: String!, $collectionID: ID!) {\n  renameCollection(newTitle: $newTitle, collectionID: $collectionID) {\n    id\n  }\n}"): (typeof documents)["mutation RenameCollection($newTitle: String!, $collectionID: ID!) {\n  renameCollection(newTitle: $newTitle, collectionID: $collectionID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RenameTeam($newName: String!, $teamID: ID!) {\n  renameTeam(newName: $newName, teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n      }\n      role\n    }\n  }\n}"): (typeof documents)["mutation RenameTeam($newName: String!, $teamID: ID!) {\n  renameTeam(newName: $newName, teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n      }\n      role\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RevokeTeamInvitation($inviteID: ID!) {\n  revokeTeamInvitation(inviteID: $inviteID)\n}"): (typeof documents)["mutation RevokeTeamInvitation($inviteID: ID!) {\n  revokeTeamInvitation(inviteID: $inviteID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCollectionOrder($collectionID: ID!, $destCollID: ID) {\n  updateCollectionOrder(collectionID: $collectionID, destCollID: $destCollID)\n}"): (typeof documents)["mutation UpdateCollectionOrder($collectionID: ID!, $destCollID: ID) {\n  updateCollectionOrder(collectionID: $collectionID, destCollID: $destCollID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateLookUpRequestOrder($requestID: ID!, $nextRequestID: ID, $collectionID: ID!) {\n  updateLookUpRequestOrder(\n    requestID: $requestID\n    nextRequestID: $nextRequestID\n    collectionID: $collectionID\n  )\n}"): (typeof documents)["mutation UpdateLookUpRequestOrder($requestID: ID!, $nextRequestID: ID, $collectionID: ID!) {\n  updateLookUpRequestOrder(\n    requestID: $requestID\n    nextRequestID: $nextRequestID\n    collectionID: $collectionID\n  )\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateRequest($data: UpdateTeamRequestInput!, $requestID: ID!) {\n  updateRequest(data: $data, requestID: $requestID) {\n    id\n    title\n  }\n}"): (typeof documents)["mutation UpdateRequest($data: UpdateTeamRequestInput!, $requestID: ID!) {\n  updateRequest(data: $data, requestID: $requestID) {\n    id\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTeamEnvironment($variables: String!, $id: ID!, $name: String!) {\n  updateTeamEnvironment(variables: $variables, id: $id, name: $name) {\n    variables\n    name\n    id\n  }\n}"): (typeof documents)["mutation UpdateTeamEnvironment($variables: String!, $id: ID!, $name: String!) {\n  updateTeamEnvironment(variables: $variables, id: $id, name: $name) {\n    variables\n    name\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTeamMemberRole($newRole: TeamMemberRole!, $userUid: ID!, $teamID: ID!) {\n  updateTeamMemberRole(newRole: $newRole, userUid: $userUid, teamID: $teamID) {\n    membershipID\n    role\n  }\n}"): (typeof documents)["mutation UpdateTeamMemberRole($newRole: TeamMemberRole!, $userUid: ID!, $teamID: ID!) {\n  updateTeamMemberRole(newRole: $newRole, userUid: $userUid, teamID: $teamID) {\n    membershipID\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserSettings($properties: String!) {\n  updateUserSettings(properties: $properties) {\n    id\n  }\n}"): (typeof documents)["mutation UpdateUserSettings($properties: String!) {\n  updateUserSettings(properties: $properties) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ExportAsJSON($teamID: ID!) {\n  exportCollectionsToJSON(teamID: $teamID)\n}"): (typeof documents)["query ExportAsJSON($teamID: ID!) {\n  exportCollectionsToJSON(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionChildren($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n      title\n    }\n  }\n}"): (typeof documents)["query GetCollectionChildren($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionChildrenIDs($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n    }\n  }\n}"): (typeof documents)["query GetCollectionChildrenIDs($collectionID: ID!, $cursor: ID) {\n  collection(collectionID: $collectionID) {\n    children(cursor: $cursor) {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionRequests($collectionID: ID!, $cursor: ID) {\n  requestsInCollection(collectionID: $collectionID, cursor: $cursor) {\n    id\n    title\n    request\n  }\n}"): (typeof documents)["query GetCollectionRequests($collectionID: ID!, $cursor: ID) {\n  requestsInCollection(collectionID: $collectionID, cursor: $cursor) {\n    id\n    title\n    request\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionTitle($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    title\n  }\n}"): (typeof documents)["query GetCollectionTitle($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetInviteDetails($inviteID: ID!) {\n  teamInvitation(inviteID: $inviteID) {\n    id\n    inviteeEmail\n    inviteeRole\n    team {\n      id\n      name\n    }\n    creator {\n      uid\n      displayName\n      email\n    }\n  }\n}"): (typeof documents)["query GetInviteDetails($inviteID: ID!) {\n  teamInvitation(inviteID: $inviteID) {\n    id\n    inviteeEmail\n    inviteeRole\n    team {\n      id\n      name\n    }\n    creator {\n      uid\n      displayName\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserShortcodes($cursor: ID) {\n  myShortcodes(cursor: $cursor) {\n    id\n    request\n    createdOn\n  }\n}"): (typeof documents)["query GetUserShortcodes($cursor: ID) {\n  myShortcodes(cursor: $cursor) {\n    id\n    request\n    createdOn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyTeams($cursor: ID) {\n  myTeams(cursor: $cursor) {\n    id\n    name\n    myRole\n    ownersCount\n    teamMembers {\n      membershipID\n      user {\n        photoURL\n        displayName\n        email\n        uid\n      }\n      role\n    }\n  }\n}"): (typeof documents)["query GetMyTeams($cursor: ID) {\n  myTeams(cursor: $cursor) {\n    id\n    name\n    myRole\n    ownersCount\n    teamMembers {\n      membershipID\n      user {\n        photoURL\n        displayName\n        email\n        uid\n      }\n      role\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSingleCollection($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"): (typeof documents)["query GetSingleCollection($collectionID: ID!) {\n  collection(collectionID: $collectionID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSingleRequest($requestID: ID!) {\n  request(requestID: $requestID) {\n    id\n    collectionID\n    title\n    request\n  }\n}"): (typeof documents)["query GetSingleRequest($requestID: ID!) {\n  request(requestID: $requestID) {\n    id\n    collectionID\n    title\n    request\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTeam($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}"): (typeof documents)["query GetTeam($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    name\n    teamMembers {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTeamEnvironments($teamID: ID!) {\n  team(teamID: $teamID) {\n    teamEnvironments {\n      id\n      name\n      variables\n      teamID\n    }\n  }\n}"): (typeof documents)["query GetTeamEnvironments($teamID: ID!) {\n  team(teamID: $teamID) {\n    teamEnvironments {\n      id\n      name\n      variables\n      teamID\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTeamMembers($teamID: ID!, $cursor: ID) {\n  team(teamID: $teamID) {\n    members(cursor: $cursor) {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}"): (typeof documents)["query GetTeamMembers($teamID: ID!, $cursor: ID) {\n  team(teamID: $teamID) {\n    members(cursor: $cursor) {\n      membershipID\n      user {\n        uid\n        email\n      }\n      role\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserInfo {\n  me {\n    uid\n    displayName\n    email\n    photoURL\n  }\n}"): (typeof documents)["query GetUserInfo {\n  me {\n    uid\n    displayName\n    email\n    photoURL\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserSettings {\n  me {\n    settings {\n      id\n      properties\n    }\n  }\n}"): (typeof documents)["query GetUserSettings {\n  me {\n    settings {\n      id\n      properties\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    uid\n    displayName\n    photoURL\n  }\n}"): (typeof documents)["query Me {\n  me {\n    uid\n    displayName\n    photoURL\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ResolveShortcode($code: ID!) {\n  shortcode(code: $code) {\n    id\n    request\n  }\n}"): (typeof documents)["query ResolveShortcode($code: ID!) {\n  shortcode(code: $code) {\n    id\n    request\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RootCollectionsOfTeam($teamID: ID!, $cursor: ID) {\n  rootCollectionsOfTeam(teamID: $teamID, cursor: $cursor) {\n    id\n    title\n  }\n}"): (typeof documents)["query RootCollectionsOfTeam($teamID: ID!, $cursor: ID) {\n  rootCollectionsOfTeam(teamID: $teamID, cursor: $cursor) {\n    id\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPendingInvites($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    teamInvitations {\n      inviteeRole\n      inviteeEmail\n      id\n    }\n  }\n}"): (typeof documents)["query GetPendingInvites($teamID: ID!) {\n  team(teamID: $teamID) {\n    id\n    teamInvitations {\n      inviteeRole\n      inviteeEmail\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription ShortcodeCreated {\n  myShortcodesCreated {\n    id\n    request\n    createdOn\n  }\n}"): (typeof documents)["subscription ShortcodeCreated {\n  myShortcodesCreated {\n    id\n    request\n    createdOn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription ShortcodeDeleted {\n  myShortcodesRevoked {\n    id\n  }\n}"): (typeof documents)["subscription ShortcodeDeleted {\n  myShortcodesRevoked {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamCollectionAdded($teamID: ID!) {\n  teamCollectionAdded(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"): (typeof documents)["subscription TeamCollectionAdded($teamID: ID!) {\n  teamCollectionAdded(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamCollectionMoved($teamID: ID!) {\n  teamCollectionMoved(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"): (typeof documents)["subscription TeamCollectionMoved($teamID: ID!) {\n  teamCollectionMoved(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamCollectionOrderUpdated($teamID: ID!) {\n  collectionOrderUpdated(teamID: $teamID) {\n    collection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n    nextCollection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["subscription TeamCollectionOrderUpdated($teamID: ID!) {\n  collectionOrderUpdated(teamID: $teamID) {\n    collection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n    nextCollection {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamCollectionRemoved($teamID: ID!) {\n  teamCollectionRemoved(teamID: $teamID)\n}"): (typeof documents)["subscription TeamCollectionRemoved($teamID: ID!) {\n  teamCollectionRemoved(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamCollectionUpdated($teamID: ID!) {\n  teamCollectionUpdated(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"): (typeof documents)["subscription TeamCollectionUpdated($teamID: ID!) {\n  teamCollectionUpdated(teamID: $teamID) {\n    id\n    title\n    parent {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamEnvironmentCreated($teamID: ID!) {\n  teamEnvironmentCreated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}"): (typeof documents)["subscription TeamEnvironmentCreated($teamID: ID!) {\n  teamEnvironmentCreated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamEnvironmentDeleted($teamID: ID!) {\n  teamEnvironmentDeleted(teamID: $teamID) {\n    id\n  }\n}"): (typeof documents)["subscription TeamEnvironmentDeleted($teamID: ID!) {\n  teamEnvironmentDeleted(teamID: $teamID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamEnvironmentUpdated($teamID: ID!) {\n  teamEnvironmentUpdated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}"): (typeof documents)["subscription TeamEnvironmentUpdated($teamID: ID!) {\n  teamEnvironmentUpdated(teamID: $teamID) {\n    id\n    teamID\n    name\n    variables\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamInvitationAdded($teamID: ID!) {\n  teamInvitationAdded(teamID: $teamID) {\n    id\n  }\n}"): (typeof documents)["subscription TeamInvitationAdded($teamID: ID!) {\n  teamInvitationAdded(teamID: $teamID) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamInvitationRemoved($teamID: ID!) {\n  teamInvitationRemoved(teamID: $teamID)\n}"): (typeof documents)["subscription TeamInvitationRemoved($teamID: ID!) {\n  teamInvitationRemoved(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamMemberAdded($teamID: ID!) {\n  teamMemberAdded(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}"): (typeof documents)["subscription TeamMemberAdded($teamID: ID!) {\n  teamMemberAdded(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamMemberRemoved($teamID: ID!) {\n  teamMemberRemoved(teamID: $teamID)\n}"): (typeof documents)["subscription TeamMemberRemoved($teamID: ID!) {\n  teamMemberRemoved(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamMemberUpdated($teamID: ID!) {\n  teamMemberUpdated(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}"): (typeof documents)["subscription TeamMemberUpdated($teamID: ID!) {\n  teamMemberUpdated(teamID: $teamID) {\n    membershipID\n    user {\n      uid\n      email\n    }\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamRequestAdded($teamID: ID!) {\n  teamRequestAdded(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"): (typeof documents)["subscription TeamRequestAdded($teamID: ID!) {\n  teamRequestAdded(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamRequestDeleted($teamID: ID!) {\n  teamRequestDeleted(teamID: $teamID)\n}"): (typeof documents)["subscription TeamRequestDeleted($teamID: ID!) {\n  teamRequestDeleted(teamID: $teamID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamRequestMoved($teamID: ID!) {\n  requestMoved(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"): (typeof documents)["subscription TeamRequestMoved($teamID: ID!) {\n  requestMoved(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamRequestOrderUpdated($teamID: ID!) {\n  requestOrderUpdated(teamID: $teamID) {\n    request {\n      id\n      collectionID\n      request\n      title\n    }\n    nextRequest {\n      id\n      collectionID\n      request\n      title\n    }\n  }\n}"): (typeof documents)["subscription TeamRequestOrderUpdated($teamID: ID!) {\n  requestOrderUpdated(teamID: $teamID) {\n    request {\n      id\n      collectionID\n      request\n      title\n    }\n    nextRequest {\n      id\n      collectionID\n      request\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TeamRequestUpdated($teamID: ID!) {\n  teamRequestUpdated(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"): (typeof documents)["subscription TeamRequestUpdated($teamID: ID!) {\n  teamRequestUpdated(teamID: $teamID) {\n    id\n    collectionID\n    request\n    title\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;