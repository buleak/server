export interface BodyBoolean { status: boolean, msg: string, token?: string, userInfo?: any, }

// -------- chat --------
export interface RoomInfo {roomID: string, roomName: string}
export interface MsgInfo {userID: string, msg: string, date: number, avatar?: string}
export interface UserInfo {userID: string, userName: string, lastOnlineDate?: number}
export interface ChatRoom {roomID: string, roomName: string, onlineUserList: UserInfo[]}

export interface Msg {userID: string, msg: string}
export interface ClientEmitMsg {userID: string, targetID: string, roomID: string, msgs: Msg}
export interface MsgGroup {userID: string, targetID: string, lastTalkDate?: number, msgList: Msg[]}