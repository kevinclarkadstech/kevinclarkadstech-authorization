/*
  This is similar to the CanFn type, but it uses different types to potentially make it more readable, depending on preference.
*/

export type WithSubject<Subject extends Record<string, any> | null> = Subject;

export type WithAction<Action extends string> = Action;

export type WithResource<Resource extends Record<string, any>> = Resource;

export type WithAdditionalContext<
  AdditionalContext extends Record<string, any> | undefined,
> = AdditionalContext | undefined;

export type EvaluateAbacFn<
  Subject extends WithSubject<any>,
  Action extends WithAction<any>,
  Resource extends WithResource<any>,
  AdditionalContext extends WithAdditionalContext<any> = undefined,
> = (input: {
  subject: Subject;
  action: Action;
  resource: Resource;
  additionalContext?: AdditionalContext;
}) => boolean;
