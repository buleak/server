import { Service } from 'egg';
import {RoomInfo, UserInfo, ChatRoom, MsgSchema} from '../interface'

class UserService extends Service {
    /**
     * 获取聊天群对应的聊天记录
     * @param userID 用户ID
     * @param targetID 聊天对象ID
     */
    async ChatHistory(userID: string, targetID: string) {
        const Group = this.ctx.model.Group;
        const msgGroup: MsgSchema|null = await Group.findOne({userID, targetID})
        if(!msgGroup) {
            const newMsgGroup = {
                userID,
                targetID,
                lastTalkDate: new Date().getTime(),
                msgList: []
            }
            await Group.insertMany(newMsgGroup)
            return newMsgGroup
        }else {
            return msgGroup
        }
    }
    /**
     * 查询在线人员名单
     * @param room {roomID, roomName, onlineList:[]}
     */
    async ChatRoom(roomInfo: RoomInfo, userInfo: UserInfo) {
        const Chat = this.ctx.model.Chat;
        const { userID } = userInfo;
        const { roomID, roomName } = roomInfo;
        const chatRoom:ChatRoom|null = await Chat.findOne({ roomID });
       
        if (!chatRoom) { // 如果聊天室不存在，创建一个新的聊天室，并把用户添加到在线列表中 
            const newChatRoom = {
                roomID,
                roomName,
                onlineList: [userInfo]
            }
            await Chat.insertMany(newChatRoom)
            return newChatRoom
        } else {
            const isOnChatRoom:boolean = chatRoom.onlineUserList && chatRoom.onlineUserList.some(user => user.userID === userID)
            if (!isOnChatRoom) {
                chatRoom.onlineUserList.push(userInfo)
                return await Chat.findOneAndUpdate({roomID, roomName}, {onlineUserList: chatRoom.onlineUserList}, {upsert: true})
            }else {
                return chatRoom
            }
        }
    }

    /**
     * 保存聊天记录
     * @param obj {用户ID、聊天对象ID、房间ID、发送的消息:{msg, date, 用户ID}}
     */
    async ClientEmitMsg(obj) {
        const Group = this.ctx.model.Group;
        const {userID, targetID, msgs} = obj;
        const msgGroup: MsgSchema|null = await Group.findOne({userID, targetID})
        if(!msgGroup) {
            const newMsgGroup = {
                userID,
                targetID,
                lastTalkDate: new Date().getTime(),
                msgList: [msgs]
            }
            await Group.insertMany(newMsgGroup)
        }else {
            msgGroup.msgList.push(msgs)
            return await Group.findOneAndUpdate({userID, targetID}, {msgList: msgGroup.msgList}, {upsert: true})
        }
    }

}

export default UserService