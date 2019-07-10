import byteBuffer from 'bytebuffer'
import { load } from 'protobufjs'
import base64 from 'base64-js'

class Socket {
  constructor() {
    /**
     * socket 链接状态
     * @var SUCCESS 0 成功
     * @var FAILURE 1 失败
     * @var DISLINK 2 断开
     * @var TIMEOUT 3 超时
     */
    this.status = {
      SUCCESS: 0,
      FAILURE: 1,
      DISLINK: 2,
      TIMEOUT: 3
    }
    /**
     * socket 全局
     * @param uid          用户uid
     * @param socket       Socket 对象
     * @param stompClient  Websocket 对象
     * @param WSMessage    protobuf 文件对象
     * @param acks         确认消息队列
     * @param messageId    消息队列ID
     * @param a2cCallback  收到ack回调
     * @param a2sCallback  发送ack回调
     * @param conCallback  连接状态回调
     * @param recount      socket重连次数
     * @param remax        socket最大重连次数
     */
    this.uid = ''
    this.socket = null
    this.stompClient = null
    this.WSMessage = null
    this.acks = []
    this.a2cCallback = null
    this.a2sCallback = null
    this.conCallback = null
    this.messageId = 0
    this.recount = 0
    this.remax = 50

    this.initProtobuf()
  }
  /**
   * 初始化protobuf
   */
  initProtobuf() {
    load('./static/im_message.proto', (err, root) => {
      if (err) throw err
      this.WSMessage = root.lookupType('yingzi_center_im_message.ImMessage')
    })
  } 
  /**
   * 初始化 socket 变量
   * @param data 调用参数
   */
  connect(data) {
    const { uid, host, remax, a2cCallback, a2sCallback, conCallback } = data
    Object.assign(this, { uid, host, remax, a2cCallback, a2sCallback, conCallback })
    this.startConnect()
  }
  startConnect() {
    this.socket = new SockJS(this.host)
    this.stompClient = Stomp.over(this.socket)
    this.stompClient.connect(
      {},
      frame => {
        /**
         * websocket 订阅消息队列
         * @license  /system/message      系统广播消息
         * @license  /user/[uid]/message  用户信息消息
         * @license  /tribe/[uid]/message 群消息消息
         */
        this.stompClient.subscribe(`/system/message`, message => {
          console.log('收到的系统广播消息')
          this.getMessage(message.body)
        })
        this.stompClient.subscribe(`/user/${this.uid}/message`, message => {
          console.log('收到的用户信息:', message)
          this.getMessage(message.body)
        })
        this.stompClient.subscribe(`/tribe/${this.uid}/message`, messages => {
          console.log('收到的群消息', messages)
          this.getMessage(message.body)
        })
        /**
         * 执行回调 返回参数
         * @param status socket 链接状态
         */
        this.conCallback &&
          this.conCallback({
            status: this.status.SUCCESS
          })
      },
      err => {
        /**
         * 执行回调 返回参数
         * @param status socket链接状态 1.失败 2.重连超时
         * @param err 失败消息
         */
        this.recount += 1
        this.conCallback &&
          (this.recount === 0 || this.recount === this.remax) &&
          this.conCallback({
            status: this.recount === 0 ? this.status.FAILURE : this.status.TIMEOUT,
            err
          })

        /**
         * 开始失败重连
         */
        if (this.recount < this.remax + 1) {
          this.reconnect()
        }
      }
    )
  }
  /**
   * 处理接收到消息
   * 1.收到消息-回复ack
   * 2.发送消息-接收ack
   */
  getMessage(message) {
    const msg = message && typeof message === 'object' ? message : this.decodeData(message)
    const { messageType } = msg

    if (messageType && messageType === 'ack') {
      this.ack2Client(msg)
    } else {
      this.ack2Server(msg)
    }
  }
  /**
   * 服务端发送ack客户端
   */
  ack2Client(msg) {
    for (let i = 0; i < this.acks.length; i++) {
      const item = this.acks[i]
      if (msg.ctrlMessageId == item.messageId) {
        this.a2cCallback && this.a2cCallback(msg, item)
        this.acks.splice(i, 1)
        break
      }
    }
  }
  /**
   * 客服端发ack到服务端
   */
  ack2Server(msg) {
    const param = {
      messageId: ++this.messageId,
      messageType: 'ack',
      ctrlMessageId: msg.messageId,
      messageUnique: msg.messageUnique,
      messageTime: new Date().getTime(),
      protocol: 'YZIMP',
      sender: msg.sender,
      userId: this.uid,
      version: '1.0'
    }
    this.send(param, () => {
      this.a2sCallback(msg)
    })
  }
  /**
   * 消息发送方法
   */
  send(param, callback) {
    const data = { messageId: ++this.messageId, ...param }
    const buf = base64.fromByteArray(this.encodeData(data))
    try {
      this.stompClient.send('/websocket/message', {}, buf)
      this.acks.push(data)
      callback && callback(data)
    } catch (e) {
      console.error('websocket is not connect!')
    }
  }
  /**
   * 失败重连方法
   */
  reconnect() {
    console.error(`连接失败，尝试第${this.recount}次重新连接！`)  
    setTimeout(() => {
      this.startConnect()
    }, 10000)
  }
  /**
   * 断开连接方法
   */
  disconnect(callback) {
    this.stompClient &&
      this.stompClient.disconnect(() => {
        callback && callback()
      })
  }
  /**
   * protobuf 文件格式加密
   */
  encodeData(param) {
    return this.WSMessage.encode(this.WSMessage.create(param)).finish()
  }
  /**
   * protobuf 文件格式解码
   */
  decodeData(base64String) {
    return this.WSMessage.decode(base64.toByteArray(base64String))
  }
}
export default Socket
