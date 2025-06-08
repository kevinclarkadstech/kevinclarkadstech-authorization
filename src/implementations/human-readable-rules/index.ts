export class Given<Subject> {
  constructor(public subject: Subject) {}
}

export class TryingTo<Action> {
  constructor(public action: Action) {}
}

export class WithResourceAndContext<Resource, AdditionalContext = undefined> {
  constructor(
    public resource: Resource,
    public additionalContext?: AdditionalContext
  ) {}
}

export abstract class Rule<
  Input extends {
    subject: Record<string, any> | null;
    Action: string;
    Resource: Record<string, any>;
    AdditionalContext?: Record<string, any>;
  },
> {
  constructor(
    public input: {
      subject: Input["subject"];
      action: Input["Action"];
      resource: Input["Resource"];
      additionalContext?: Input["AdditionalContext"];
    }
  ) {}

  abstract evaluate(): boolean;
}
