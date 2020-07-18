// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAddress from '../../../app/service/address';
import ExportBlog from '../../../app/service/blog';
import ExportChat from '../../../app/service/chat';
import ExportGroup from '../../../app/service/group';
import ExportMsg from '../../../app/service/msg';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    address: AutoInstanceType<typeof ExportAddress>;
    blog: AutoInstanceType<typeof ExportBlog>;
    chat: AutoInstanceType<typeof ExportChat>;
    group: AutoInstanceType<typeof ExportGroup>;
    msg: AutoInstanceType<typeof ExportMsg>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
