import type { Subjects } from "../../shared/types/subjects";

export class ChainingAuthorization<
  Config extends {
    subject: Subjects | null;
    action: string;
    resource: Record<string, any>;
    additionalContext?: Record<string, any>;
  },
> {
  protected subject!: Config["subject"];
  protected resource!: Config["resource"];
  protected additionalContext?: Config["additionalContext"];

  protected constructor(protected action: Config["action"]) {}

  public static instantiate<
    Config extends {
      subject: Subjects | null;
      action: string;
      resource: Record<string, any>;
      additionalContext?: Record<string, any>;
    },
  >(
    action: Config["action"]
  ): Pick<ChainingAuthorization<Config>, "withSubject"> {
    return new this<Config>(action);
  }

  public withSubject(subject: Config["subject"]): Pick<this, "withResource"> {
    this.subject = subject;
    return this;
  }

  public withResource(
    resource: Config["resource"]
  ): Pick<this, "withAdditionalContext" | "check"> {
    this.resource = resource;
    return this;
  }

  public withAdditionalContext(
    additionalContext: Config["additionalContext"]
  ): Pick<this, "check"> {
    this.additionalContext = additionalContext;
    return this;
  }

  public check(): boolean {
    throw new Error("Method 'check' must be implemented in subclasses.");
  }
}
