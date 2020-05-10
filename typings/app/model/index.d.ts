// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/model/Address';
import ExportAlter from '../../../app/model/Alter';
import ExportBlogs from '../../../app/model/Blogs';
import ExportChat from '../../../app/model/Chat';
import ExportGroup from '../../../app/model/Group';
import ExportMsg from '../../../app/model/Msg';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Address: ReturnType<typeof ExportAddress>;
    Alter: ReturnType<typeof ExportAlter>;
    Blogs: ReturnType<typeof ExportBlogs>;
    Chat: ReturnType<typeof ExportChat>;
    Group: ReturnType<typeof ExportGroup>;
    Msg: ReturnType<typeof ExportMsg>;
    User: ReturnType<typeof ExportUser>;
  }
}
