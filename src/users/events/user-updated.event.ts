export class UserUpdatedEvent {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}
