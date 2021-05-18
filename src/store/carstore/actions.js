/*
export function someAction (context) {
}
*/
export function changeName ({}, payload) {
    // console.log("Action called", payload)
    console.log("action called here", payload)
}
export function addTankAction ({}, payload) {
    console.log("addTankAction", payload)
}

export function getCarsAction ({ commit }, payload) {
    commit('GET_CARS_MUTATION', payload)
}

export function getTanksAction ({ commit }, payload) {
    commit('GET_TANKS_MUTATION', payload)
}
