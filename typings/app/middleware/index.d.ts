// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFoo from '../../../app/middleware/foo';

declare module 'egg' {
  interface IMiddleware {
    foo: typeof ExportFoo;
  }
}
