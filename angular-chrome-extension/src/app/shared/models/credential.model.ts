export class CredentialModel {
  constructor(
    id: string,
    userId: string,
    name: string,
    siteUrl: string,
    userName: string,
    password: string
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.siteUrl = siteUrl;
    this.userName = userName;
    this.password = password;
  }
  id: string;
  userId: string;
  name: string;
  siteUrl: string;
  userName: string;
  password: string;
}
