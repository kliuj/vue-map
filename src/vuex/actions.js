// action 会收到 store 作为它的第一个参数
// 在 store 里我们只需要 dispatch （在有些情况下需要 state）
// 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用
export const incrementCounter = function ({ dispatch, state }) {
    dispatch('INCREMENT')
}
//是否刷新银行卡，地址列表信息
export const changeState = function ({ dispatch, state }) {
    dispatch('CHANGE')
}
//控制用户信息刷新
export const userInfoState = function ({ dispatch, state }) {
    dispatch('USERSTATECHANGE')
}
