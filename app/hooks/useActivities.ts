import { useContext } from 'react';
import { ActivitiesContext } from '../context/ActivitiesContext';

export const useActivities = () => {
	return useContext(ActivitiesContext);
};
