// declare namespace Express {
//   export interface Request {
//     user: {
//       id: string;
//     }
//   }
// }
export {};

declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: string;
      }
    }
  }
}
