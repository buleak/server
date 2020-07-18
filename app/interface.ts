
// -------- chat --------
// login
export interface LoginRes { status: boolean, msg: string, token?: string, userInfo?: UserShowInfo, }


export interface RoomInfo { roomID: string, roomName: string }
export interface ChatRoom { roomID: string, roomName: string, onlineUserList: UserInfo[] }

//TODO
// export interface Msg { userID: string, msg: string }
// export interface ClientEmitMsg { userID: string, targetID: string, roomID: string, msgs: Msg }
// export interface MsgGroup { userID: string, targetID: string, lastTalkDate?: number, msgList: Msg[] }
//

export interface UserBaseInfo { avatar: string, userID: string, userName: string, isFriend?: boolean }
export interface UserShowInfo extends UserBaseInfo { sex: string, registerDate: number }
export interface UserInfo extends UserBaseInfo { passWord: string, sex: string, registerDate: number }
export type UserSchema = UserBaseInfo 

export interface GroupBaseInfo { groupAvatar: string, groupID: string, groupName: string, groupType: number }
export interface GroupMemeberInfo extends UserBaseInfo { userIdentity: string, userAuthority: number, joinGroupDate: number, }
export interface GroupSchema extends GroupBaseInfo { groupLevel: number, groupProfile: string, groupCreateDate: number, memberList: GroupMemeberInfo[], }

export interface FriendInfo extends UserBaseInfo { becomeFriendDate: number, }
export interface GroupJoinInInfo extends GroupBaseInfo { joinGroupDate: number, }
export interface historyRecordInfo extends GroupBaseInfo { lastOnlineMsg: string, lastOnlineDate: number }
export interface AddressSchema extends UserBaseInfo { joinGroupList: GroupJoinInInfo[], becomFriendList: FriendInfo[], historyRecordList: historyRecordInfo[] }

export interface MsgInfo extends UserBaseInfo { msg: string, msgID: string, msgDate: number, }
export interface MsgSchema extends GroupBaseInfo { msgList: MsgInfo[], }