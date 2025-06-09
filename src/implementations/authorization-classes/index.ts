/*
  This requires creating an instance of the class rather than a static method or singleton.

*/

export abstract class Authorization<
  Input extends {
    subject: { type: string; data: any } | null;
    action: string;
    resource: Record<string, any>;
    additionalContext?: Record<string, any>;
  },
> {
  protected subject: Input["subject"];
  protected action: Input["action"];
  protected resource: Input["resource"];
  protected additionalContext?: Input["additionalContext"];
  public constructor(input: Input) {
    this.subject = input.subject;
    this.action = input.action;
    this.resource = input.resource;
    this.additionalContext = input.additionalContext;
  }

  public abstract check(): boolean;
}
