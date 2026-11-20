import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Landmark,
  Megaphone,
  HardHat,
  MessageSquareWarning,
  Users,
  Vote,
  MapPin,
  Volume2,
  VolumeX,
  Phone,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Sun,
  Droplets,
  Trash2,
  Route,
  GraduationCap,
  HeartPulse,
  Baby,
  Compass,
  Camera,
  ChevronRight,
  ThumbsUp,
  Calendar,
  IndianRupee,
  Sliders,
  Check,
  X,
  ArrowUpRight,
  Award,
  Radio,
  Share2,
  Copy,
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

// ==========================================
// INITIAL DATASET FOR PIPRI GRAM PANCHAYAT
// ==========================================

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    date: '17 Nov 2026 • 10:00 AM',
    category: 'Gram Sabha',
    categoryHi: 'ग्राम सभा',
    urgent: true,
    authorityEn: 'Smt. Savitri Devi (Sarpanch)',
    authorityHi: 'श्रीमती सावित्री देवी (सरपंच)',
    titleEn: 'Gram Sabha Meeting - Next Tuesday at 10 AM',
    titleHi: 'ग्राम सभा की विशेष बैठक - अगले मंगलवार सुबह 10 बजे',
    descEn: 'All villagers of Wards 1 to 8 are invited to Panchayat Bhawan courtyard to review the Winter Road Audit, Jal Jeevan pipeline expansion, and social audit of MGNREGA works.',
    descHi: 'वार्ड 1 से 8 के सभी ग्रामवासियों को पंचायत भवन प्रांगण में शीतकालीन सड़क ऑडिट, जल जीवन पाइपलाइन विस्तार और मनरेगा कार्यों के सामाजिक अंकेक्षण की समीक्षा हेतु आमंत्रित किया जाता है।'
  },
  {
    id: 'ann-2',
    date: '20 Nov 2026 • 09:00 AM',
    category: 'Agriculture',
    categoryHi: 'कृषि',
    urgent: false,
    authorityEn: 'Krishi Vigyan Officer, Pipri',
    authorityHi: 'कृषि विज्ञान अधिकारी, पिपरी',
    titleEn: 'PM-Kisan 19th Installment e-KYC & Rabi Seed Subsidy Camp',
    titleHi: 'पीएम-किसान ई-केवाईसी एवं रबी बीज सब्सिडी शिविर',
    descEn: '50% subsidized certified wheat and mustard seeds available at Panchayat Godown. Bring Aadhaar card and land passbook for instant biometric verification.',
    descHi: 'पंचायत गोदाम में 50% अनुदानित प्रमाणित गेहूं और सरसों के बीज उपलब्ध हैं। तत्काल बायोमेट्रिक सत्यापन के लिए आधार कार्ड और खतौनी पासबुक साथ लाएं।'
  },
  {
    id: 'ann-3',
    date: '22 Nov 2026 • 08:30 AM',
    category: 'Health',
    categoryHi: 'स्वास्थ्य',
    urgent: false,
    authorityEn: 'Primary Health Center (PHC) Pipri',
    authorityHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) पिपरी',
    titleEn: 'Universal Maternal & Child Vaccination Drive at Anganwadi #1',
    titleHi: 'आंगनवाड़ी केंद्र #1 में मातृ एवं शिशु टीकाकरण अभियान',
    descEn: 'Free Polio, Measles-Rubella, and Tetanus immunization camp along with iron-folic distribution and digital ABHA Health ID card generation.',
    descHi: 'निःशुल्क पोलियो, खसरा-रूबेला और टेटनस टीकाकरण शिविर के साथ आयरन-फोलिक वितरण एवं डिजिटल आभा (ABHA) स्वास्थ्य कार्ड निर्माण।'
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    code: 'GP-PIP-2026-01',
    ward: 'Ward 2 & 3',
    category: 'Roads',
    categoryHi: 'सड़क',
    titleEn: 'Paved Road Project (Concrete CC Road Construction)',
    titleHi: 'पक्की सड़क परियोजना (कंक्रीट सीसी सड़क निर्माण)',
    descEn: '650-meter heavy-duty reinforced cement concrete road from Main Chowk to Primary Health Center with side interlock tiles.',
    descHi: 'मुख्य चौक से प्राथमिक स्वास्थ्य केंद्र तक 650 मीटर मजबूत सीमेंट कंक्रीट सड़क और साइड इंटरलॉक टाइल्स का निर्माण।',
    sanctionedBudget: 450000,
    spentBudget: 460000, // Trigger spending > progress flag
    progress: 80,
    contractorEn: 'Gramin Nirman Sahakari Samiti',
    contractorHi: 'ग्रामीण निर्माण सहकारी समिति',
    startDate: '01 Sep 2026',
    etaDate: '30 Nov 2026',
    milestones: [
      { en: 'Earthwork & Leveling', hi: 'मिट्टी भराई और समतलीकरण', done: true },
      { en: 'Gravel Base Layering', hi: 'गिट्टी बेस परत बिछाना', done: true },
      { en: 'CC Pouring & Curing', hi: 'कंक्रीट ढलाई और तराई', done: true },
      { en: 'Shoulder Drains & Signboard', hi: 'साइड नाली और सूचना पट्ट', done: false }
    ]
  },
  {
    id: 'proj-2',
    code: 'GP-PIP-2026-02',
    ward: 'All 8 Wards',
    category: 'Streetlights',
    categoryHi: 'स्ट्रीटलाइट',
    titleEn: 'Solar Streetlight Installation (45 Smart LED Poles)',
    titleHi: 'सौर स्ट्रीटलाइट स्थापना (45 स्मार्ट एलईडी खंभे)',
    descEn: 'Installation of 40W lithium-phosphate solar street lamps at dark intersections, temple road, and women safety hotspots.',
    descHi: 'अंधेरे चौराहों, मंदिर मार्ग और महिला सुरक्षा बिंदुओं पर 40W लिथियम-फॉस्फेट सोलर स्ट्रीट लैंप की स्थापना।',
    sanctionedBudget: 380000,
    spentBudget: 285000,
    progress: 75,
    contractorEn: 'SuryaUrja Rural Solutions',
    contractorHi: 'सूर्यऊर्जा रूरल सॉल्यूशंस',
    startDate: '15 Sep 2026',
    etaDate: '05 Dec 2026',
    milestones: [
      { en: 'Pole Foundation Digging', hi: 'खंभे की नींव खुदाई', done: true },
      { en: 'Galvanized Pole Erection', hi: 'गैल्वनाइज्ड खंभे लगाना', done: true },
      { en: 'Solar Panel & Battery Mounting', hi: 'सोलर पैनल व बैटरी फिटिंग', done: true },
      { en: 'Ward-level Lux Testing', hi: 'वार्ड-स्तरीय रोशनी परीक्षण', done: false }
    ]
  },
  {
    id: 'proj-3',
    code: 'GP-PIP-2026-03',
    ward: 'Ward 5',
    category: 'Sanitation',
    categoryHi: 'स्वच्छता',
    titleEn: 'School Sanitation Block & Pink Toilet Complex',
    titleHi: 'विद्यालय स्वच्छता ब्लॉक एवं पिंक शौचालय परिसर',
    descEn: 'Separate boys and girls eco-friendly sanitation units at Govt High School with overhead water tank and handwash station.',
    descHi: 'राजकीय उच्च विद्यालय में ओवरहेड पानी की टंकी और हैंडवाश स्टेशन के साथ बालक एवं बालिकाओं के लिए अलग स्वच्छता इकाई।',
    sanctionedBudget: 260000,
    spentBudget: 245000,
    progress: 94,
    contractorEn: 'Swachh Shakti Self Help Group',
    contractorHi: 'स्वच्छ शक्ति स्वयं सहायता समूह',
    startDate: '10 Aug 2026',
    etaDate: '20 Nov 2026',
    milestones: [
      { en: 'Twin Leach Pit Construction', hi: 'दोहरा सोख्ता गड्ढा निर्माण', done: true },
      { en: 'Brick Superstructure & Roof', hi: 'ईंट चिनाई और छत ढलाई', done: true },
      { en: 'Plumbing & Ceramic Tiling', hi: 'प्लंबिंग और टाइल्स कार्य', done: true },
      { en: 'Final Painting & Handover', hi: 'रंगाई-पुताई और हस्तांतरण', done: true }
    ]
  },
  {
    id: 'proj-4',
    code: 'GP-PIP-2026-04',
    ward: 'Ward 1 & 6',
    category: 'Drinking Water',
    categoryHi: 'पेयजल',
    titleEn: 'Community Borewell Recharge & Solar Jal Minar',
    titleHi: 'सामुदायिक बोरवेल रिचार्ज एवं सोलर जल मीनार',
    descEn: '10,000-liter overhead solar-pumped water tank with rainwater harvesting recharge pit serving 140 households.',
    descHi: '140 परिवारों की पेयजल आपूर्ति हेतु वर्षा जल संचयन रिचार्ज पिट के साथ 10,000 लीटर क्षमता की सोलर जल मीनार।',
    sanctionedBudget: 420000,
    spentBudget: 357000,
    progress: 85,
    contractorEn: 'Jal Dhara Hydro Works',
    contractorHi: 'जल धारा हाइड्रो वर्क्स',
    startDate: '05 Sep 2026',
    etaDate: '28 Nov 2026',
    milestones: [
      { en: 'Hydro-geological Drilling', hi: 'भू-जल बोरिंग खुदाई', done: true },
      { en: 'Submersible Solar Pump Setup', hi: 'सबमर्सिबल सोलर पंप स्थापना', done: true },
      { en: 'Staging Tower & Tank Fitting', hi: 'टावर और टंकी फिटिंग', done: true },
      { en: 'Tap Standpost Connection', hi: 'सार्वजनिक नल स्टैंडपोस्ट कनेक्शन', done: false }
    ]
  }
];

