
// -------- chat --------
// login
export interface LoginRes { status: boolean, msg: string, token?: string, userInfo?: UserInfo, }


export interface RoomInfo { roomID: string, roomName: string }
export interface ChatRoom { roomID: string, roomName: string, onlineUserList: UserInfo[] }


export interface Msg { userID: string, msg: string }
export interface ClientEmitMsg { userID: string, targetID: string, roomID: string, msgs: Msg }
export interface MsgGroup { userID: string, targetID: string, lastTalkDate?: number, msgList: Msg[] }

export interface UserBaseInfo { avatar: string, userID: string, userName: string, isFriend?: boolean }
export interface UserInfo extends UserBaseInfo { sex: string, msgNum?: number, registerDate: number, lastOnlineMsg?: string, lastOnlineDate: number, }
export interface UserShowInfo extends UserBaseInfo { sex: string, msgNum?: number, registerDate: number, lastOnlineMsg?: string, lastOnlineDate: number, }
export interface UserSchema extends UserBaseInfo { passWord: string, sex: string, star: number, score: number, msgNum: number, registerDate: number, lastOnlineMsg: string, lastOnlineDate: number, }

export interface FriendInfo extends UserBaseInfo { becomeFriendDate: number, }
export interface GroupJoinInInfo extends GroupBaseInfo { joinGroupDate: Number, }
export interface AddressSchema extends UserBaseInfo { joinGroupList: GroupJoinInInfo[], becomFriendList: FriendInfo[], }

export interface GroupBaseInfo { groupAvatar: string, groupID: string, groupName: string, }
export interface GroupMemeberInfo extends UserBaseInfo { joinGroupDate: Number, }
export interface GroupSchema extends UserBaseInfo, GroupBaseInfo { groupType: number, groupProfile: String, memberList: GroupMemeberInfo[], }

export interface MsgInfo extends UserBaseInfo { msg: string, msgID: string, msgDate: number, }
export interface MsgSchema extends GroupBaseInfo { msgProfile: string, msgList: MsgInfo[], }