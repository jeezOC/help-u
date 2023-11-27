// Types for Province Collection
export type TProvince = {
  id?: string; // Firebase-generated unique identifier
  name: string; // Unique province name
  // code: string; // Postal code
};

// Types for Canton Collection
export type TCanton = {
  id?: string; // Firebase-generated unique identifier
  name: string; // Unique canton name
  province: string; // Reference to province identifier
  // code: string; // Postal code
};

// Types for District Collection
export type TDistrict = {
  id?: string; // Firebase-generated unique identifier
  name: string; // Unique district name
  canton: string; // Reference to canton identifier
  // code: string; // Postal code
};

// Types for TLocation Collection
export type TLocation = {
  id?: string; // Firebase-generated unique identifier
  province: string;
  canton: string;
  district: string;
  details: string; // Exact address
};