const INITIAL_WARDS = [
  { wardNo: 1, nameEn: 'Shri Rameshwar Yadav', nameHi: 'श्री रामेश्वर यादव', roleEn: 'Water & Irrigation', roleHi: 'जल एवं सिंचाई समिति', areaEn: 'Purab Tola & Shiv Mandir', areaHi: 'पूरब टोला एवं शिव मंदिर', phone: '+91 94150 22101' },
  { wardNo: 2, nameEn: 'Smt. Meena Kumari', nameHi: 'श्रीमती मीना कुमारी', roleEn: 'Health & Anganwadi', roleHi: 'स्वास्थ्य एवं आंगनवाड़ी', areaEn: 'Bazaar Chowk & PHC Road', areaHi: 'बाजार चौक एवं पीएचसी रोड', phone: '+91 94150 22102' },
  { wardNo: 3, nameEn: 'Shri Brijesh Patel', nameHi: 'श्री बृजेश पटेल', roleEn: 'Streetlight & Solar', roleHi: 'स्ट्रीटलाइट एवं सौर ऊर्जा', areaEn: 'Patel Nagar & Talab Par', areaHi: 'पटेल नगर एवं तालाब पार', phone: '+91 94150 22103' },
  { wardNo: 4, nameEn: 'Smt. Sunita Devi', nameHi: 'श्रीमती सुनीता देवी', roleEn: 'Sanitation & Drains', roleHi: 'स्वच्छता एवं नाली निर्माण', areaEn: 'Kumhar Tola & Canal', areaHi: 'कुम्हार टोला एवं नहर', phone: '+91 94150 22104' },
  { wardNo: 5, nameEn: 'Shri Mahendra Paswan', nameHi: 'श्री महेंद्र पासवान', roleEn: 'School & Youth', roleHi: 'विद्यालय एवं युवा कल्याण', areaEn: 'Ambedkar Nagar', areaHi: 'अंबेडकर नगर', phone: '+91 94150 22105' },
  { wardNo: 6, nameEn: 'Smt. Kavita Verma', nameHi: 'श्रीमती कविता वर्मा', roleEn: 'SHG & Livelihoods', roleHi: 'स्वयं सहायता समूह', areaEn: 'Naya Purwa', areaHi: 'नया पुरवा', phone: '+91 94150 22106' },
  { wardNo: 7, nameEn: 'Shri Abdul Kareem', nameHi: 'श्री अब्दुल करीम', roleEn: 'Roads & Housing', roleHi: 'सड़क एवं ग्रामीण आवास', areaEn: 'Weaver Colony', areaHi: 'बुनकर कॉलोनी', phone: '+91 94150 22107' },
  { wardNo: 8, nameEn: 'Smt. Phoolmati Gond', nameHi: 'श्रीमती फूलमती गोंड', roleEn: 'Forest Rights & Ponds', roleHi: 'वन अधिकार एवं सरोवर', areaEn: 'Dakshin Pura', areaHi: 'दक्षिण पुरा', phone: '+91 94150 22108' }
];

const INITIAL_GRIEVANCES = [
  {
    id: 'GG-2026-801',
    category: 'Streetlights',
    categoryHi: 'स्ट्रीटलाइट',
    ward: 3,
    citizenNameEn: 'Harishchandra Maurya',
    citizenNameHi: 'हरिश्चंद्र मौर्य',
    landmarkEn: 'Near Banyan Tree, Talab Par Pole #14',
    landmarkHi: 'बरगद के पेड़ के पास, तालाब पार खंभा #14',
    descEn: 'Solar street lamp flickers and turns off within 20 minutes after sunset, leaving pathway dark.',
    descHi: 'सोलर स्ट्रीट लैंप सूर्यास्त के 20 मिनट बाद बंद हो जाता है, जिससे मार्ग पर अंधेरा रहता है।',
    status: 'Assigned to Ward Member',
    assignedWardMember: 3,
    date: '12 Nov 2026',
    slaHoursLeft: 2, // Overdue/Critical
    hasPhoto: true,
    photoType: 'streetlight'
  },
  {
    id: 'GG-2026-802',
    category: 'Drinking Water',
    categoryHi: 'पेयजल',
    ward: 1,
    citizenNameEn: 'Kamla Devi',
    citizenNameHi: 'कमला देवी',
    landmarkEn: 'Opposite Shiv Mandir Handpump #2',
    landmarkHi: 'शिव मंदिर के सामने हैंडपंप #2',
    descEn: 'Handpump chain coupling is loose and leaking water near base platform.',
    descHi: 'हैंडपंप की चेन ढीली हो गई है और चबूतरे के पास पानी रिस रहा है।',
    status: 'In Progress',
    assignedWardMember: 1,
    date: '11 Nov 2026',
    slaHoursLeft: 12,
    hasPhoto: true,
    photoType: 'water'
  },
  {
    id: 'GG-2026-803',
    category: 'Sanitation',
    categoryHi: 'स्वच्छता',
    ward: 4,
    citizenNameEn: 'Rajendra Prajapati',
    citizenNameHi: 'राजेंद्र प्रजापति',
    landmarkEn: 'Kumhar Tola Lane 2 Culvert',
    landmarkHi: 'कुम्हार टोला गली 2 पुलिया',
    descEn: 'Plastic waste and leaves have blocked drainage culvert mouth.',
    descHi: 'प्लास्टिक कचरे और पत्तियों से नाली की पुलिया जाम हो गई है।',
    status: 'Submitted',
    assignedWardMember: 4,
    date: '13 Nov 2026',
    slaHoursLeft: 36,
    hasPhoto: true,
    photoType: 'sanitation'
  },
  {
    id: 'GG-2026-804',
    category: 'Roads',
    categoryHi: 'सड़क',
    ward: 7,
    citizenNameEn: 'Anwar Ali',
    citizenNameHi: 'अनवर अली',
    landmarkEn: 'Approach Turn near Weaver Shed',
    landmarkHi: 'बुनकर शेड के पास मोड़',
    descEn: 'Tractor trolley movement created a 3-foot pothole on road edge.',
    descHi: 'ट्रैक्टर ट्रॉली के आवागमन से सड़क के किनारे 3 फुट का गड्ढा हो गया है।',
    status: 'Submitted',
    assignedWardMember: 7,
    date: '13 Nov 2026',
    slaHoursLeft: 40,
    hasPhoto: true,
    photoType: 'road'
  },
  {
    id: 'GG-2026-805',
    category: 'Drinking Water',
    categoryHi: 'पेयजल',
    ward: 6,
    citizenNameEn: 'Geeta Verma',
    citizenNameHi: 'गीता वर्मा',
    landmarkEn: 'Naya Purwa Standpost #5',
    landmarkHi: 'नया पुरवा स्टैंडपोस्ट #5',
    descEn: 'Brass tap head was broken; water flows continuously.',
    descHi: 'पीतल की टोटी टूट गई है; पानी लगातार बहता रहता है।',
    status: 'Resolved',
    assignedWardMember: 6,
    date: '08 Nov 2026',
    slaHoursLeft: 0,
    hasPhoto: false,
    photoType: 'water'
  }
];

