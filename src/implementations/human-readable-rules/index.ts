// export class Given<Subject> {
//   constructor(public subject: Subject) {}
// }

// export class TryingTo<Action> {
//   constructor(public action: Action) {}
// }

// export class WithResourceAndContext<Resource, AdditionalContext = undefined> {
//   constructor(
//     public resource: Resource,
//     public additionalContext?: AdditionalContext
//   ) {}
// }

// export abstract class Rule<
//   Input extends {
//     given: Given<any>;
//     tryingTo: TryingTo<any>;
//     withResourceAndContext: WithResourceAndContext<any, any>;
//   },
// > {
//   constructor(
//     public input: {
//       given: Given<Input["given"]>;
//       tryingTo: TryingTo<Input["tryingTo"]>;
//       withResourceAndContext: WithResourceAndContext<
//         Input["withResourceAndContext"]["resource"],
//         Input["withResourceAndContext"]["additionalContext"]
//       >;
//     }
//   ) {}

//   abstract evaluate(): boolean;
// }

export type Rule<
  Config extends {
    givenASubject: any;
    tryingTo: string;
    withResourceAndContext: {
      resource: any;
      additionalContext?: any;
    };
  },
> = {
  evaluate: (input: {
    givenASubject: Config["givenASubject"];
    tryingTo: Config["tryingTo"];
    withResourceAndContext: Config["withResourceAndContext"];
  }) => boolean;
};
