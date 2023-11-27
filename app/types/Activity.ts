import { DateType } from "react-native-ui-datepicker";

// Types for Volunteering Activities Collection
export type TActivity = {
  id: string; // Firebase-generated unique identifier
  owner: string; // Reference to the user identifier
  name: string; // Name of the volunteering activity
  areasOfInterest: string[]; // Areas of interest related to the activity
  date: DateType; // Date and time of the activity
  description: string; // Description of the activity
  registeredVolunteers: string[]; // List of references to volunteer identifiers
  images: string[]; // List of images related to the activity
  bannerImg: string; // Banner image related to the activity
  location: {
    province: string; // Reference to province identifier
    canton: string; // Reference to canton identifier
    district: string; // Reference to district identifier
    details: string; // Exact address
  };
};