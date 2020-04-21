// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportChatHistory from '../../../app/controller/chatHistory';
import ExportDemo from '../../../app/controller/demo';
import ExportImgur from '../../../app/controller/imgur';
import ExportRank from '../../../app/controller/rank';
import ExportRestful from '../../../app/controller/restful';
import ExportSearch from '../../../app/controller/search';
import ExportToken from '../../../app/controller/token';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    chatHistory: ExportChatHistory;
    demo: ExportDemo;
    imgur: ExportImgur;
    rank: ExportRank;
    restful: ExportRestful;
    search: ExportSearch;
    token: ExportToken;
    user: ExportUser;
  }
}
