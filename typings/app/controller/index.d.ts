// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/controller/address';
import ExportChatHistory from '../../../app/controller/chatHistory';
import ExportDemo from '../../../app/controller/demo';
import ExportGroup from '../../../app/controller/group';
import ExportImgur from '../../../app/controller/imgur';
import ExportLogin from '../../../app/controller/login';
import ExportMsg from '../../../app/controller/msg';
import ExportOAuth from '../../../app/controller/oAuth';
import ExportRank from '../../../app/controller/rank';
import ExportRestful from '../../../app/controller/restful';
import ExportSearch from '../../../app/controller/search';
import ExportToken from '../../../app/controller/token';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    address: ExportAddress;
    chatHistory: ExportChatHistory;
    demo: ExportDemo;
    group: ExportGroup;
    imgur: ExportImgur;
    login: ExportLogin;
    msg: ExportMsg;
    oAuth: ExportOAuth;
    rank: ExportRank;
    restful: ExportRestful;
    search: ExportSearch;
    token: ExportToken;
    user: ExportUser;
  }
}
