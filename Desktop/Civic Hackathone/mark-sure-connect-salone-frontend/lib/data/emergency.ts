export interface EmergencyContact {
  id: string
  name: string
  nameKr: string
  number: string
  description: string
  descriptionKr: string
  icon: "police" | "fire" | "ambulance" | "emergency"
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "police",
    name: "Police",
    nameKr: "Polis",
    number: "019",
    description: "For crimes, accidents, and security emergencies",
    descriptionKr: "Fɔ kraym, aksidεnt, εn sεkyuriti εmεjεnsi",
    icon: "police",
  },
  {
    id: "fire",
    name: "Fire Service",
    nameKr: "Faya Sεvis",
    number: "019",
    description: "For fire emergencies and rescue operations",
    descriptionKr: "Fɔ faya εmεjεnsi εn rεskyu ɔpεreshɔn",
    icon: "fire",
  },
  {
    id: "ambulance",
    name: "Ambulance",
    nameKr: "Ambulans",
    number: "019",
    description: "For medical emergencies and ambulance services",
    descriptionKr: "Fɔ mεdikal εmεjεnsi εn ambulans sεvis",
    icon: "ambulance",
  },
  {
    id: "national",
    name: "National Emergency Number",
    nameKr: "Nashɔnal Εmεjεnsi Nɔmba",
    number: "999",
    description: "General emergency hotline",
    descriptionKr: "Jεnεral εmεjεnsi ɔtlayn",
    icon: "emergency",
  },
]
