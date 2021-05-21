// function to compare tanks by odometer and sort
export function sortTanks(tanks, order) {
    if (order === 'asc') {
        return tanks.sort((a, b) => a.odometer - b.odometer)
    } 
    if (order === 'desc') {
        return tanks.sort((a, b) => b.odometer - a.odometer)
    }
}

export function calcMPG(tanks) {
    if(tanks.length > 0) {
        let sortedTanks = sortTanks(tanks, 'desc')
        let gallons = 0
        let miles = sortedTanks[0].odometer
        let mpg = 0
        sortedTanks.forEach(tank => {
            gallons = gallons+parseFloat(tank.gallons)
        })
        mpg = (miles / gallons).toFixed(1)
        return mpg
    }
    return 0
}

