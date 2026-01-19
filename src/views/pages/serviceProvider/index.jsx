import React, { useEffect, useState } from 'react'
import PetGroomer from "./petGroomer/index"
import PetBehaviourist from "./petBehaviourist/index"
import PetWalker from "./petWalker/index"

import { useParams } from "react-router-dom";

function index() {

    const { serviceType } = useParams();

    const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
     
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div>
      <p>{error}</p>
      {/* Debug */}
      {/* <p>{serviceType}</p> */}
      {serviceType === "petGroomer" && <PetGroomer location={location} />}
      {serviceType === "petBehaviourist" && <PetBehaviourist location={location} />}
      {serviceType === "petWalker" && <PetWalker location={location} />}
    </div>
  )
}

export default index