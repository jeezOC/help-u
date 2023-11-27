import { createContext, useState } from "react";
import { TActivity } from "../types/Activity";


type TActivitiesContext = {
  activities: TActivity[],
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>
}

export const ActivitiesContext = createContext<TActivitiesContext>({} as TActivitiesContext);

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState<TActivity[]>([]);

  const values = {
    activities,
    setActivities,
  }

  return (
    <ActivitiesContext.Provider value={values}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export default ActivitiesProvider;