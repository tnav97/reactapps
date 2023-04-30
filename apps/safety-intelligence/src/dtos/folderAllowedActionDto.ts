/* eslint-disable no-useless-constructor */
export class FolderAllowedActionDto {
  constructor(
    public folderId: string,
    public canUpdate: boolean,
    public canDelete: boolean,
    public canMove: boolean
  ) {}
}
