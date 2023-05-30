import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.User)
  .readAny(['product'])
  .grant(UserRoles.Admin)
  .extend(UserRoles.User)
  .createAny(['product'], ['category'])
  .updateAny(['product'], ['category'])
  .deleteAny(['product'], ['category']);
