// function to compare tanks by odometer and sort
export function sortTanks(tanks, order) {
    if (order === 'asc') {
        return tanks.sort((a, b) => a.odometer - b.odometer)
    } 
    if (order === 'desc') {
        return tanks.sort((a, b) => b.odometer - a.odometer)
    }
    // let comparison = 0
    // if (tank1.odometer > tank2.odometer) {
    //     comparison = 1
    // } else if (tank1.odomter < tank2.odometer) {
    //     comparison = -1
    // }
    // return comparison
}

export function calcMPG(tanks) {
    // sort tanks
    if(tanks.length > 1) {
        // let sortedTanks = tanks.sort(this.sortTanks)
        let sortedTanks = sortTanks(tanks, 'asc')
        let gallons = 0
        let miles = parseInt(tanks[tanks.length - 1].odometer) - parseInt(tanks[0].odometer)
        let mpg = 0
        tanks.forEach(tank => gallons = gallons+parseFloat(tank.gallons))
        gallons = gallons - tanks[0].gallons
        mpg = (miles / gallons).toFixed(1)
        return mpg
    }
    return 0
}

