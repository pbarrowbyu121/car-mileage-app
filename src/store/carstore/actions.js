/*
export function someAction (context) {
}
*/
export function changeName ({}, payload) {
    // console.log("Action called", payload)
}

// POST requests
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

// GET requests
export function getCarsAction ({ commit }) {
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

// PUT requests
export function editCarAction({}, payload) {
  fetch(`http://localhost:5000/cars/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    console.log("response from PUT request", res)
  });
}

export function editTankAction({}, payload) {
  fetch(`http://localhost:5000/tanks/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    console.log("response from PUT request", res)
  });
}

// DELETE requests
export function deleteCarAction({}, payload) {
  fetch(`http://localhost:5000/cars/${payload}`, {
    method: "DELETE"
  })
  .then((res) => console.log("deleteCar request", res))
}

export function deleteTankAction({}, payload) {
  fetch(`http://localhost:5000/tanks/${payload}`, {
    method: "DELETE",
  })
  .then((res) => {
    console.log("deleteTankAction res", res)
  });
}




