export function getCount (state) {
  return state.isOpenTap
}
//列表页状态是否修改通知刷新
export function getChange (state) {
  return state.changeState
}
//列表页状态是否修改通知刷新
export function getUserStateTime(state) {
  return state.userStateTime
}
