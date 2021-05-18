/*
export function someAction (context) {
}
*/
export function changeName ({}, payload) {
    // console.log("Action called", payload)
    console.log("action called here", payload)
}

export function addCarAction({ commit }, payload) {
  fetch("http://localhost:5000/cars", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then((res) => {
    console.log("response from addCar POST", res)
  })
}

export function addTankAction ({}, payload) {
  fetch("http://localhost:5000/tanks", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then((res) => {
    console.log("response from addTank POST", res)
  })
}

export function getCarsAction ({ commit }) {
    console.log("getCarsAction called from actions")
    fetch("http://localhost:5000/cars", {
      method: "GET"
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log("response", res)
      commit('GET_CARS_MUTATION', res)
    })
    .catch(e => {
      console.log(e)
    })
}

export function getTanksAction ({ commit }) {
    console.log("getTanksAction called from actions")
    fetch("http://localhost:5000/tanks", {
        method: "GET"
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        commit('GET_TANKS_MUTATION', res)
      })
      .catch(e => {
        console.log(e)
      })
}
