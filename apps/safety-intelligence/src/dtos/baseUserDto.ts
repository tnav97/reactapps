export interface IBaseUserDto {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
}

export class BaseUserDto implements IBaseUserDto {
  id: number;
  firstName: string;
  lastName: string;
  constructor(baseUserDto: IBaseUserDto) {
    this.id = baseUserDto.id;
    this.firstName = baseUserDto.firstName;
    this.lastName = baseUserDto.lastName;
  }

  get displayName(): string {
    return `${this.firstName ?? ''} ${this.lastName ?? ''}`;
  }
}
