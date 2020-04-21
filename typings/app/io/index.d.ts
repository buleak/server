// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportControllerChat from '../../../app/io/controller/chat';
import ExportControllerDefault from '../../../app/io/controller/default';
import ExportControllerIndex from '../../../app/io/controller/index';
import ExportMiddlewareAuth from '../../../app/io/middleware/auth';
import ExportMiddlewarePacket from '../../../app/io/middleware/packet';

declare module 'egg' {
  interface Application {
    io: T_socketio;
  }

  interface T_socketio {
    controller: {
      chat: AutoInstanceType<typeof ExportControllerChat>;
      default: AutoInstanceType<typeof ExportControllerDefault>;
      index: AutoInstanceType<typeof ExportControllerIndex>;
    }
    middleware: {
      auth: AutoInstanceType<typeof ExportMiddlewareAuth>;
      packet: AutoInstanceType<typeof ExportMiddlewarePacket>;
    }
  }
}
