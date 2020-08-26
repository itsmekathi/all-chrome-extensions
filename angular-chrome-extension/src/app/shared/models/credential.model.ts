export class CredentialModel {
  constructor(
    id: string,
    userId: string,
    siteUrl: string,
    userName: string,
    password: string
  ) {
    this.id = id;
    this.userId = userId;
    this.siteUrl = siteUrl;
    this.userName = userName;
    this.password = password;
  }
  id: string;
  userId: string;
  siteUrl: string;
  userName: string;
  password: string;
}
