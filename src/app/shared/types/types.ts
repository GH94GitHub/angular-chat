import { BehaviorSubject, Subject } from "rxjs";

// export type UserMessage = [string, string]; // The tuple that is emitted is [userId, message]
export type UserMessage = {
  owner: "you" | "other",
  userId: string,
  message: string,
};
export type ChatSubject = Subject<UserMessage>;
