import axios from "axios"

/*
export function someAction (context) {
}
*/

// POST requests
export function addCarAction({ commit }, payload) {
  const addCarPromise = fetch("http://localhost:5000/cars", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  console.log("response from addCar POST", addCarPromise)
  return addCarPromise
}

// axios POST request shorthand
export function addTankAction ({}, payload) {
  const axiosPromise = axios.post("http://localhost:5000/tanks", payload)
  console.log("axios POST tank", axiosPromise)
  return axiosPromise
}

// axios post request longhand
// export function addTankAction({}, payload) {
//   const addTankPromise = axios({
//     method: 'post',
//     url: "http://localhost:5000/tanks",
//     data: payload
//   })
//   console.log("longhand axios POST", response)
//   return addTankPromise
// }

// longhand fetch API post request
// export function addTankAction ({}, payload) {
//   const addTankPromise = fetch("http://localhost:5000/tanks", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(payload)
//   })
//   console.log("response from addTank POST", addTankPromise)
//   return addTankPromise
// }

// GET requests
export function getCarsAction({ commit }) {
  fetch("http://localhost:5000/cars")
  .then((res) => res.json())
  .then((res) => {
    console.log("response from GET cars", res)
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
      console.log("response from GET tanks", res)
      return res.json()
    })
    .then((res) => {
      commit('GET_TANKS_MUTATION', res)
      return
    })
    .catch(e => {
      console.log(e)
    })
}

// PUT requests
export function editCarAction({}, payload) {
  const editCarPromise = fetch(`http://localhost:5000/cars/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(payload)
  })
  console.log("response from PUT car", editCarPromise)
  return editCarPromise
}

export function editTankAction({}, payload) {
  const editTankAction = fetch(`http://localhost:5000/tanks/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(payload)
  })
  console.log("response from PUT tank", editTankAction)
  return editTankAction
}

// DELETE requests
export function deleteCarAction({}, payload) {
  const deleteCarPromise = fetch(`http://localhost:5000/cars/${payload}`, {
    method: "DELETE"
  })
  console.log("response from DELETE car", deleteCarPromise)
  return deleteCarPromise
}

export function deleteTankAction({}, payload) {
  const deleteTankPromise = fetch(`http://localhost:5000/tanks/${payload}`, {
    method: "DELETE",
  })
  console.log("response from DELETE tank", deleteTankPromise)
  return deleteTankPromise
}




