export type Candidate = {
  id: string;
  initials: string;
  title: string;
  gender: "Male" | "Female";
  age: number;
  city: string;
  country: string;
  experience: number;
  salary: number; // AED
  skills: string[];
  nationality: string;
  education: string;
};

export const CANDIDATES: Candidate[] = [
  { id: "c1", initials: "FA", title: "Executive Secretary", gender: "Female", age: 25, city: "Dubai", country: "UAE", experience: 3, salary: 8500, skills: ["MS Office", "Calendar Mgmt", "Arabic/English"], nationality: "Emirati", education: "BA Business Admin" },
  { id: "c2", initials: "MK", title: "Senior Accountant", gender: "Male", age: 32, city: "Riyadh", country: "Saudi Arabia", experience: 8, salary: 18000, skills: ["IFRS", "SAP", "Audit"], nationality: "Saudi", education: "B.Sc Accounting" },
  { id: "c3", initials: "NA", title: "Accountant", gender: "Female", age: 27, city: "Riyadh", country: "Saudi Arabia", experience: 3, salary: 11000, skills: ["QuickBooks", "VAT", "Excel"], nationality: "Saudi", education: "B.Sc Finance" },
  { id: "c4", initials: "OH", title: "Marketing Manager", gender: "Male", age: 36, city: "Doha", country: "Qatar", experience: 11, salary: 25000, skills: ["Branding", "Digital Ads", "Strategy"], nationality: "Qatari", education: "MBA Marketing" },
  { id: "c5", initials: "LS", title: "UI/UX Designer", gender: "Female", age: 29, city: "Dubai", country: "UAE", experience: 5, salary: 16000, skills: ["Figma", "Design Systems", "Prototyping"], nationality: "Emirati", education: "BA Design" },
  { id: "c6", initials: "AB", title: "Civil Engineer", gender: "Male", age: 34, city: "Kuwait City", country: "Kuwait", experience: 9, salary: 22000, skills: ["AutoCAD", "Project Mgmt", "Site Supervision"], nationality: "Kuwaiti", education: "B.Eng Civil" },
  { id: "c7", initials: "RA", title: "HR Specialist", gender: "Female", age: 30, city: "Manama", country: "Bahrain", experience: 6, salary: 12000, skills: ["Recruitment", "Onboarding", "Labor Law"], nationality: "Bahraini", education: "BA HR" },
  { id: "c8", initials: "SK", title: "Sales Executive", gender: "Male", age: 26, city: "Muscat", country: "Oman", experience: 4, salary: 9000, skills: ["B2B Sales", "CRM", "Negotiation"], nationality: "Omani", education: "BBA" },
];

export type Filters = {
  title?: string;
  gender?: "Male" | "Female";
  ageMin?: number;
  ageMax?: number;
  city?: string;
  experienceMin?: number;
  salaryMax?: number;
};

// Lightweight rule-based "AI" parser — converts NL queries to structured filters.
export function parseQuery(q: string): Filters {
  const f: Filters = {};
  const text = q.toLowerCase();

  if (/\b(female|woman|lady|girl|أنثى)\b/.test(text)) f.gender = "Female";
  else if (/\b(male|man|guy|ذكر)\b/.test(text)) f.gender = "Male";

  const cities = ["dubai","abu dhabi","sharjah","riyadh","jeddah","dammam","doha","kuwait city","manama","muscat"];
  const city = cities.find((c) => text.includes(c));
  if (city) f.city = city.replace(/\b\w/g, (l) => l.toUpperCase());

  const titles = ["secretary","accountant","engineer","designer","manager","developer","sales","hr","marketing","nurse","teacher","analyst"];
  const t = titles.find((x) => text.includes(x));
  if (t) f.title = t;

  const age = text.match(/(\d{2})\s*[- ]?\s*(?:year|yr|yo|age|سنة)/);
  if (age) { const n = parseInt(age[1]); f.ageMin = n - 2; f.ageMax = n + 2; }

  const exp = text.match(/(\d{1,2})\s*(?:\+|years?|yrs?)\s*(?:of\s*)?(?:experience|exp)?/);
  if (exp && !age) f.experienceMin = parseInt(exp[1]);
  else {
    const exp2 = text.match(/(\d{1,2})\s*(?:years?|yrs?)\s*experience/);
    if (exp2) f.experienceMin = parseInt(exp2[1]);
  }

  const sal = text.match(/(?:under|below|max|up to)\s*(\d{4,6})/);
  if (sal) f.salaryMax = parseInt(sal[1]);

  return f;
}

export function applyFilters(list: Candidate[], f: Filters): Candidate[] {
  return list.filter((c) => {
    if (f.title && !c.title.toLowerCase().includes(f.title.toLowerCase())) return false;
    if (f.gender && c.gender !== f.gender) return false;
    if (f.ageMin && c.age < f.ageMin) return false;
    if (f.ageMax && c.age > f.ageMax) return false;
    if (f.city && !c.city.toLowerCase().includes(f.city.toLowerCase())) return false;
    if (f.experienceMin && c.experience < f.experienceMin) return false;
    if (f.salaryMax && c.salary > f.salaryMax) return false;
    return true;
  });
}
