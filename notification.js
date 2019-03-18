// 用来存放监听事件
let _notifications = []

/* 添加监听事件
* notificationName  事件传递名称
* selector          事件回调函数
* observe           事件监听者
* */
function addNotification (notificationName, selector, observe) {
  console.log('addNotification=', notificationName, 'selector=', selector, 'observe=', observe)
  if (!notificationName || !selector || !observe) {
    console.log('addNotification error')
    return
  }

  let alreadyNotifi = false
  try {
    _notifications.forEach(item => {
      if (item.name === notificationName && item.selector === selector && item.observe === observe) {
        alreadyNotifi = true
        throw new Error('该实例或组件已添加该通知')
      }
    })
  } catch (e) {
    if (e.message !== '该实例或组件已添加该通知') {
      throw e
    }
  }

  if (alreadyNotifi) {
    console.log('该实例或组件已添加该通知')
    return
  }

  let notification = {
    name: notificationName,
    selector: selector,
    observe: observe
  }

  _notifications.push(notification)
}

/* 发送通知
* notificationName 事件名称
* payload          事件回调函数所需参数
* */
function postNotification (notificationName, payload) {
  console.log('postNotification=' + notificationName, 'payload=', payload)
  if (!notificationName) {
    console.log('postNotification error')
    return
  }

  _notifications.forEach(item => {
    if (item.name === notificationName) {
      item.selector(payload)
    }
  })
}

/* 移除监听
* notificationName 事件名称
* observe          监听者
* */
function removeNotification (notificationName, observe) {
  console.log('removeNotification=' + notificationName, 'observe=', observe)
  if (!notificationName || !observe) {
    console.log('removeNotification error')
    return
  }

  _notifications.forEach((item, index) => {
    if (item.name === notificationName && item.observe === observe) {
      _notifications.splice(index, 1)
    }
  })
}

export default {
  addNotification,
  postNotification,
  removeNotification
}
