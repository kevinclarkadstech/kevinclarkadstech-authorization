export type CanFn<
  Input extends {
    subject: Record<string, any> | null;
    resource: Record<string, any>;
    action: string;
    additionalContext?: Record<string, any>;
  },
> = (input: Input) => boolean;
