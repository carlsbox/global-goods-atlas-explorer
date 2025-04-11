import { useQuery } from "@tanstack/react-query";
import { GlobalGood, UseCase, CountryData } from "./types";

// Replace this with your Google Sheets API key
const SHEETS_API_KEY = "YOUR_GOOGLE_API_KEY";

// Replace with your sheet IDs
const GLOBAL_GOODS_SHEET_ID = "YOUR_SHEET_ID";
const USE_CASES_SHEET_ID = "YOUR_SHEET_ID";
const COUNTRIES_SHEET_ID = "YOUR_SHEET_ID";

// For development purpose, we'll use mock data initially
const MOCK_DATA = {
  globalGoods: [
    {
      id: "openmrs",
      name: "OpenMRS",
      description: "Open-source electronic medical record system platform.",
      website: "https://openmrs.org",
      github: "https://github.com/openmrs",
      sector: ["Health"],
      countries: ["Kenya", "Rwanda", "Uganda", "Haiti", "India"],
      technologies: ["Java", "JavaScript", "React", "MySQL"],
      implementers: ["Partners In Health", "ThoughtWorks", "Regenstrief Institute"],
      supporters: ["Regenstrief Institute", "Digital Square"],
      licenses: ["Mozilla Public License 2.0"],
      lastUpdated: "2023-10-15",
      logo: "https://openmrs.org/wp-content/uploads/2017/07/cropped-openmrs-logo-1.png",
      sdgs: ["SDG3"],
      maturity: "Global Scale",
      summary: "OpenMRS is a software platform and a reference application which enables design of a customized medical records system with no programming knowledge.",
      tags: ["EMR", "EHR", "Health Records"],
      healthStandards: ["HL7v2", "OpenHIE"],
      whoSystemClassification: {
        primary: ["C1 | C1 Electronic medical records"],
        additional: ["D3 | D3 Civil registration and vital statistics"]
      }
    },
    {
      id: "dhis2",
      name: "DHIS2",
      description: "Health Management Information System and data warehouse.",
      website: "https://dhis2.org",
      github: "https://github.com/dhis2",
      sector: ["Health"],
      countries: ["Tanzania", "Ghana", "India", "Bangladesh", "Norway"],
      technologies: ["Java", "React", "PostgreSQL"],
      implementers: ["HISP", "University of Oslo"],
      supporters: ["University of Oslo", "NORAD", "PEPFAR"],
      licenses: ["BSD 3-Clause License"],
      lastUpdated: "2023-11-20",
      logo: "https://dhis2.org/wp-content/uploads/dhis2-logo-rgb.png",
      sdgs: ["SDG3", "SDG17"],
      maturity: "Global Scale",
      summary: "DHIS2 is the world's largest health management information system platform, in use in more than 70 countries.",
      tags: ["HMIS", "Health Data", "Analytics"],
      healthStandards: ["ADX", "FHIR", "CDA", "ICD-10"],
      whoSystemClassification: {
        primary: ["D6 | D6 Health management information systems (HMIS)"],
        additional: [
          "A2 | A2 Community-based information systems",
          "B6 | B6 Logistics management information systems (LMIS)",
          "E2 | E2 Public health and disease surveillance system",
          "D8 | D8 Shared Health Record and Health Information Repositories"
        ]
      }
    },
    {
      id: "odkcollect",
      name: "ODK Collect",
      description: "Mobile data collection application for Android.",
      website: "https://getodk.org",
      github: "https://github.com/getodk/collect",
      sector: ["Health", "Research", "Agriculture"],
      countries: ["Kenya", "India", "Brazil", "USA", "Philippines"],
      technologies: ["Java", "Android", "XForms"],
      implementers: ["ODK community", "Nafundi"],
      supporters: ["UW-CSE", "Google", "Gates Foundation"],
      licenses: ["Apache License 2.0"],
      lastUpdated: "2023-09-05",
      logo: "https://getodk.org/assets/img/logo.png",
      sdgs: ["SDG3", "SDG2", "SDG16"],
      maturity: "Global Scale",
      summary: "ODK Collect is an open source Android app that replaces paper forms used in survey-based data gathering.",
      tags: ["Mobile Data", "Surveys", "Forms"],
      healthStandards: ["OpenHIE"],
      whoSystemClassification: {
        primary: ["A1 | A1 Client communication systems"],
        additional: ["D2 | D2 Electronic forms"]
      }
    }
  ],
  useCases: [
    {
      id: "kenya-hiv",
      title: "HIV Treatment Monitoring in Kenya",
      description: "Implementation of OpenMRS to track HIV patients across clinics in Kenya.",
      country: "Kenya",
      sector: "Health",
      globalGoods: ["openmrs"],
      organization: "Partners In Health",
      year: "2020",
      link: "https://example.org/case-kenya",
      results: "Improved patient tracking and reporting."
    },
    {
      id: "tanzania-malaria",
      title: "Malaria Surveillance in Tanzania",
      description: "Using DHIS2 to track and respond to malaria outbreaks.",
      country: "Tanzania",
      sector: "Health",
      globalGoods: ["dhis2"],
      organization: "Ministry of Health",
      year: "2021",
      link: "https://example.org/case-tanzania",
      results: "30% improvement in response time to outbreaks."
    },
    {
      id: "india-vaccination",
      title: "Vaccination Campaign in Rural India",
      description: "Mobile data collection for vaccination rates using ODK Collect.",
      country: "India",
      sector: "Health",
      globalGoods: ["odkcollect"],
      organization: "UNICEF",
      year: "2022",
      link: "https://example.org/case-india",
      results: "Reached 95% of target population in remote areas."
    }
  ],
  countries: [
    { code: "KE", name: "Kenya", region: "Africa", lat: -1.286389, lng: 36.817223, globalGoods: ["openmrs", "odkcollect"] },
    { code: "RW", name: "Rwanda", region: "Africa", lat: -1.940278, lng: 29.873888, globalGoods: ["openmrs"] },
    { code: "UG", name: "Uganda", region: "Africa", lat: 0.347596, lng: 32.582520, globalGoods: ["openmrs"] },
    { code: "TZ", name: "Tanzania", region: "Africa", lat: -6.369028, lng: 34.888822, globalGoods: ["dhis2"] },
    { code: "GH", name: "Ghana", region: "Africa", lat: 7.946527, lng: -1.023194, globalGoods: ["dhis2"] },
    { code: "IN", name: "India", region: "Asia", lat: 20.593684, lng: 78.962880, globalGoods: ["dhis2", "openmrs", "odkcollect"] },
    { code: "BD", name: "Bangladesh", region: "Asia", lat: 23.684994, lng: 90.356331, globalGoods: ["dhis2"] },
    { code: "BR", name: "Brazil", region: "South America", lat: -14.235004, lng: -51.925280, globalGoods: ["odkcollect"] },
    { code: "US", name: "USA", region: "North America", lat: 37.090240, lng: -95.712891, globalGoods: ["odkcollect"] },
    { code: "PH", name: "Philippines", region: "Asia", lat: 12.879721, lng: 121.774017, globalGoods: ["odkcollect"] },
    { code: "HT", name: "Haiti", region: "North America", lat: 18.971187, lng: -72.285215, globalGoods: ["openmrs"] },
    { code: "NO", name: "Norway", region: "Europe", lat: 60.472024, lng: 8.468946, globalGoods: ["dhis2"] }
  ]
};

