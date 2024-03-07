import { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext();

export function RestaurantContextProvider({ children }) {
  const [user, setUser] = useState({});

  const [restaurants, setRestaurants] = useState([]);
  
  const fetchRestaurant = (lat, lng) => {
    fetch(`http://localhost:4000/restaurant/all/${lat}/${lng}`)
      .then((res) => res.json())
      .then((data) => {
        const restaurantsData = data.map((d) => {
          // console.log("d",d);
          const upvotes = d.voting.upvotes.length;
          const downvotes = d.voting.downvotes.length;
          const supervotes = d.voting.supervotes.length;
  
          return {
            ...d,
            totalVotes: upvotes + downvotes + supervotes,
            supervotes,
          };
        });
  
        // Find the maximum supervotes among all restaurants
        const maxSupervotes = Math.max(...restaurantsData.map((restaurant) => restaurant.supervotes));
        
        if(maxSupervotes > 0 ) {
          // Set the most popular restaurants with the highest supervotes
          const mostPopularRestaurants = restaurantsData.filter((restaurant) => restaurant.supervotes === maxSupervotes);
          
          console.log("ToSort", mostPopularRestaurants);
          // Update the restaurantsData with the mostPopular field
          const updatedRestaurantsData = restaurantsData.map((restaurant) => ({
            ...restaurant,
            mostPopular: mostPopularRestaurants.some((popular) => popular.data.reference === restaurant.data.reference),
          }));


    
          // Set the sorted and updated array as the new state for restaurants
          setRestaurants(updatedRestaurantsData);
        } else {
          const updatedRestaurantsData = restaurantsData.map((restaurant) => ({
            ...restaurant,
            mostPopular: false
          }));
    
          // Set the sorted and updated array as the new state for restaurants
          setRestaurants(updatedRestaurantsData);
        }
  
      });
  };


  const [placesData, setPlacesData] = useState(null);

  const fetchPlacesData = () => {
    const apiKey = "AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE";
    const latitude = "37.7749";
    const longitude = "-122.4194";

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=restaurant&key=${apiKey}`;
    // axios
    //   .get(apiUrl)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlacesData(data);
      });
  }

  return (
    <RestaurantContext.Provider value={{ fetchPlacesData, fetchRestaurant, restaurants, placesData }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}
