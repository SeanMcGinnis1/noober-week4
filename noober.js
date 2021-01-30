async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides
  
  let levelOfService = []
  //Code to loop through the rides
  for (let i = 0; i<json.length; i++) {
    levelOfService = service(json[i])
    let outputElement = document.querySelector('.rides')
    outputElement.insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService}</span>
      </h1>`)

    legloop(json[i],levelOfService)
    

    
  }


  
  //This funciton loops through the legs of a ride and outputs the HTML for the visual
  function legloop(ride) {
    for(let j = 0; j<ride.length; j++){
        //console.log(purple(levelOfService))

        
        let outputElement = document.querySelector('.rides')
        outputElement.insertAdjacentHTML('beforeend', `
        
        <div class="border-4 ${purple(ride)} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
             <h2 class="text-2xl py-1">${fullname(ride[j])}</h2>
             <p class="font-bold text-gray-600">${ride[j].passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl bg-gray-600 text-white p-2">
                ${passengers(ride[j])} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${ride[j].pickupLocation.address}</p>
              <p>${ride[j].pickupLocation.city}, ${ride[j].pickupLocation.state} ${ride[j].pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${ride[j].dropoffLocation.address}</p>
              <p>${ride[j].dropoffLocation.city}, ${ride[j].dropoffLocation.state} ${ride[j].dropoffLocation.zip}</p>
            </div>
          </div>
        </div>`)
        
    }
  }
  //Function legloop has ended
  
  
  //Function for determining the level of service of a ride
  function service(ride) {
    let levelOfService = []
    if (ride[0].purpleRequested == true && ride[0].numberOfPassengers < 4) {
      levelOfService = 'Noober Purple'
    }
    if (ride.length > 1) {
      levelOfService = 'Noober Pool'
    }
    if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    }
    if (ride[0].numberOfPassengers < 4 && ride[0].purpleRequested == false && ride.length == 1) {
      levelOfService = 'Noober X'}
    return levelOfService
  }

  //Function for listing out the full name of a leg
  function fullname(leg) {
  let FullName = leg.passengerDetails.first + ` ` + leg.passengerDetails.last
  return FullName
  }

  //Funection for displaying number of passengers
  function passengers(leg) {
  let Passengers = leg.numberOfPassengers
  return Passengers  
  }

  //Function for turning the border purple
  function purple(ride) {
    let purp = 'border-purple-500'
    console.log(service(ride))
    if (service(ride) != 'Noober Purple') {
      purp = 'border-gray-900'
    }
    
    return purp
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)

