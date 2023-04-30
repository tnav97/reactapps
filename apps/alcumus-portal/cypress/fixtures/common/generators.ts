import { v4 as uuidV4 } from 'uuid';

export class Generators {
  static password(): string {
    return 'Alcdev01#';
  }

  static numericId(): number {
    return Math.floor(Math.random() * 100000) + 10000;
  }

  static organizationName(): string {
    return `example-${Generators.numericId()}`;
  }

  static organizationIdentifier(): string {
    return `A${Generators.numericId()}-${Generators.organizationName()}.com`;
  }

  static names(): [string, string] {
    return ['Test', 'User'];
  }

  static namesAndEmail(): [string, string, string] {
    const [firstName, lastName] = Generators.names();
    const email = Generators.email();
    return [firstName, lastName, email];
  }

  static uuidV4(): string {
    return uuidV4();
  }

  static email(): string {
    return `${uuidV4()}@example.com`;
  }
}
