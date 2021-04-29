export function calcMPG(tanks) {
    // sort tanks
    console.log("tanks", tanks)
    let gallons = 0
    let miles = tanks[tanks.length - 1].odometer - tanks[0].odometer
    let mpg = 0
    tanks.forEach(tank => gallons = gallons+tank.gallons)
    gallons = gallons - tanks[0].gallons
    mpg = (miles / gallons).toFixed(1)
    return mpg
}