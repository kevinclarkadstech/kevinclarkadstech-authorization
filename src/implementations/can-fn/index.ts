/*
  This is a simple function type that returns a boolean indicating whether the action is allowed or not.  It could be changed to return a 
  more complex Result type
*/

export type CanFn<
  Input extends {
    subject: Record<string, any> | null;
    resource: Record<string, any>;
    action: string;
    additionalContext?: Record<string, any>;
  },
> = (input: Input) => boolean;
