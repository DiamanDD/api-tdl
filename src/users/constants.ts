export const USER_SELECT = {
  id: true,
  username: true,
  last_name: true,
  first_name: true,
  email: true,
  roles: true,
};

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'superadmin',
}