const VILLAGE_ASSETS = [
  { id: 'asset-1', type: 'Governance', typeHi: 'प्रशासन', ward: 'Ward 2 (Central)', x: 48, y: 44, nameEn: 'Pipri Panchayat Bhawan & CSC Center', nameHi: 'पिपरी पंचायत भवन एवं कॉमन सर्विस सेंटर', statusEn: 'Open Today • Secretary & Sarpanch Present', statusHi: 'आज खुला है • सचिव एवं सरपंच उपस्थित', condition: 'Excellent' },
  { id: 'asset-2', type: 'Health', typeHi: 'स्वास्थ्य', ward: 'Ward 2', x: 26, y: 32, nameEn: 'Primary Health Center (PHC) & Arogya Mandir', nameHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) एवं आरोग्य मंदिर', statusEn: 'ANM Nurse Active • 42 Essential Drugs Available', statusHi: 'एएनएम नर्स सक्रिय • 42 आवश्यक दवाएं उपलब्ध', condition: 'Good' },
  { id: 'asset-3', type: 'Education', typeHi: 'शिक्षा', ward: 'Ward 5', x: 72, y: 28, nameEn: 'Govt High School Pipri (Class 1-10)', nameHi: 'राजकीय उच्च विद्यालय पिपरी (कक्षा 1-10)', statusEn: 'Smart Classroom Active • Sanitation Block 94% Done', statusHi: 'स्मार्ट क्लासरूम सक्रिय • स्वच्छता ब्लॉक 94% पूर्ण', condition: 'Good' },
  { id: 'asset-4', type: 'Water', typeHi: 'पेयजल', ward: 'Ward 1 & 6', x: 68, y: 66, nameEn: 'Solar Jal Minar & Community Borewell', nameHi: 'सोलर जल मीनार एवं सामुदायिक बोरवेल', statusEn: 'TDS: 145 ppm (Safe) • Supply Active', statusHi: 'TDS: 145 ppm (सुरक्षित) • जलापूर्ति सक्रिय', condition: 'Excellent' }
];

// ==========================================
// COMPREHENSIVE BILINGUAL TRANSLATION MAP
// ==========================================

