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
    if(tanks.length > 1) {
        let sortedTanks = sortTanks(tanks, 'desc')
        console.log("sortedTanks", sortedTanks)
        let gallons = 0
        // let miles = parseInt(tanks[tanks.length - 1].odometer) - parseInt(tanks[0].odometer)
        let miles = sortedTanks[0].odometer
        let mpg = 0
        sortedTanks.forEach(tank => {
            gallons = gallons+parseFloat(tank.gallons)
        })
        // gallons = gallons - tanks[0].gallons
        console.log("miles", miles)
        console.log("gallons", gallons)
        mpg = (miles / gallons).toFixed(1)
        return mpg
    }
    return 0
}

