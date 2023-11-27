import { TLocation } from "./Location";

export type TUserType = "organizator" | "volunteer";
export type TIdType = "legal" | "fiscal";
// Types for User Collection
export type TUser = {
  id: string; // Firebase-generated unique identifier
  userName: string; // Unique username
  email: string; // Unique email
  onBoardingCompleted: boolean; // Flag to indicate if user has completed onboarding
  onBoardingStep: number; // Step of onboarding process
  information?: TInformation
};

// Types for Information Collection
export type TInformation = {
  id: string; // Firebase-generated unique identifier
  name: string; // Organization or volunteer name
  lastName?: string; // Optional last name for volunteer
  userType:TUserType;
  idType: TIdType;
  identification: string;
  profilePicture?: string; // URL of profile picture
  location:TLocation;
  contact?: {
    emails: string[];
    phones: string[];
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  volunteer?: TVolunteer;
  organizator?: TOrganizator;
};

// Types for Volunteers Collection
export type TVolunteer = { 
  areasOfInterest: string[]; // List of volunteer's areas of interest
  skills: string[]; // List of volunteer's skills
  biography: string; // Volunteer's description
};

// Types for Organizations Collection
export type TOrganizator = {
  focusAreas: string[]; // List of organizator's focus areas
  description: string; // Organization's description and projects
};