const UI_TEXT = {
  en: {
    appName: 'GramaGlow',
    appSubtitle: 'DigitalPanchayat • Pipri Gram Panchayat',
    districtInfo: 'Block: Mohanlalganj • Dist: Lucknow • PIN: 226301',
    citizenView: 'Citizen View',
    adminView: 'Panchayat Admin',
    langToggle: 'हिंदी में देखें',
    sarpanchStatus: 'Sarpanch Present at Panchayat Bhawan Today',
    navOverview: 'Village & Wards',
    navNotices: 'Notice Board',
    navProjects: 'Budget & Works',
    navGrievances: 'Lodge Grievance',
    navTrack: 'Ward Status Board',
    navAdmin: 'Sarpanch Desk',
    popLabel: 'Village Population',
    popValue: '3,420',
    wardsLabel: 'Total Wards',
    wardsValue: '8 Wards',
    projectsLabel: 'Active Works',
    resolutionLabel: 'Grievance Resolved',
    sarpanchTitle: 'Elected Sarpanch (Gram Pradhan)',
    sarpanchName: 'Smt. Savitri Devi',
    sarpanchHours: 'Office Hours: Mon–Sat, 10:00 AM – 2:00 PM',
    secretaryName: 'Gram Sachiv: Shri Vinod Sharma (Present)',
    callNow: 'Call Office',
    wardRosterTitle: '8-Ward Elected Members Roster',
    wardRosterSub: 'Tap any Ward Member to contact directly or inspect ward responsibilities',
    geoMapTitle: 'Interactive Village Assets Geo-Inventory',
    geoMapSub: 'Click any pin on the Pipri Village Schematic Map to inspect public infrastructure status',
    noticeFeedTitle: 'Official Village Notice & Announcement Feed',
    noticeFeedSub: 'Real-time broadcasts for Gram Sabha, subsidies, vaccination, and school notices',
    listenHindi: 'Listen Aloud (Hindi)',
    stopAudio: 'Stop Audio',
    budgetTrackerTitle: 'Village Development Project & Budget Tracker',
    budgetTrackerSub: '100% transparent itemized expenditure tracker for Pipri Gram Panchayat funds',
    sanctionedLabel: 'Sanctioned Budget',
    spentLabel: 'Spent Amount',
    progressLabel: 'Physical Progress',
    contractorLabel: 'Executing Agency',
    lodgeGrievanceTitle: 'Citizen Grievance & Service Request Portal',
    lodgeGrievanceSub: 'Select a category below to report an issue. Receive an instant cryptographic token.',
    selectCategory: '1. Select Problem Category',
    catWater: 'Drinking Water',
    catSanitation: 'Sanitation & Drains',
    catStreetlight: 'Streetlights',
    catRoads: 'Roads & Potholes',
    yourName: 'Your Full Name',
    selectWard: 'Select Ward Number',
    landmarkLabel: 'Landmark / Pole or Handpump Number',
    problemDesc: 'Brief Description of Problem',
    attachPhoto: 'Attach Evidence Photo (Camera / File Upload)',
    submitComplaint: 'Submit Grievance & Generate Token',
    statusBoardTitle: 'Grievance Resolution & Ward Status Board',
    statusBoardSub: 'Public tracking of all citizen complaints across Submitted, Assigned, In Progress & Resolved stages',
    filterAll: 'All Statuses',
    filterSubmitted: 'Submitted',
    filterAssigned: 'Assigned to Ward Member',
    filterInProgress: 'In Progress',
    filterResolved: 'Resolved',
    adminBannerTitle: 'Sarpanch Administrative Command Center',
    adminBannerSub: 'Assign citizen grievances to Ward Members (#1–#8), update statuses, and adjust project budget milestones.',
    resetDemo: 'Reset Demo Data',
    quickDemoGuide: 'Judge Walkthrough Guide',
    postNoticeTitle: 'Broadcast New Village Announcement',
    overdue: 'Overdue',
    hoursLeft: 'h left',
    copyToken: 'Copy Token',
    shareWhatsApp: 'Share on WhatsApp',
    tokenCopied: 'Tracking token copied to clipboard!',
    emptyBoard: 'No grievances found matching your filter criteria.',
    assetFilters: { All: 'All Assets (4)', Governance: 'Governance', Health: 'Health', Education: 'Education', Water: 'Water' }
  },
  hi: {
    appName: 'ग्रामग्लो (GramaGlow)',
    appSubtitle: 'डिजिटल पंचायत • पिपरी ग्राम पंचायत',
    districtInfo: 'ब्लॉक: मोहनलालगंज • जिला: लखनऊ • पिन: 226301',
    citizenView: 'नागरिक दृश्य',
    adminView: 'पंचायत प्रशासन (सरपंच)',
    langToggle: 'Switch to English',
    sarpanchStatus: 'सरपंच आज पंचायत भवन में उपस्थित हैं',
    navOverview: 'ग्राम प्रोफाइल व वार्ड',
    navNotices: 'सूचना पट्ट (ऑडियो)',
    navProjects: 'विकास कार्य व बजट',
    navGrievances: 'शिकायत दर्ज करें',
    navTrack: 'वार्ड समाधान बोर्ड',
    navAdmin: 'सरपंच डैशबोर्ड',
    popLabel: 'कुल जनसंख्या',
    popValue: '3,420',
    wardsLabel: 'कुल वार्ड',
    wardsValue: '8 वार्ड',
    projectsLabel: 'सक्रिय विकास कार्य',
    resolutionLabel: 'शिकायत निस्तारण दर',
    sarpanchTitle: 'निर्वाचित सरपंच (ग्राम प्रधान)',
    sarpanchName: 'श्रीमती सावित्री देवी',
    sarpanchHours: 'कार्यालय समय: सोम–शनि, सुबह 10:00 – दोपहर 2:00 बजे',
    secretaryName: 'ग्राम पंचायत सचिव: श्री विनोद शर्मा (उपस्थित)',
    callNow: 'संपर्क करें',
    wardRosterTitle: '8-वार्ड निर्वाचित पंच/सदस्य सूची',
    wardRosterSub: 'अपने वार्ड सदस्य से सीधे बात करने या कार्यक्षेत्र देखने के लिए कार्ड चुनें',
    geoMapTitle: 'ग्राम परिसंपत्ति जियो-इन्वेंटरी मानचित्र',
    geoMapSub: 'सार्वजनिक सुविधाओं की लाइव स्थिति देखने के लिए मानचित्र के पिन पर टैप करें',
    noticeFeedTitle: 'आधिकारिक ग्राम सूचना एवं घोषणा फीड',
    noticeFeedSub: 'ग्राम सभा, कृषि सब्सिडी, टीकाकरण और स्कूल सूचनाओं का सीधा प्रसारण',
    listenHindi: 'आवाज़ में सुनें (हिंदी)',
    stopAudio: 'आवाज़ बंद करें',
    budgetTrackerTitle: 'ग्राम विकास परियोजना एवं बजट ट्रैकर',
    budgetTrackerSub: 'पिपरी ग्राम पंचायत के स्वीकृत बजट और खर्च का 100% पारदर्शी विवरण',
    sanctionedLabel: 'स्वीकृत बजट',
    spentLabel: 'कुल खर्च राशि',
    progressLabel: 'कार्य प्रगति',
    contractorLabel: 'कार्यदायी संस्था',
    lodgeGrievanceTitle: 'नागरिक शिकायत एवं सेवा अनुरोध पोर्टल',
    lodgeGrievanceSub: 'समस्या दर्ज करने के लिए श्रेणी चुनें और तुरंत ट्रैकिंग टोकन प्राप्त करें।',
    selectCategory: '1. समस्या की श्रेणी चुनें',
    catWater: 'पेयजल / हैंडपंप',
    catSanitation: 'स्वच्छता व नाली',
    catStreetlight: 'स्ट्रीटलाइट / सोलर',
    catRoads: 'सड़क व खड़ंजा',
    yourName: 'नागरिक का पूरा नाम',
    selectWard: 'वार्ड संख्या चुनें',
    landmarkLabel: 'पहचान चिन्ह / खंभा या हैंडपंप नंबर',
    problemDesc: 'समस्या का संक्षिप्त विवरण',
    attachPhoto: 'फोटो प्रमाण जोड़ें (कैमरा / गैलरी)',
    submitComplaint: 'शिकायत दर्ज करें और टोकन पाएं',
    statusBoardTitle: 'सार्वजनिक शिकायत निस्तारण एवं वार्ड स्थिति बोर्ड',
    statusBoardSub: 'दर्ज, वार्ड सदस्य को आवंटित, कार्य प्रगति पर और निस्तारित शिकायतों का पारदर्शी बोर्ड',
    filterAll: 'सभी शिकायतें',
    filterSubmitted: 'दर्ज (Submitted)',
    filterAssigned: 'वार्ड सदस्य को आवंटित',
    filterInProgress: 'कार्य प्रगति पर',
    filterResolved: 'निस्तारित (Resolved)',
    adminBannerTitle: 'सरपंच प्रशासनिक नियंत्रण कक्ष',
    adminBannerSub: 'नागरिकों की शिकायतों को वार्ड सदस्य (#1–#8) को सौंपें, स्थिति बदलें और विकास बजट अपडेट करें।',
    resetDemo: 'डेमो डेटा रीसेट करें',
    quickDemoGuide: 'न्यायाधीश वॉकथ्रू गाइड',
    postNoticeTitle: 'नई ग्राम सूचना प्रसारित करें',
    overdue: 'विलंबित / ओवरड्यू',
    hoursLeft: 'घंटे शेष',
    copyToken: 'टोकन कॉपी करें',
    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
    tokenCopied: 'ट्रैकिंग टोकन क्लिपबोर्ड पर कॉपी हो गया!',
    emptyBoard: 'आपके फ़िल्टर के अनुसार कोई शिकायत नहीं मिली।',
    assetFilters: { All: 'सभी सुविधाएं (4)', Governance: 'प्रशासन', Health: 'स्वास्थ्य', Education: 'शिक्षा', Water: 'पेयजल' }
  }
};

// Helper for Indian Currency Formatting
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatLakhs = (amount, lang) => {
  const lakhs = (amount / 100000).toFixed(2);
  return lang === 'hi' ? `₹${lakhs} लाख` : `Rs ${lakhs} Lakhs`;
};

