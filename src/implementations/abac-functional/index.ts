export function withSubject<Subject extends Record<string, any> | null>(
  subject: Subject
): Subject {
  return subject;
}

export function withAction<Action extends string>(action: Action): Action {
  return action;
}

export function withResource<Resource extends Record<string, any>>(
  resource: Resource
): Resource {
  return resource;
}

export function withAdditionalContext<
  AdditionalContext extends Record<string, any> | undefined,
>(additionalContext?: AdditionalContext): AdditionalContext | undefined {
  return additionalContext;
}

export type EvaluateAbacFn<
  Input extends {
    subject: Record<string, any> | null;
    action: string;
    resource: Record<string, any>;
    additionalContext?: Record<string, any>;
  },
> = (input: Input) => boolean;
