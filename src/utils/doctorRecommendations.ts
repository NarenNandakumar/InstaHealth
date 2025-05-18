
// Simulated doctor data
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
}

// This function simulates fetching doctor recommendations
// In a real app, this would call a medical provider API
export const getDoctorRecommendations = async (
  symptoms: string,
  location: string
): Promise<Doctor[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate some fake doctor data based on symptoms
  // In a real app, this would come from an API
  const specialties = determineSpecialties(symptoms);
  
  return specialties.flatMap(specialty => 
    generateDoctorsForSpecialty(specialty, location, 2)
  );
};

// Simple logic to determine medical specialties based on symptoms
// In a real app, this would use more sophisticated medical logic or an API
const determineSpecialties = (symptoms: string): string[] => {
  const symptomText = symptoms.toLowerCase();
  const specialties = new Set<string>();
  
  if (symptomText.includes('headache') || symptomText.includes('migraine') || 
      symptomText.includes('dizzy') || symptomText.includes('memory')) {
    specialties.add('Neurology');
  }
  
  if (symptomText.includes('chest') || symptomText.includes('heart') || 
      symptomText.includes('breath') || symptomText.includes('pressure')) {
    specialties.add('Cardiology');
  }
  
  if (symptomText.includes('stomach') || symptomText.includes('digest') || 
      symptomText.includes('nausea') || symptomText.includes('vomit')) {
    specialties.add('Gastroenterology');
  }
  
  if (symptomText.includes('skin') || symptomText.includes('rash') || 
      symptomText.includes('itch') || symptomText.includes('acne')) {
    specialties.add('Dermatology');
  }
  
  if (symptomText.includes('joint') || symptomText.includes('muscle') || 
      symptomText.includes('pain') || symptomText.includes('back')) {
    specialties.add('Orthopedics');
  }
  
  // Default to general practitioner if no specific specialty is found
  if (specialties.size === 0) {
    specialties.add('General Practice');
  }
  
  return Array.from(specialties);
};

// Generate fake doctor data
const generateDoctorsForSpecialty = (specialty: string, location: string, count: number): Doctor[] => {
  const doctors: Doctor[] = [];
  const locationPrefix = location.split(' ')[0];
  
  for (let i = 1; i <= count; i++) {
    const id = `${specialty.substring(0, 3)}-${i}-${Math.floor(Math.random() * 1000)}`;
    doctors.push({
      id,
      name: `Dr. ${getRandomLastName()}`,
      specialty,
      address: `${Math.floor(Math.random() * 1000) + 100} ${getRandomStreetName()} St, ${locationPrefix}, ${getRandomZipCode()}`,
      distance: `${(Math.random() * 5 + 0.5).toFixed(1)} miles`,
      phone: getRandomPhoneNumber(),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 star rating
    });
  }
  
  return doctors;
};

const getRandomLastName = (): string => {
  const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomStreetName = (): string => {
  const streets = ['Main', 'Oak', 'Maple', 'Park', 'Elm', 'Washington', 'Lake', 'Hill', 'Pine', 'Cedar', 'Walnut', 'Highland', 'Meadow', 'Forest', 'River', 'Valley', 'Summit', 'Willow', 'Spring', 'Sunset'];
  return streets[Math.floor(Math.random() * streets.length)];
};

const getRandomZipCode = (): string => {
  return `${Math.floor(Math.random() * 90000) + 10000}`;
};

const getRandomPhoneNumber = (): string => {
  const area = Math.floor(Math.random() * 900) + 100;
  const middle = Math.floor(Math.random() * 900) + 100;
  const last = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${middle}-${last}`;
};
