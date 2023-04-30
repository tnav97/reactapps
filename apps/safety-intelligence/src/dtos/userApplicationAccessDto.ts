export class UserApplicationAccessDto {
  accessLevel: string;
  appId: string;
  id: number;
  lookerId: string;
  orgId: number;
  appDisplayName: string;

  constructor(user: any) {
    this.id = user.id;
    this.accessLevel = user.accessLevel;
    this.appId = user.appId;
    this.lookerId = user.lookerId;
    this.orgId = user.orgId;
    this.appDisplayName = user.appDisplayName;
  }
}