export default function App() {
  // ==========================================
  // STATE & LOCAL STORAGE PERSISTENCE
  // ==========================================
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [role, setRole] = useState('citizen'); // 'citizen' | 'admin'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'notices' | 'projects' | 'grievance' | 'board' | 'admin'

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_announcements_v2');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_projects_v2');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [grievances, setGrievances] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_grievances_v2');
      return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
    } catch {
      return INITIAL_GRIEVANCES;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gg_announcements_v2', JSON.stringify(announcements));
      localStorage.setItem('gg_projects_v2', JSON.stringify(projects));
      localStorage.setItem('gg_grievances_v2', JSON.stringify(grievances));
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [announcements, projects, grievances]);

  // Audio Notice Broadcaster State
  const [speakingId, setSpeakingId] = useState(null);

  // Interactive Geo-Asset Map State
  const [selectedAsset, setSelectedAsset] = useState(VILLAGE_ASSETS[0]);
  const [assetFilter, setAssetFilter] = useState('All');

  // Citizen Grievance Form State
  const [formCategory, setFormCategory] = useState('Streetlights');
  const [formName, setFormName] = useState('');
  const [formWard, setFormWard] = useState(3);
  const [formLandmark, setFormLandmark] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submittedTokenModal, setSubmittedTokenModal] = useState(null);

  // Public Grievance Board Filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');
  const [searchToken, setSearchToken] = useState('');

  // Admin New Notice State
  const [adminNoticeTitle, setAdminNoticeTitle] = useState('');
  const [adminNoticeDesc, setAdminNoticeDesc] = useState('');
  const [adminNoticeCategory, setAdminNoticeCategory] = useState('Gram Sabha');

  // Toast Notification Banner (with cleared timeout ref)
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Modals
  const [showDemoModal, setShowDemoModal] = useState(false);

  const t = UI_TEXT[lang];

  const triggerToast = (msgEn, msgHi) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(lang === 'hi' ? msgHi : msgEn);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ESC key listener for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowDemoModal(false);
        setSubmittedTokenModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch role handler
  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setActiveTab('admin');
      triggerToast(
        'Switched to Sarpanch Admin Dashboard. You can now manage tickets & budgets.',
        'सरपंच प्रशासन डैशबोर्ड सक्रिय। अब आप शिकायतें और बजट प्रबंधित कर सकते हैं।'
      );
    } else if (activeTab === 'admin') {
      setActiveTab('overview');
    }
  };

  // ==========================================
  // WEB SPEECH API AUDIO BROADCASTER
  // ==========================================
  const handleSpeakAnnouncement = (ann) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      triggerToast('Audio playback invoked.', 'ऑडियो प्रसारण सक्रिय किया गया।');
      return;
    }

    if (speakingId === ann.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead =
      lang === 'hi'
        ? `पिपरी ग्राम पंचायत की आवश्यक सूचना। ${ann.titleHi}। ${ann.descHi}। जारीकर्ता: ${ann.authorityHi}`
        : `Official announcement from Pipri Gram Panchayat. ${ann.titleEn}. ${ann.descEn}. Issued by ${ann.authorityEn}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(ann.id);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==========================================
  // COMPUTED METRICS
  // ==========================================
  const stats = useMemo(() => {
    const totalSanctioned = projects.reduce((acc, p) => acc + p.sanctionedBudget, 0);
    const totalSpent = projects.reduce((acc, p) => acc + p.spentBudget, 0);
    const avgProgress = Math.round(
      projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
    );
    const resolvedCount = grievances.filter((g) => g.status === 'Resolved').length;
    const resolutionRate = Math.round((resolvedCount / grievances.length) * 100);

    return {
      totalSanctioned,
      totalSpent,
      avgProgress,
      resolvedCount,
      totalGrievances: grievances.length,
      resolutionRate
    };
  }, [projects, grievances]);

  // ==========================================
  // INTERACTION HANDLERS
  // ==========================================
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrefillBrokenLampDemo = () => {
    setFormCategory('Streetlights');
    setFormName(lang === 'hi' ? 'रामकिशन वर्मा' : 'Ramkishan Verma');
    setFormWard(3);
    setFormLandmark(
      lang === 'hi'
        ? 'पंचायत चौराहा, सोलर खंभा नंबर #09 के पास'
        : 'Near Panchayat Chowk, Solar Pole #09'
    );
    setFormDesc(
      lang === 'hi'
        ? 'पिछली रात से स्ट्रीट लैंप का बल्ब खराब हो गया है और चौराहे पर अंधेरा है।'
        : 'Broken street lamp at Pole #09 since last night; intersection is dark.'
    );
    triggerToast(
      'Demo sample filled: Broken Street Lamp in Ward 3',
      'डेमो उदाहरण भरा गया: वार्ड 3 में खराब स्ट्रीट लैंप'
    );
  };

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    const tokenNum = grievances.length + 801;
    const token = `GG-2026-${tokenNum}`;
    const citizenName = formName.trim() || (lang === 'hi' ? 'ग्रामीण नागरिक' : 'Village Citizen');
    const landmark =
      formLandmark.trim() ||
      (lang === 'hi' ? `वार्ड ${formWard} मुख्य मार्ग` : `Ward ${formWard} Main Road`);
    const description =
      formDesc.trim() ||
      (lang === 'hi'
        ? `${formCategory} से संबंधित मरम्मत अनुरोध।`
        : `Service maintenance request regarding ${formCategory}.`);

    const newTicket = {
      id: token,
      category: formCategory,
      categoryHi: formCategory === 'Streetlights' ? 'स्ट्रीटलाइट' : formCategory === 'Drinking Water' ? 'पेयजल' : formCategory === 'Sanitation' ? 'स्वच्छता' : 'सड़क',
      ward: Number(formWard),
      citizenNameEn: citizenName,
      citizenNameHi: citizenName,
      landmarkEn: landmark,
      landmarkHi: landmark,
      descEn: description,
      descHi: description,
      status: 'Submitted',
      assignedWardMember: Number(formWard),
      date: '14 Nov 2026',
      slaHoursLeft: 48,
      hasPhoto: Boolean(photoPreview),
      photoData: photoPreview
    };

    setGrievances([newTicket, ...grievances]);
    setSubmittedTokenModal(newTicket);
    setFormName('');
    setFormLandmark('');
    setFormDesc('');
    setPhotoPreview(null);
  };

  // Admin: Update Grievance Status or Assigned Ward Member
  const handleAdminUpdateGrievance = (id, updates) => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
    triggerToast(
      `Ticket #${id} updated successfully.`,
      `शिकायत #${id} सफलतापूर्वक अपडेट कर दी गई है।`
    );
  };

  // Admin: Update Project Progress & Spent Budget separately
  const handleAdminUpdateProject = (id, field, value) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, [field]: Number(value) };
        if (field === 'progress') {
          const progressNum = Number(value);
          updated.milestones = p.milestones.map((m, idx) => ({
            ...m,
            done: progressNum >= (idx + 1) * 25
          }));
        }
        return updated;
      })
    );
  };

  // Admin: Post New Official Announcement
  const handleAdminPostAnnouncement = (e) => {
    e.preventDefault();
    if (!adminNoticeTitle.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      date: '14 Nov 2026 • Live Broadcast',
      category: adminNoticeCategory,
      categoryHi: adminNoticeCategory === 'Gram Sabha' ? 'ग्राम सभा' : 'घोषणा',
      urgent: true,
      authorityEn: 'Smt. Savitri Devi (Sarpanch)',
      authorityHi: 'श्रीमती सावित्री देवी (सरपंच)',
      titleEn: adminNoticeTitle.trim(),
      titleHi: adminNoticeTitle.trim(),
      descEn: adminNoticeDesc.trim() || 'Official announcement broadcasted via DigitalPanchayat portal.',
      descHi: adminNoticeDesc.trim() || 'डिजिटल पंचायत पोर्टल द्वारा जारी आधिकारिक ग्राम सूचना।'
    };
    setAnnouncements([newAnn, ...announcements]);
    setAdminNoticeTitle('');
    setAdminNoticeDesc('');
    triggerToast(
      'New village announcement published!',
      'नई ग्राम सूचना प्रकाशित कर दी गई है!'
    );
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    localStorage.removeItem('gg_announcements_v2');
    localStorage.removeItem('gg_projects_v2');
    localStorage.removeItem('gg_grievances_v2');
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setProjects(INITIAL_PROJECTS);
    setGrievances(INITIAL_GRIEVANCES);
    triggerToast('Demo dataset restored.', 'डेमो डेटा रीसेट कर दिया गया है।');
  };

  // Filtered & SLA-Sorted Grievances
  const filteredGrievances = useMemo(() => {
    const list = grievances.filter((g) => {
      const matchesStatus = statusFilter === 'All' || g.status === statusFilter;
      const matchesWard = wardFilter === 'All' || g.ward === Number(wardFilter);
      const matchesSearch =
        !searchToken.trim() ||
        g.id.toLowerCase().includes(searchToken.toLowerCase()) ||
        g.citizenNameEn.toLowerCase().includes(searchToken.toLowerCase()) ||
        g.landmarkEn.toLowerCase().includes(searchToken.toLowerCase());
      return matchesStatus && matchesWard && matchesSearch;
    });

    // Sort overdue first (lowest slaHoursLeft for non-resolved)
    return list.sort((a, b) => {
      if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
      if (b.status === 'Resolved' && a.status !== 'Resolved') return -1;
      return a.slaHoursLeft - b.slaHoursLeft;
    });
  }, [grievances, statusFilter, wardFilter, searchToken]);

  // Status badge styling helper with Apple/Samsung styling
  const renderStatusBadge = (status) => {
    if (status === 'Resolved') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {lang === 'hi' ? 'निस्तारित' : 'Resolved'}
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          {lang === 'hi' ? 'कार्य प्रगति पर' : 'In Progress'}
        </span>
      );
    }
    if (status === 'Assigned to Ward Member') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-700 border border-blue-500/20">
          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          {lang === 'hi' ? 'वार्ड सदस्य को आवंटित' : 'Assigned'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 border border-rose-500/20">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        {lang === 'hi' ? 'दर्ज' : 'Submitted'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 md:pb-12 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ==========================================
          TOP NAVIGATION BAR (Apple / Samsung Inspired Clean Header)
      ========================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center shadow-md">
                <Landmark className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                    {t.appName}
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    Pipri e-Panchayat
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{t.appSubtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              {[
                { id: 'overview', label: t.navOverview, icon: Landmark },
                { id: 'notices', label: t.navNotices, icon: Megaphone },
                { id: 'projects', label: t.navProjects, icon: HardHat },
                { id: 'grievance', label: t.navGrievances, icon: MessageSquareWarning },
                { id: 'board', label: t.navTrack, icon: CheckCircle2 },
                ...(role === 'admin' ? [{ id: 'admin', label: t.navAdmin, icon: Sliders }] : [])
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-indigo-600" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Language & Role Switcher */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1.5"
                aria-label="Toggle language"
              >
                <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                  अ/A
                </span>
                <span>{lang === 'en' ? 'हिंदी' : 'ENG'}</span>
              </button>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => handleRoleToggle('citizen')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    role === 'citizen'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.citizenView}
                </button>
                <button
                  onClick={() => handleRoleToggle('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    role === 'admin'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.adminView}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 transition-all">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* ==========================================
          HERO BANNER & LIVE METRICS
      ========================================== */}
      <section className="bg-gradient-to-b from-white to-[#F8FAFC] border-b border-slate-200/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-700">{t.sarpanchStatus}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {lang === 'hi' ? 'पिपरी ग्राम पंचायत डिजिटल पोर्टल' : 'Pipri Gram Panchayat Portal'}
              </h2>
              <p className={`text-sm sm:text-base text-slate-600 mt-1 max-w-2xl ${lang === 'hi' ? 'leading-relaxed' : ''}`}>
                {lang === 'hi'
                  ? 'पारदर्शी शासन, त्वरित शिकायत निवारण और ग्राम विकास कार्यों की लाइव मॉनिटरिंग।'
                  : 'Transparent governance, responsive grievance redressal, and live community development tracking.'}
              </p>
            </div>

            {/* Quick Action / Walkthrough Help Button */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t.quickDemoGuide}</span>
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.popLabel}</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{t.popValue}</p>
                <p className="text-xs text-slate-600 font-medium">612 Households • 8 Wards</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('projects')}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-xs flex items-center gap-4 cursor-pointer transition"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.projectsLabel}</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{projects.length} Active</p>
                <p className="text-xs text-emerald-700 font-medium">{formatLakhs(stats.totalSpent, lang)} spent</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('board')}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-xs flex items-center gap-4 cursor-pointer transition"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.resolutionLabel}</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.resolutionRate}%</p>
                <p className="text-xs text-amber-700 font-medium">{stats.resolvedCount} resolved</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('grievance')}
              className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-4 sm:p-5 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition"
            >
              <div>
                <p className="text-xs font-medium text-indigo-200">Citizen Service</p>
                <p className="text-base sm:text-lg font-bold mt-0.5">
                  {lang === 'hi' ? '+ शिकायत दर्ज करें' : '+ Lodge Grievance'}
                </p>
                <p className="text-xs text-indigo-100 mt-1">Instant Token</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN APPLICATION VIEWS
      ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ==========================================
            TAB 1: OVERVIEW & 4 ICON SHORTCUTS
        ========================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Icon Shortcuts (Per Apple/Samsung minimalist ux requirement) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab('grievance')}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <MessageSquareWarning className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lang === 'hi' ? 'शिकायत दर्ज करें' : 'Report Problem'}</h3>
                  <p className="text-xs text-slate-500 mt-1">{lang === 'hi' ? 'हैंडपंप, नाली, लाइट' : 'Water, Drains, Lights'}</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lang === 'hi' ? 'सूचनाएं सुनें' : 'Listen Notices'}</h3>
                  <p className="text-xs text-slate-500 mt-1">{lang === 'hi' ? 'ग्राम सभा घोषणाएं' : 'Gram Sabha Audio'}</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lang === 'hi' ? 'विकास बजट' : 'Village Budget'}</h3>
                  <p className="text-xs text-slate-500 mt-1">{lang === 'hi' ? '15वां वित्त आयोग' : '15th Finance Ledger'}</p>
                </div>
              </button>

              <a
                href="tel:+919415022100"
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lang === 'hi' ? 'सरपंच से संपर्क' : 'Call Sarpanch'}</h3>
                  <p className="text-xs text-slate-500 mt-1">+91 94150 22100</p>
                </div>
              </a>
            </div>

            {/* Sarpanch Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900 text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                    SD
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      {t.sarpanchTitle}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{t.sarpanchName}</h3>
                    <p className={`text-sm text-slate-600 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.sarpanchHours}</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">{t.districtInfo}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+919415022100"
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xs transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-indigo-300" />
                    <span>{t.callNow}</span>
                  </a>
                </div>
              </div>

              {/* Ward Members Roster */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900">{t.wardRosterTitle}</h4>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">8 Wards Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {INITIAL_WARDS.map((w) => (
                    <div key={w.wardNo} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs">
                            {lang === 'hi' ? `वार्ड #${w.wardNo}` : `Ward #${w.wardNo}`}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-base">{lang === 'hi' ? w.nameHi : w.nameEn}</h5>
                        <p className="text-xs font-medium text-indigo-600 mt-0.5">{lang === 'hi' ? w.roleHi : w.roleEn}</p>
                        <p className="text-xs text-slate-500 mt-1">{lang === 'hi' ? w.areaHi : w.areaEn}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                        <a href={`tel:${w.phone}`} className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{w.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Geo-Inventory Asset Map */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.geoMapTitle}</h3>
                  <p className={`text-sm text-slate-600 mt-0.5 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.geoMapSub}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(t.assetFilters).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setAssetFilter(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        assetFilter === key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 relative h-80 sm:h-96 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
                  <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
                    <rect width="800" height="450" fill="#f1f5f9" />
                    <path d="M0 80 Q250 120 450 70 T800 95 L800 0 L0 0 Z" fill="#e2e8f0" />
                    <path d="M0 360 Q320 310 560 390 T800 350 L800 450 L0 450 Z" fill="#e2e8f0" />
                    <ellipse cx="640" cy="340" rx="95" ry="48" fill="#bae6fd" stroke="#38bdf8" strokeWidth="3" />
                    <path d="M40 230 Q380 200 760 220" stroke="#cbd5e1" strokeWidth="20" fill="none" strokeLinecap="round" />
                  </svg>

                  {VILLAGE_ASSETS.filter((a) => assetFilter === 'All' || a.type === assetFilter).map((asset) => {
                    const isSelected = selectedAsset?.id === asset.id;
                    return (
                      <button
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer ${
                          isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                        }`}
                      >
                        <div className={`px-3 py-1.5 rounded-xl font-semibold text-xs shadow-md border flex items-center gap-1.5 ${
                          isSelected ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-500/20' : 'bg-slate-900 text-white border-slate-700'
                        }`}>
                          <span>{lang === 'hi' ? asset.nameHi : asset.nameEn}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedAsset && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {selectedAsset.ward}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 mt-2">
                        {lang === 'hi' ? selectedAsset.nameHi : selectedAsset.nameEn}
                      </h4>
                      <p className={`text-sm font-medium text-slate-700 mt-2 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>
                        {lang === 'hi' ? selectedAsset.statusHi : selectedAsset.statusEn}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('grievance')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition cursor-pointer"
                    >
                      {lang === 'hi' ? 'समस्या रिपोर्ट करें' : 'Report Asset Issue'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: NOTICE BOARD & AUDIO BROADCASTER
        ========================================== */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{t.noticeFeedTitle}</h2>
                  <p className={`text-sm text-slate-600 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.noticeFeedSub}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {announcements.map((ann) => {
                  const isSpeaking = speakingId === ann.id;
                  return (
                    <div
                      key={ann.id}
                      className={`p-6 rounded-2xl border transition flex flex-col justify-between ${
                        ann.urgent ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                            {lang === 'hi' ? ann.categoryHi : ann.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{ann.date}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 leading-snug">
                          {lang === 'hi' ? ann.titleHi : ann.titleEn}
                        </h3>
                        <p className={`text-sm text-slate-600 mt-2.5 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>
                          {lang === 'hi' ? ann.descHi : ann.descEn}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">
                          {lang === 'hi' ? ann.authorityHi : ann.authorityEn}
                        </span>

                        <button
                          onClick={() => handleSpeakAnnouncement(ann)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs transition cursor-pointer ${
                            isSpeaking
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-4 h-4" />
                              <span>{t.stopAudio}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4 text-indigo-300" />
                              <span>{t.listenHindi}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: BUDGET & WORKS (Separate Progress & Spent Bars + Flag Overspending)
        ========================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Financial Overview Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  15th Finance Commission & MGNREGA
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">{t.budgetTrackerTitle}</h2>
                <p className={`text-sm text-slate-300 mt-1 max-w-xl ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.budgetTrackerSub}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t.sanctionedLabel}</p>
                  <p className="text-base sm:text-lg font-bold text-white">{formatINR(stats.totalSanctioned)}</p>
                </div>
                <div className="border-x border-slate-700 px-3">
                  <p className="text-xs text-slate-400 font-medium">{t.spentLabel}</p>
                  <p className="text-base sm:text-lg font-bold text-amber-400">{formatINR(stats.totalSpent)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t.progressLabel}</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-400">{stats.avgProgress}%</p>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((proj) => {
                const spentPercent = Math.min(100, Math.round((proj.spentBudget / proj.sanctionedBudget) * 100));
                const isOverBudget = proj.spentBudget > (proj.sanctionedBudget * proj.progress) / 100;

                return (
                  <div key={proj.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
                            {proj.ward}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 font-mono">{proj.code}</span>
                        </div>
                        {isOverBudget && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            {lang === 'hi' ? 'खर्च अधिक (Flagged)' : 'Spending Exceeds Progress'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">{lang === 'hi' ? proj.titleHi : proj.titleEn}</h3>
                      <p className={`text-sm text-slate-600 mt-2 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{lang === 'hi' ? proj.descHi : proj.descEn}</p>

                      {/* Separate Bars: Green for Work Progress, Terracotta for Money Spent */}
                      <div className="mt-6 space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                            <span>{t.progressLabel} (Work Done)</span>
                            <span className="text-emerald-700 font-bold">{proj.progress}%</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                            <span>{t.spentLabel} ({formatINR(proj.spentBudget)})</span>
                            <span className="text-[#C85A32] font-bold">{spentPercent}%</span>
                          </div>
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#C85A32] rounded-full transition-all duration-500" style={{ width: `${spentPercent}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {proj.milestones.map((m, i) => (
                          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border ${
                            m.done ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}>
                            <CheckCircle2 className={`w-3.5 h-3.5 ${m.done ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <span>{lang === 'hi' ? m.hi : m.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>{t.contractorLabel}: <strong className="text-slate-800">{lang === 'hi' ? proj.contractorHi : proj.contractorEn}</strong></span>
                      <span>Target: {proj.etaDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: GRIEVANCE FILING FORM (Real File Capture & Success Modal)
        ========================================== */}
        {activeTab === 'grievance' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                    24x7 Citizen Helpdesk
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{t.lodgeGrievanceTitle}</h2>
                  <p className={`text-sm text-slate-600 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.lodgeGrievanceSub}</p>
                </div>

                <button
                  type="button"
                  onClick={handlePrefillBrokenLampDemo}
                  className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'hi' ? 'डेमो: खराब स्ट्रीट लैंप भरें' : 'Demo Auto-Fill'}</span>
                </button>
              </div>

              <form onSubmit={handleSubmitGrievance} className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">{t.selectCategory}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'Streetlights', label: t.catStreetlight, icon: Sun },
                      { id: 'Drinking Water', label: t.catWater, icon: Droplets },
                      { id: 'Sanitation', label: t.catSanitation, icon: Trash2 },
                      { id: 'Roads', label: t.catRoads, icon: Route }
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const selected = formCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormCategory(cat.id)}
                          className={`p-4 rounded-2xl border flex flex-col items-center text-center transition cursor-pointer ${
                            selected ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 ${selected ? 'text-indigo-300' : 'text-slate-600'}`} />
                          <span className="font-semibold text-xs sm:text-sm">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.yourName}</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Ramkishan Verma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.selectWard}</label>
                    <select
                      value={formWard}
                      onChange={(e) => setFormWard(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                    >
                      {INITIAL_WARDS.map((w) => (
                        <option key={w.wardNo} value={w.wardNo}>
                          {lang === 'hi' ? `वार्ड #${w.wardNo} - ${w.areaHi}` : `Ward #${w.wardNo} - ${w.areaEn}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.landmarkLabel}</label>
                  <input
                    type="text"
                    required
                    value={formLandmark}
                    onChange={(e) => setFormLandmark(e.target.value)}
                    placeholder="e.g. Near Panchayat Chowk"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.problemDesc}</label>
                  <textarea
                    rows={3}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Describe issue..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Real File Input with capture="environment" */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.attachPhoto}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-indigo-500 cursor-pointer transition">
                      <Camera className="w-6 h-6 text-slate-500 mb-1" />
                      <span className="text-xs font-semibold text-slate-700">Tap to Capture Photo or Upload</span>
                      <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    {photoPreview && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md transition cursor-pointer"
                >
                  {t.submitComplaint}
                </button>
              </form>
            </div>

            {/* Success Modal */}
            {submittedTokenModal && (
              <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Grievance Registered!</h3>
                    <p className="text-sm text-slate-600 mt-1">Your unique cryptographic tracking token:</p>
                    <p className="text-3xl font-mono font-extrabold text-indigo-600 mt-3">#{submittedTokenModal.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(submittedTokenModal.id);
                        triggerToast(t.tokenCopied, 'टोकन कॉपी हो गया!');
                      }}
                      className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{t.copyToken}</span>
                    </button>
                    <a
                      href={`https://wa.me/?text=My%20GramaGlow%20Grievance%20Token%20is%20%23${submittedTokenModal.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t.shareWhatsApp}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setSubmittedTokenModal(null);
                      setActiveTab('board');
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm cursor-pointer"
                  >
                    View on Status Board
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 5: WARD STATUS BOARD (SLA Hours Chip + Connected Stepper)
        ========================================== */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{t.statusBoardTitle}</h2>
                  <p className={`text-sm text-slate-600 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.statusBoardSub}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchToken}
                      onChange={(e) => setSearchToken(e.target.value)}
                      placeholder="Search #GG-..."
                      className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <select
                    value={wardFilter}
                    onChange={(e) => setWardFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                  >
                    <option value="All">All 8 Wards</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={String(n)}>Ward #{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'All', label: t.filterAll },
                  { id: 'Submitted', label: t.filterSubmitted },
                  { id: 'Assigned to Ward Member', label: t.filterAssigned },
                  { id: 'In Progress', label: t.filterInProgress },
                  { id: 'Resolved', label: t.filterResolved }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      statusFilter === st.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Empty State */}
              {filteredGrievances.length === 0 ? (
                <div className="text-center py-16 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <AlertTriangle className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="font-bold text-slate-700">{t.emptyBoard}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredGrievances.map((g) => {
                    const isOverdue = g.status !== 'Resolved' && g.slaHoursLeft <= 6;
                    const steps = ['Submitted', 'Assigned to Ward Member', 'In Progress', 'Resolved'];
                    const currentStepIdx = steps.indexOf(g.status);

                    return (
                      <div key={g.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono font-bold text-xs">
                                #{g.id}
                              </span>
                              <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs">
                                Ward #{g.ward}
                              </span>
                            </div>

                            {/* SLA Hours Chip */}
                            {g.status !== 'Resolved' && (
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                isOverdue ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {isOverdue ? t.overdue : `${g.slaHoursLeft}${t.hoursLeft}`}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-slate-900 text-base">{lang === 'hi' ? g.landmarkHi : g.landmarkEn}</h4>
                          <p className={`text-sm text-slate-600 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{lang === 'hi' ? g.descHi : g.descEn}</p>

                          {g.hasPhoto && g.photoData && (
                            <div className="mt-3 w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                              <img src={g.photoData} alt="Evidence" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        {/* Connected Stepper */}
                        <div className="pt-4 border-t border-slate-200/60 space-y-3">
                          <div className="grid grid-cols-4 gap-1">
                            {['Submitted', 'Assigned', 'In Progress', 'Resolved'].map((stepLabel, idx) => {
                              const done = idx <= currentStepIdx;
                              return (
                                <div key={stepLabel} className="text-center">
                                  <div className={`h-1.5 rounded-full mb-1 transition-all ${done ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                                  <span className={`text-[10px] font-semibold ${done ? 'text-indigo-900' : 'text-slate-400'}`}>
                                    {stepLabel}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                            <span>Citizen: {g.citizenNameEn}</span>
                            {renderStatusBadge(g.status)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 6: SARPANCH ADMIN DASHBOARD (One-Tap Action Buttons & Separate Budget Inputs)
        ========================================== */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  Smt. Savitri Devi • Executive Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">{t.adminBannerTitle}</h2>
                <p className={`text-sm text-slate-300 mt-1 ${lang === 'hi' ? 'leading-relaxed' : ''}`}>{t.adminBannerSub}</p>
              </div>

              <button
                onClick={handleResetDemo}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20 font-semibold text-xs flex items-center gap-2 self-start md:self-auto transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.resetDemo}</span>
              </button>
            </div>

            {/* SECTION A: GROUPED OPEN TICKETS & ONE-TAP ACTION BUTTONS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">1. Citizen Grievance Redressal Action Center</h3>

              <div className="space-y-4">
                {grievances.map((g) => (
                  <div key={g.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-xs">#{g.id}</span>
                        <span className="text-xs font-semibold text-indigo-700">Ward #{g.ward}</span>
                        {renderStatusBadge(g.status)}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{g.landmarkEn}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{g.descEn}</p>
                    </div>

                    {/* One-Tap Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {g.status === 'Submitted' && (
                        <button
                          onClick={() => handleAdminUpdateGrievance(g.id, { status: 'Assigned to Ward Member' })}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer"
                        >
                          Assign to Ward #{g.ward}
                        </button>
                      )}
                      {g.status !== 'In Progress' && g.status !== 'Resolved' && (
                        <button
                          onClick={() => handleAdminUpdateGrievance(g.id, { status: 'In Progress' })}
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition cursor-pointer"
                        >
                          Start Work
                        </button>
                      )}
                      {g.status !== 'Resolved' && (
                        <button
                          onClick={() => handleAdminUpdateGrievance(g.id, { status: 'Resolved', slaHoursLeft: 0 })}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: BUDGET CONTROLS WITH SEPARATE PROGRESS & SPENT ENTRY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="text-xl font-bold text-slate-900">2. Village Development Budget & Spent Control</h3>

                <div className="space-y-5">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                        <span>{lang === 'hi' ? p.titleHi : p.titleEn}</span>
                        <span className="text-indigo-600">{p.progress}% Progress</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Physical Progress (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={p.progress}
                            onChange={(e) => handleAdminUpdateProject(p.id, 'progress', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Spent Amount (₹)</label>
                          <input
                            type="number"
                            step="10000"
                            value={p.spentBudget}
                            onChange={(e) => handleAdminUpdateProject(p.id, 'spentBudget', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#C85A32]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: BROADCAST NEW NOTICE */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">3. {t.postNoticeTitle}</h3>
                  <p className="text-xs text-slate-600 mb-6">Publish emergency notices instantly with Web Speech support.</p>

                  <form onSubmit={handleAdminPostAnnouncement} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={adminNoticeCategory}
                        onChange={(e) => setAdminNoticeCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                      >
                        <option value="Gram Sabha">Gram Sabha</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Health">Health</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                      <input
                        type="text"
                        required
                        value={adminNoticeTitle}
                        onChange={(e) => setAdminNoticeTitle(e.target.value)}
                        placeholder="Notice title..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Details</label>
                      <textarea
                        rows={3}
                        value={adminNoticeDesc}
                        onChange={(e) => setAdminNoticeDesc(e.target.value)}
                        placeholder="Notice message..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition cursor-pointer"
                    >
                      Publish Broadcast
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          JUDGE WALKTHROUGH MODAL
      ========================================== */}
      {showDemoModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">GramaGlow Evaluation Walkthrough</h3>
              </div>
              <button onClick={() => setShowDemoModal(false)} className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className={`space-y-3 text-sm text-slate-700 list-decimal list-inside font-medium ${lang === 'hi' ? 'leading-relaxed' : ''}`}>
              <li><strong>Switch to Hindi (हिंदी):</strong> Tap the <em>अ/A</em> button in the header.</li>
              <li><strong>Listen to Notices:</strong> Go to <em>Notice Board</em> and click <em>Listen Aloud</em>.</li>
              <li><strong>Inspect Budget & Spent:</strong> Check <em>Budget & Works</em> for separate green (progress) and terracotta (spent) bars.</li>
              <li><strong>Lodge a Grievance:</strong> Use the <em>Demo Auto-Fill</em> button and upload a photo.</li>
              <li><strong>Admin Redressal:</strong> Switch to <em>Panchayat Admin</em> to use one-tap action buttons.</li>
            </ol>

            <button
              onClick={() => setShowDemoModal(false)}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          MOBILE BOTTOM NAVIGATION BAR
      ========================================== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 py-2 px-1 shadow-lg">
        {[
          { id: 'overview', label: lang === 'hi' ? 'प्रोफाइल' : 'Village', icon: Landmark },
          { id: 'notices', label: lang === 'hi' ? 'सूचना' : 'Notices', icon: Megaphone },
          { id: 'projects', label: lang === 'hi' ? 'बजट' : 'Budget', icon: HardHat },
          { id: 'grievance', label: lang === 'hi' ? 'शिकायत' : 'Report', icon: MessageSquareWarning },
          { id: role === 'admin' ? 'admin' : 'board', label: role === 'admin' ? (lang === 'hi' ? 'सरपंच' : 'Admin') : (lang === 'hi' ? 'स्थिति' : 'Status'), icon: role === 'admin' ? Sliders : CheckCircle2 }
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl font-semibold text-[11px] ${
                active ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}