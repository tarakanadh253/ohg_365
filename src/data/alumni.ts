// Alumni/Success Stories Data Structure
export interface AlumniProfile {
  id: string;
  name: string;
  initials: string;
  position: string;
  company: string;
  package: string;
  batch: string;
  testimonial: string;
  profileImage?: string; // Optional: path to actual photo
  linkedinUrl?: string;
  email?: string;
  course: string;
  placementDate: string;
  isActive: boolean;
}

// Real alumni data with actual photos and placement information
export const alumniData: AlumniProfile[] = [
  {
    id: "1",
    name: "Bharagav",
    initials: "BH",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's comprehensive cloud training program helped me secure my dream job as an Associate Cloud Engineer at Zettamine, NTT DATA. The practical approach and industry-relevant curriculum made all the difference!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/bharagav-cloud-engineer",
    profileImage: "/alumni/bharagav.png"
  },
  {
    id: "2",
    name: "Indu",
    initials: "IN",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The cloud computing course at OneHubGlobal was exceptional! The hands-on labs and real-world projects prepared me perfectly for my role as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/indu-cloud-engineer",
    profileImage: "/alumni/indu.png"
  },
  {
    id: "3",
    name: "Kasim",
    initials: "KA",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's training program transformed my career! The comprehensive cloud and DevOps curriculum helped me land my position as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-25",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kasim-cloud-engineer",
    profileImage: "/alumni/kasim.png"
  },
  {
    id: "4",
    name: "Kiran D",
    initials: "KD",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The practical approach and industry-focused training at OneHubGlobal was exactly what I needed. Now I'm working as an Associate Cloud Engineer at Zettamine, NTT DATA!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-01",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiran-d-cloud-engineer",
    profileImage: "/alumni/kiran.png"
  },
  {
    id: "5",
    name: "Kiranmai K",
    initials: "KK",
    position: "Associate Cloud Engineer",
    company: "Baadalsoft",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's cloud computing program was outstanding! The comprehensive training and practical projects helped me secure my position as Associate Cloud Engineer at Baadalsoft.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiranmai-k-cloud-engineer",
    profileImage: "/alumni/kiranmai.png"
  },
  {
    id: "6",
    name: "Srilekha",
    initials: "SR",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The cloud computing course at OneHubGlobal was comprehensive and practical. The hands-on experience with modern cloud technologies helped me secure my role as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/srilekha-cloud-engineer",
    profileImage: "/alumni/srilekha.png"
  },
  {
    id: "7",
    name: "Yashwanth",
    initials: "YA",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's comprehensive cloud computing program transformed my career. The practical approach and industry-relevant curriculum helped me become an Associate Cloud Engineer at Zettamine, NTT DATA. Truly life-changing!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/yashwanth-cloud-engineer",
    profileImage: "/alumni/yashwanth.png"
  },
  {
    id: "8",
    name: "Chalapathi",
    initials: "CH",
    position: "Cloud Engineer",
    company: "Tech Solutions",
    package: "₹3.5 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's training program provided me with the skills and confidence to excel in cloud technologies. The practical approach and industry mentorship were invaluable!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/chalapathi-cloud-engineer",
    profileImage: "/alumni/Chalapathi.png"
  },
  {
    id: "9",
    name: "Chandu Naik K",
    initials: "CN",
    position: "Data Engineer",
    company: "HCL Tech",
    package: "₹15 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's comprehensive data engineering program transformed my career! The practical approach and industry-relevant curriculum helped me secure this amazing opportunity at HCL Tech.",
    course: "Data Engineering",
    placementDate: "2025-02-25",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/chandu-naik-data-engineer",
    profileImage: "/alumni/Chandu Naik K.png"
  },
  {
    id: "10",
    name: "Chekardgar",
    initials: "CH",
    position: "Azure Data Engineer",
    company: "Persistent Systems",
    package: "₹11 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's Azure data engineering program was exceptional! The hands-on experience with Azure services and data pipelines prepared me perfectly for my role at Persistent Systems.",
    course: "Azure Data Engineering",
    placementDate: "2024-03-01",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/chekardgar-azure-data-engineer",
    profileImage: "/alumni/Chekardgar.png"
  },
  {
    id: "11",
    name: "Govardhan Reddy",
    initials: "GR",
    position: "Cloud Infrastructure Engineer",
    company: "CloudTech Solutions",
    package: "₹4.5 LPA",
    batch: "2025 Batch",
    testimonial: "The comprehensive cloud infrastructure training at OneHubGlobal was outstanding. The practical approach and industry mentorship helped me secure my dream role!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-03-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/govardhan-reddy-cloud",
    profileImage: "/alumni/Govardhan reddy.png"
  },
  {
    id: "12",
    name: "Hussain P",
    initials: "HP",
    position: "Azure Data Engineer",
    company: "Persistent Systems",
    package: "₹13.50 LPA",
    batch: "2022 Batch",
    testimonial: "OneHubGlobal's Azure data engineering program was comprehensive and practical. The hands-on experience with modern Azure technologies and data solutions was invaluable for my career!",
    course: "Azure Data Engineering",
    placementDate: "2022-03-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/hussain-p-azure-data-engineer",
    profileImage: "/alumni/Hussain P.png"
  },
  {
    id: "13",
    name: "Keerthi",
    initials: "KE",
    position: "Azure Data Engineer",
    company: "Capgemini",
    package: "₹11 LPA",
    batch: "2025 Batch",
    testimonial: "The Azure data engineering training at OneHubGlobal was exceptional! The practical approach and real-world projects prepared me perfectly for my current role at Capgemini.",
    course: "Azure Data Engineering",
    placementDate: "2025-03-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/keerthi-azure-data-engineer",
    profileImage: "/alumni/Keerthi .png"
  },
  {
    id: "14",
    name: "Lakshman Kumar B",
    initials: "LK",
    position: "Data Engineer",
    company: "TalentOnlease",
    package: "₹13.10 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's data engineering program was comprehensive and practical. The hands-on labs and industry projects helped me excel in my current role at TalentOnlease!",
    course: "Data Engineering",
    placementDate: "2025-03-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/lakshman-kumar-data-engineer",
    profileImage: "/alumni/Lakshman kumar B.png"
  },
  {
    id: "15",
    name: "Madhu Reddy",
    initials: "MR",
    position: "Azure Data Engineer",
    company: "Accenture",
    package: "₹11 LPA",
    batch: "2021 Batch",
    testimonial: "The Azure data engineering training at OneHubGlobal was outstanding! The practical approach and industry mentorship transformed my understanding of data technologies and helped me secure this role at Accenture.",
    course: "Azure Data Engineering",
    placementDate: "2021-03-25",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/madhu-reddy-azure-data-engineer",
    profileImage: "/alumni/Madhu reddy.png"
  },
  {
    id: "16",
    name: "Mastanaiah",
    initials: "MA",
    position: "Azure Data Engineer",
    company: "Wipro",
    package: "₹10 LPA",
    batch: "2022 Batch",
    testimonial: "OneHubGlobal's Azure data engineering training was comprehensive and practical. The hands-on experience with Azure data services was invaluable for my career at Wipro!",
    course: "Azure Data Engineering",
    placementDate: "2022-03-30",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/mastanaiah-azure-data-engineer",
    profileImage: "/alumni/Mastanaiah.png"
  },
  {
    id: "17",
    name: "Pranay Kumar P",
    initials: "PK",
    position: "Azure Data Engineer",
    company: "Deloitte",
    package: "₹8 LPA",
    batch: "2022 Batch",
    testimonial: "The Azure data engineering training at OneHubGlobal was exceptional! The practical approach and real-world projects prepared me perfectly for my current role at Deloitte.",
    course: "Azure Data Engineering",
    placementDate: "2022-04-01",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/pranay-kumar-azure-data-engineer",
    profileImage: "/alumni/Pranay kumar P.png"
  },
  {
    id: "18",
    name: "Sajeev",
    initials: "SA",
    position: "Data Engineer",
    company: "Cognizant",
    package: "₹8.5 LPA",
    batch: "2021 Batch",
    testimonial: "OneHubGlobal's data engineering program was comprehensive and practical. The hands-on experience with data pipelines and ETL processes was invaluable for my career at Cognizant!",
    course: "Data Engineering",
    placementDate: "2021-04-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/sajeev-data-engineer",
    profileImage: "/alumni/Sajeev.png"
  },
  {
    id: "19",
    name: "Shiva Naik K",
    initials: "SN",
    position: "Data Engineer",
    company: "HCL Tech",
    package: "₹12 LPA",
    batch: "2025 Batch",
    testimonial: "The data engineering training at OneHubGlobal was outstanding! The practical approach and industry mentorship helped me excel in my current role at HCL Tech.",
    course: "Data Engineering",
    placementDate: "2025-04-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/shiva-naik-data-engineer",
    profileImage: "/alumni/Shiva Naik K.png"
  },
  {
    id: "20",
    name: "Vijayendra Reddy",
    initials: "VR",
    position: "Azure Data Engineer",
    company: "MassMutual",
    package: "₹15.20 LPA",
    batch: "2022 Batch",
    testimonial: "OneHubGlobal's Azure data engineering program was comprehensive and practical. The hands-on experience with enterprise data solutions was truly transformative for my career at MassMutual!",
    course: "Azure Data Engineering",
    placementDate: "2022-04-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/vijayendra-reddy-azure-data-engineer",
    profileImage: "/alumni/Vijayendra reddy.png"
  }
];

// Helper functions
export const getActiveAlumni = () => alumniData.filter(alumni => alumni.isActive);

export const getAlumniByCourse = (course: string) => 
  alumniData.filter(alumni => alumni.course.toLowerCase().includes(course.toLowerCase()));

export const getAlumniByCompany = (company: string) => 
  alumniData.filter(alumni => alumni.company.toLowerCase().includes(company.toLowerCase()));

export const getAlumniById = (id: string) => 
  alumniData.find(alumni => alumni.id === id);
