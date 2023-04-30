export class CredentialEmbedDto {
  id: number;
  lookerUserId: string;
  lookerGroupId: string;

  constructor(dto: any) {
    this.id = dto.id;
    this.lookerUserId = dto.lookerUserId;
    this.lookerGroupId = dto.lookerGroupId;
  }
}
