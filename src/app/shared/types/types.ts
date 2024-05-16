import { BehaviorSubject } from "rxjs";

// export type UserMessage = [string, string]; // The tuple that is emitted is [userId, message]
export type UserMessage = {
  userId: string,
  message: string,
};
export type ChatBehaviorSubject = BehaviorSubject<UserMessage>;
