// Types for Volunteering Activities Collection
export type VolunteeringActivity = {
  id: string; // Firebase-generated unique identifier
  activityName: string; // Name of the volunteering activity
  location: {
    name: string; // Unique address name
    province: string; // Reference to province identifier
    canton: string; // Reference to canton identifier
    district: string; // Reference to district identifier
    details: string; // Exact address
  };
  areasOfInterest: string[]; // Areas of interest related to the activity
  dateTime: string; // Date and time of the activity
  description: string; // Description of the activity
  associatedOrganizator: string; // Reference to the organizator managing the activity
  registeredVolunteers: string[]; // List of references to volunteer identifiers
  images: string[]; // List of images related to the activity
};