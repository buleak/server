// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAlter from '../../../app/model/Alter';
import ExportBlogs from '../../../app/model/Blogs';
import ExportChat from '../../../app/model/Chat';
import ExportGroup from '../../../app/model/Group';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Alter: ReturnType<typeof ExportAlter>;
    Blogs: ReturnType<typeof ExportBlogs>;
    Chat: ReturnType<typeof ExportChat>;
    Group: ReturnType<typeof ExportGroup>;
    User: ReturnType<typeof ExportUser>;
  }
}
