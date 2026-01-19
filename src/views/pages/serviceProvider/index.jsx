import React from 'react'
import PetGroomer from "./petGroomer/index"
import PetBehaviourist from "./petBehaviourist/index"
import PetWalker from "./petWalker/index"

import { useParams } from "react-router-dom";

function index() {

    const { serviceType } = useParams();



  return (
    <div>
      {/* Debug */}
      {/* <p>{serviceType}</p> */}

      {serviceType === "petGroomer" && <PetGroomer />}
      {serviceType === "petBehaviourist" && <PetBehaviourist />}
      {serviceType === "petWalker" && <PetWalker />}
    </div>
  )
}

export default index