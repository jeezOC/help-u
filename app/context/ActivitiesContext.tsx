import { createContext, useEffect, useState } from "react";
import { TActivity } from "../types/Activity";
import activityService from "../services/activityService";


type TActivitiesContext = {
  activities: TActivity[],
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>
  selectedActivity: TActivity,
  updateSelectedActivity: (id: string) => void
}

export const ActivitiesContext = createContext<TActivitiesContext>({} as TActivitiesContext);

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<TActivity>({} as TActivity);

  const updateSelectedActivity = (activityId: string) => {
    const activity = activities.find(activity => activity.id === activityId)
    setSelectedActivity(activity)
  }

  const values = {
    activities,
    setActivities,
    selectedActivity, updateSelectedActivity
  }
  const fetchActivities = async () => {
    const { data } = await activityService.getAll();
    setActivities(data);
  }

  useEffect(() => {
    fetchActivities();
  }, [])

  return (
    <ActivitiesContext.Provider value={values}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export default ActivitiesProvider;