// Fetch global goods data
export const useGlobalGoods = () => {
  return useQuery({
    queryKey: ['globalGoods'],
    queryFn: async (): Promise<GlobalGood[]> => {
      // In a real implementation, you would fetch from Google Sheets API
      // For now, return mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DATA.globalGoods), 500);
      });
    }
  });
};

// Fetch a single global good by ID
export const useGlobalGood = (id: string | undefined) => {
  return useQuery({
    queryKey: ['globalGood', id],
    queryFn: async (): Promise<GlobalGood | undefined> => {
      if (!id) return undefined;
      
      // In a real implementation, you would fetch from Google Sheets API
      // For now, filter mock data
      return new Promise((resolve) => {
        const good = MOCK_DATA.globalGoods.find(g => g.id === id);
        setTimeout(() => resolve(good), 500);
      });
    },
    enabled: !!id
  });
};

// Fetch use cases data
export const useUseCases = () => {
  return useQuery({
    queryKey: ['useCases'],
    queryFn: async (): Promise<UseCase[]> => {
      // In a real implementation, you would fetch from Google Sheets API
      // For now, return mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DATA.useCases), 500);
      });
    }
  });
};

// Fetch a single use case by ID
export const useUseCase = (id: string | undefined) => {
  return useQuery({
    queryKey: ['useCase', id],
    queryFn: async (): Promise<UseCase | undefined> => {
      if (!id) return undefined;
      
      // In a real implementation, you would fetch from Google Sheets API  
      // For now, filter mock data
      return new Promise((resolve) => {
        const useCase = MOCK_DATA.useCases.find(uc => uc.id === id);
        setTimeout(() => resolve(useCase), 500);
      });
    },
    enabled: !!id
  });
};

// Fetch countries data
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<CountryData[]> => {
      // In a real implementation, you would fetch from Google Sheets API
      // For now, return mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DATA.countries), 500);
      });
    }
  });
};

// Real implementation would look something like:
/*
const fetchSheetData = async (sheetId: string, range: string): Promise<any[]> => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${SHEETS_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  
  const data = await response.json();
  return parseSheetData(data.values);
};

const parseSheetData = (values: string[][]): any[] => {
  if (!values || values.length < 2) return [];
  
  const headers = values[0];
  const rows = values.slice(1);
  
  return rows.map(row => {
    const item: Record<string, any> = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || "";
    });
    return item;
  });
};
*/
