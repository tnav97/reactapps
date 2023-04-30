export class UserDto {
  accessLevel: string;
  appId: string;
  id: number;
  lookerId: string;
  orgId: number;
  revoked: boolean;

  constructor(user: any) {
    this.id = user.id;
    this.accessLevel = user.accessLevel;
    this.appId = user.appId;
    this.lookerId = user.lookerId;
    this.orgId = user.orgId;
    this.revoked = user.revoked;
  }
}
