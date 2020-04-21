export default {
    /**
     * 封装数据格式
     * @param action 行为
     * @param payload 负载
     * @param metadata 元数据
     * 例如：{
     *  meta: {
     *      timestamp: 1512111111111,
     *      client: 'xxx',
     *      target: 'xxx',
     *  },
     *  data: {
     *      action: 'exchange',
     *      payload: {},
     *  }
     * }
     */
    parseMsg(action, payload={}, metadata={}) {
        const meta = Object.assign({}, {
            timestamp: Date.now() // 时间戳
        }, metadata);
        return {
            meta,
            data: {
                action,
                payload
            }
        }
    }
}