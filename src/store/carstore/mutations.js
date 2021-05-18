/*
export function someMutation (state) {
}
*/

export const UPDATE_USERNAME_MUTATION = (state, newUser) => {
  state.username = newUser
}

export const GET_CARS_MUTATION = (state, cars) => {
  state.cars = cars
}

export const GET_TANKS_MUTATION = (state, tanks) => {
  // console.log("get tanks mutation")
  state.tanks = tanks
  // state.username = 'Brian'
}