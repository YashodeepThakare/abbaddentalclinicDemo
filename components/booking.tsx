"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2,
  ChevronDown
} from 'lucide-react';

// --- CONFIGURATION ---
const COLOR_CREAM = "#F2F0E9";
const COLOR_BLUE = "#3563A8";
const COLOR_ORANGE = "#FA5424";
const COLOR_TEXT_DARK = "#1A1A1A";

const INTERESTS = [
  "Braces/ aligners",
  "Dental implants",
  "Dental veneers",
  "Full mouth rehabilitation",
  "Pediatric dentistry",
  "Root canal",
  "Wisdom teeth extraction",
  "Other"
];

// Complete list of country codes
const COUNTRY_CODES = [
  { code: "+93", country: "AF", name: "Afghanistan" },
  { code: "+355", country: "AL", name: "Albania" },
  { code: "+213", country: "DZ", name: "Algeria" },
  { code: "+1-684", country: "AS", name: "American Samoa" },
  { code: "+376", country: "AD", name: "Andorra" },
  { code: "+244", country: "AO", name: "Angola" },
  { code: "+1-264", country: "AI", name: "Anguilla" },
  { code: "+672", country: "AQ", name: "Antarctica" },
  { code: "+1-268", country: "AG", name: "Antigua and Barbuda" },
  { code: "+54", country: "AR", name: "Argentina" },
  { code: "+374", country: "AM", name: "Armenia" },
  { code: "+297", country: "AW", name: "Aruba" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+43", country: "AT", name: "Austria" },
  { code: "+994", country: "AZ", name: "Azerbaijan" },
  { code: "+1-242", country: "BS", name: "Bahamas" },
  { code: "+973", country: "BH", name: "Bahrain" },
  { code: "+880", country: "BD", name: "Bangladesh" },
  { code: "+1-246", country: "BB", name: "Barbados" },
  { code: "+375", country: "BY", name: "Belarus" },
  { code: "+32", country: "BE", name: "Belgium" },
  { code: "+501", country: "BZ", name: "Belize" },
  { code: "+229", country: "BJ", name: "Benin" },
  { code: "+1-441", country: "BM", name: "Bermuda" },
  { code: "+975", country: "BT", name: "Bhutan" },
  { code: "+591", country: "BO", name: "Bolivia" },
  { code: "+387", country: "BA", name: "Bosnia and Herzegovina" },
  { code: "+267", country: "BW", name: "Botswana" },
  { code: "+55", country: "BR", name: "Brazil" },
  { code: "+673", country: "BN", name: "Brunei" },
  { code: "+359", country: "BG", name: "Bulgaria" },
  { code: "+226", country: "BF", name: "Burkina Faso" },
  { code: "+257", country: "BI", name: "Burundi" },
  { code: "+855", country: "KH", name: "Cambodia" },
  { code: "+237", country: "CM", name: "Cameroon" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+238", country: "CV", name: "Cape Verde" },
  { code: "+1-345", country: "KY", name: "Cayman Islands" },
  { code: "+236", country: "CF", name: "Central African Republic" },
  { code: "+235", country: "TD", name: "Chad" },
  { code: "+56", country: "CL", name: "Chile" },
  { code: "+86", country: "CN", name: "China" },
  { code: "+57", country: "CO", name: "Colombia" },
  { code: "+269", country: "KM", name: "Comoros" },
  { code: "+242", country: "CG", name: "Congo" },
  { code: "+682", country: "CK", name: "Cook Islands" },
  { code: "+506", country: "CR", name: "Costa Rica" },
  { code: "+385", country: "HR", name: "Croatia" },
  { code: "+53", country: "CU", name: "Cuba" },
  { code: "+357", country: "CY", name: "Cyprus" },
  { code: "+420", country: "CZ", name: "Czech Republic" },
  { code: "+45", country: "DK", name: "Denmark" },
  { code: "+253", country: "DJ", name: "Djibouti" },
  { code: "+1-767", country: "DM", name: "Dominica" },
  { code: "+1-809", country: "DO", name: "Dominican Republic" },
  { code: "+593", country: "EC", name: "Ecuador" },
  { code: "+20", country: "EG", name: "Egypt" },
  { code: "+503", country: "SV", name: "El Salvador" },
  { code: "+240", country: "GQ", name: "Equatorial Guinea" },
  { code: "+291", country: "ER", name: "Eritrea" },
  { code: "+372", country: "EE", name: "Estonia" },
  { code: "+251", country: "ET", name: "Ethiopia" },
  { code: "+500", country: "FK", name: "Falkland Islands" },
  { code: "+298", country: "FO", name: "Faroe Islands" },
  { code: "+679", country: "FJ", name: "Fiji" },
  { code: "+358", country: "FI", name: "Finland" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+594", country: "GF", name: "French Guiana" },
  { code: "+689", country: "PF", name: "French Polynesia" },
  { code: "+241", country: "GA", name: "Gabon" },
  { code: "+220", country: "GM", name: "Gambia" },
  { code: "+995", country: "GE", name: "Georgia" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+233", country: "GH", name: "Ghana" },
  { code: "+350", country: "GI", name: "Gibraltar" },
  { code: "+30", country: "GR", name: "Greece" },
  { code: "+299", country: "GL", name: "Greenland" },
  { code: "+1-473", country: "GD", name: "Grenada" },
  { code: "+590", country: "GP", name: "Guadeloupe" },
  { code: "+1-671", country: "GU", name: "Guam" },
  { code: "+502", country: "GT", name: "Guatemala" },
  { code: "+224", country: "GN", name: "Guinea" },
  { code: "+245", country: "GW", name: "Guinea-Bissau" },
  { code: "+592", country: "GY", name: "Guyana" },
  { code: "+509", country: "HT", name: "Haiti" },
  { code: "+504", country: "HN", name: "Honduras" },
  { code: "+852", country: "HK", name: "Hong Kong" },
  { code: "+36", country: "HU", name: "Hungary" },
  { code: "+354", country: "IS", name: "Iceland" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+62", country: "ID", name: "Indonesia" },
  { code: "+98", country: "IR", name: "Iran" },
  { code: "+964", country: "IQ", name: "Iraq" },
  { code: "+353", country: "IE", name: "Ireland" },
  { code: "+972", country: "IL", name: "Israel" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+225", country: "CI", name: "Ivory Coast" },
  { code: "+1-876", country: "JM", name: "Jamaica" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+962", country: "JO", name: "Jordan" },
  { code: "+7", country: "KZ", name: "Kazakhstan" },
  { code: "+254", country: "KE", name: "Kenya" },
  { code: "+686", country: "KI", name: "Kiribati" },
  { code: "+383", country: "XK", name: "Kosovo" },
  { code: "+965", country: "KW", name: "Kuwait" },
  { code: "+996", country: "KG", name: "Kyrgyzstan" },
  { code: "+856", country: "LA", name: "Laos" },
  { code: "+371", country: "LV", name: "Latvia" },
  { code: "+961", country: "LB", name: "Lebanon" },
  { code: "+266", country: "LS", name: "Lesotho" },
  { code: "+231", country: "LR", name: "Liberia" },
  { code: "+218", country: "LY", name: "Libya" },
  { code: "+423", country: "LI", name: "Liechtenstein" },
  { code: "+370", country: "LT", name: "Lithuania" },
  { code: "+352", country: "LU", name: "Luxembourg" },
  { code: "+853", country: "MO", name: "Macau" },
  { code: "+389", country: "MK", name: "Macedonia" },
  { code: "+261", country: "MG", name: "Madagascar" },
  { code: "+265", country: "MW", name: "Malawi" },
  { code: "+60", country: "MY", name: "Malaysia" },
  { code: "+960", country: "MV", name: "Maldives" },
  { code: "+223", country: "ML", name: "Mali" },
  { code: "+356", country: "MT", name: "Malta" },
  { code: "+692", country: "MH", name: "Marshall Islands" },
  { code: "+596", country: "MQ", name: "Martinique" },
  { code: "+222", country: "MR", name: "Mauritania" },
  { code: "+230", country: "MU", name: "Mauritius" },
  { code: "+262", country: "YT", name: "Mayotte" },
  { code: "+52", country: "MX", name: "Mexico" },
  { code: "+691", country: "FM", name: "Micronesia" },
  { code: "+373", country: "MD", name: "Moldova" },
  { code: "+377", country: "MC", name: "Monaco" },
  { code: "+976", country: "MN", name: "Mongolia" },
  { code: "+382", country: "ME", name: "Montenegro" },
  { code: "+1-664", country: "MS", name: "Montserrat" },
  { code: "+212", country: "MA", name: "Morocco" },
  { code: "+258", country: "MZ", name: "Mozambique" },
  { code: "+95", country: "MM", name: "Myanmar" },
  { code: "+264", country: "NA", name: "Namibia" },
  { code: "+674", country: "NR", name: "Nauru" },
  { code: "+977", country: "NP", name: "Nepal" },
  { code: "+31", country: "NL", name: "Netherlands" },
  { code: "+687", country: "NC", name: "New Caledonia" },
  { code: "+64", country: "NZ", name: "New Zealand" },
  { code: "+505", country: "NI", name: "Nicaragua" },
  { code: "+227", country: "NE", name: "Niger" },
  { code: "+234", country: "NG", name: "Nigeria" },
  { code: "+683", country: "NU", name: "Niue" },
  { code: "+850", country: "KP", name: "North Korea" },
  { code: "+47", country: "NO", name: "Norway" },
  { code: "+968", country: "OM", name: "Oman" },
  { code: "+92", country: "PK", name: "Pakistan" },
  { code: "+680", country: "PW", name: "Palau" },
  { code: "+970", country: "PS", name: "Palestine" },
  { code: "+507", country: "PA", name: "Panama" },
  { code: "+675", country: "PG", name: "Papua New Guinea" },
  { code: "+595", country: "PY", name: "Paraguay" },
  { code: "+51", country: "PE", name: "Peru" },
  { code: "+63", country: "PH", name: "Philippines" },
  { code: "+48", country: "PL", name: "Poland" },
  { code: "+351", country: "PT", name: "Portugal" },
  { code: "+1-787", country: "PR", name: "Puerto Rico" },
  { code: "+974", country: "QA", name: "Qatar" },
  { code: "+262", country: "RE", name: "Reunion" },
  { code: "+40", country: "RO", name: "Romania" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+250", country: "RW", name: "Rwanda" },
  { code: "+590", country: "BL", name: "Saint Barthelemy" },
  { code: "+290", country: "SH", name: "Saint Helena" },
  { code: "+1-869", country: "KN", name: "Saint Kitts and Nevis" },
  { code: "+1-758", country: "LC", name: "Saint Lucia" },
  { code: "+590", country: "MF", name: "Saint Martin" },
  { code: "+508", country: "PM", name: "Saint Pierre and Miquelon" },
  { code: "+1-784", country: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "+685", country: "WS", name: "Samoa" },
  { code: "+378", country: "SM", name: "San Marino" },
  { code: "+239", country: "ST", name: "Sao Tome and Principe" },
  { code: "+966", country: "SA", name: "Saudi Arabia" },
  { code: "+221", country: "SN", name: "Senegal" },
  { code: "+381", country: "RS", name: "Serbia" },
  { code: "+248", country: "SC", name: "Seychelles" },
  { code: "+232", country: "SL", name: "Sierra Leone" },
  { code: "+65", country: "SG", name: "Singapore" },
  { code: "+1-721", country: "SX", name: "Sint Maarten" },
  { code: "+421", country: "SK", name: "Slovakia" },
  { code: "+386", country: "SI", name: "Slovenia" },
  { code: "+677", country: "SB", name: "Solomon Islands" },
  { code: "+252", country: "SO", name: "Somalia" },
  { code: "+27", country: "ZA", name: "South Africa" },
  { code: "+82", country: "KR", name: "South Korea" },
  { code: "+211", country: "SS", name: "South Sudan" },
  { code: "+34", country: "ES", name: "Spain" },
  { code: "+94", country: "LK", name: "Sri Lanka" },
  { code: "+249", country: "SD", name: "Sudan" },
  { code: "+597", country: "SR", name: "Suriname" },
  { code: "+268", country: "SZ", name: "Swaziland" },
  { code: "+46", country: "SE", name: "Sweden" },
  { code: "+41", country: "CH", name: "Switzerland" },
  { code: "+963", country: "SY", name: "Syria" },
  { code: "+886", country: "TW", name: "Taiwan" },
  { code: "+992", country: "TJ", name: "Tajikistan" },
  { code: "+255", country: "TZ", name: "Tanzania" },
  { code: "+66", country: "TH", name: "Thailand" },
  { code: "+670", country: "TL", name: "Timor-Leste" },
  { code: "+228", country: "TG", name: "Togo" },
  { code: "+690", country: "TK", name: "Tokelau" },
  { code: "+676", country: "TO", name: "Tonga" },
  { code: "+1-868", country: "TT", name: "Trinidad and Tobago" },
  { code: "+216", country: "TN", name: "Tunisia" },
  { code: "+90", country: "TR", name: "Turkey" },
  { code: "+993", country: "TM", name: "Turkmenistan" },
  { code: "+1-649", country: "TC", name: "Turks and Caicos Islands" },
  { code: "+688", country: "TV", name: "Tuvalu" },
  { code: "+256", country: "UG", name: "Uganda" },
  { code: "+380", country: "UA", name: "Ukraine" },
  { code: "+971", country: "AE", name: "United Arab Emirates" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+598", country: "UY", name: "Uruguay" },
  { code: "+998", country: "UZ", name: "Uzbekistan" },
  { code: "+678", country: "VU", name: "Vanuatu" },
  { code: "+379", country: "VA", name: "Vatican City" },
  { code: "+58", country: "VE", name: "Venezuela" },
  { code: "+84", country: "VN", name: "Vietnam" },
  { code: "+1-284", country: "VG", name: "Virgin Islands (British)" },
  { code: "+1-340", country: "VI", name: "Virgin Islands (US)" },
  { code: "+681", country: "WF", name: "Wallis and Futuna" },
  { code: "+967", country: "YE", name: "Yemen" },
  { code: "+260", country: "ZM", name: "Zambia" },
  { code: "+263", country: "ZW", name: "Zimbabwe" }
];

const SCHEDULE_RULES: Record<number, { start: number; end: number; startMinute?: number }> = {
  0: { start: 10, end: 18, startMinute: 30 },
  1: { start: 10, end: 21 },
  2: { start: 10, end: 21 },
  3: { start: 10, end: 21 },
  4: { start: 10, end: 21 },
  5: { start: 10, end: 21 },
  6: { start: 10, end: 21 },
};

// --- DSA / LOGIC UTILITIES ---
interface DayNode {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isClosed: boolean;
  availableSlots: string[];
}

// Helper to check if time slot is in the past for today
const isTimeSlotPast = (date: Date, timeSlot: string): boolean => {
  const now = new Date();
  const selectedDate = new Date(date);
  
  selectedDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate.getTime() !== today.getTime()) {
    return false;
  }
  
  const [time, period] = timeSlot.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hour24 = hours;
  
  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }
  
  const slotTime = new Date();
  slotTime.setHours(hour24, minutes, 0, 0);
  
  const bufferTime = new Date(now.getTime() + 30 * 60000);
  
  return slotTime <= bufferTime;
};

const generateCalendarGrid = (year: number, month: number): DayNode[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayIndex = firstDay.getDay();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const grid: DayNode[] = [];

  for (let i = 0; i < startingDayIndex; i++) {
    const date = new Date(year, month, -startingDayIndex + i + 1);
    grid.push({ 
      date: date, 
      isCurrentMonth: false, 
      isToday: false, 
      isPast: true,
      isClosed: true, 
      availableSlots: [] 
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const current = new Date(year, month, i);
    const dayOfWeek = current.getDay();
    const currentNormalized = new Date(current);
    currentNormalized.setHours(0, 0, 0, 0);
    const isToday = currentNormalized.getTime() === today.getTime();
    const isPast = currentNormalized < today;
    const rules = SCHEDULE_RULES[dayOfWeek];
    const isClosed = !rules; 
    const slots: string[] = [];

    if (!isClosed && !isPast) {
      const startHour = rules.start;
      const endHour = rules.end;
      const startMin = rules.startMinute || 0;
      
      for (let hour = startHour; hour < endHour; hour++) {
        if (hour > startHour || startMin === 0) {
          const slot = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
          if (!isTimeSlotPast(current, slot)) {
            slots.push(slot);
          }
        }
        if (!(hour === startHour && startMin > 0 && startMin > 30)) {
          const slot = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
          if (!isTimeSlotPast(current, slot)) {
            slots.push(slot);
          }
        }
      }
    }

    grid.push({ 
      date: current, 
      isCurrentMonth: true, 
      isToday, 
      isPast,
      isClosed, 
      availableSlots: slots 
    });
  }
  return grid;
};

type ErrorPriority = 'CRITICAL' | 'WARNING';
interface ValidationError { field: string; message: string; priority: ErrorPriority; }

class ValidationHeap {
  private heap: ValidationError[] = [];
  push(error: ValidationError) { this.heap.push(error); this.heap.sort((a, b) => (a.priority === 'CRITICAL' ? -1 : 1)); }
  pop() { return this.heap.shift(); }
  clear() { this.heap = []; }
  peek() { return this.heap[0]; }
}

export default function AdvancedBooking() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    countryCode: '+91', 
    mobile: '', 
    interest: '', 
    message: '' 
  });
  const [viewState, setViewState] = useState<'CALENDAR' | 'DETAILS'>('CALENDAR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const validator = useRef(new ValidationHeap());
  const calendarGrid = useRef<DayNode[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  calendarGrid.current = generateCalendarGrid(currentDate.getFullYear(), currentDate.getMonth());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search
  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch) ||
    country.country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedDate) {
        calendarGrid.current = generateCalendarGrid(currentDate.getFullYear(), currentDate.getMonth());
        
        if (selectedSlot && isTimeSlotPast(selectedDate, selectedSlot)) {
          setSelectedSlot(null);
          setError({ 
            field: 'calendar', 
            message: 'The selected time slot has passed. Please choose another time.', 
            priority: 'WARNING' 
          });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedDate, selectedSlot, currentDate]);

  useEffect(() => {
    const loadGSAP = async () => {
      if (!(window as any).gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = initAnimations;
        document.body.appendChild(script);
      } else {
        initAnimations();
      }
    };
    loadGSAP();
  }, []);

  const initAnimations = () => {
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.fromTo(".fade-in-stagger", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }
      );
    }
  };

  const handleDateSelect = (day: DayNode) => {
    if (day.isClosed || day.isPast) return;
    setSelectedDate(day.date);
    setSelectedSlot(null);
    setError(null);
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.fromTo(".slot-anim", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 });
    }
  };

  const handleSlotSelect = (slot: string) => {
    if (selectedDate && isTimeSlotPast(selectedDate, slot)) {
      setError({ 
        field: 'calendar', 
        message: 'This time slot is no longer available. Please choose another.', 
        priority: 'WARNING' 
      });
      return;
    }
    setSelectedSlot(slot);
    setError(null);
  };

  const handleNextStep = () => {
    if (!selectedDate || !selectedSlot) {
      setError({ field: 'calendar', message: 'Please select a date and time.', priority: 'CRITICAL' });
      return;
    }
    
    if (isTimeSlotPast(selectedDate, selectedSlot)) {
      setSelectedSlot(null);
      setError({ 
        field: 'calendar', 
        message: 'The selected time has passed. Please choose another slot.', 
        priority: 'CRITICAL' 
      });
      return;
    }
    
    setError(null);
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.to(".calendar-view", { 
        x: -50, opacity: 0, duration: 0.4, 
        onComplete: () => {
          setViewState('DETAILS');
          gsap.fromTo(".details-view", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
        }
      });
    } else {
      setViewState('DETAILS');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validator.current.clear();
    
    // Validation (Email is now optional)
    if (!formData.name.trim()) {
      validator.current.push({ field: 'name', message: 'Name is required', priority: 'CRITICAL' });
    }
    if (formData.email && (!formData.email.includes('@') || !formData.email.includes('.'))) {
      validator.current.push({ field: 'email', message: 'Invalid Email format', priority: 'CRITICAL' });
    }
    if (!formData.mobile.trim() || formData.mobile.length !== 10) {
      validator.current.push({ field: 'mobile', message: 'Please enter a valid 10-digit mobile number', priority: 'CRITICAL' });
    }
    
    const topError = validator.current.peek();
    if (topError) {
      setError(topError);
      return;
    }

    if (selectedDate && selectedSlot && isTimeSlotPast(selectedDate, selectedSlot)) {
      setError({ 
        field: 'submit', 
        message: 'The selected time slot has passed. Please go back and select a new time.', 
        priority: 'CRITICAL' 
      });
      return;
    }

    const formattedDate = selectedDate?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const submissionData = {
      name: formData.name,
      email: formData.email || 'Not provided',
      mobile: `${formData.countryCode} ${formData.mobile}`,
      interest: formData.interest || 'Not specified',
      message: formData.message || '',
      date: formattedDate,
      slot: selectedSlot
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking');
      }

      if (result.success) {
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email || 'Not provided',
          date: formattedDate || '',
          slot: selectedSlot || '',
          interest: formData.interest || 'Not specified'
        });
        
        router.push(`/thankyou?${params.toString()}`);
      } else {
        throw new Error('Booking submission failed');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setError({ 
        field: 'submit', 
        message: err.message || 'Failed to submit booking. Please try again.', 
        priority: 'CRITICAL' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <section 
      id='contact'
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-8"
      style={{ backgroundColor: COLOR_CREAM, color: COLOR_TEXT_DARK }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
        @media (max-width: 640px) { .calendar-grid { gap: 4px; } }
        .scroller::-webkit-scrollbar { width: 4px; }
        .scroller::-webkit-scrollbar-thumb { background: ${COLOR_BLUE}; border-radius: 4px; }
      `}</style>

      <div className="relative w-full max-w-6xl min-h-[600px] lg:min-h-[700px] bg-white rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE: CONTEXT */}
        <div className="w-full md:w-[35%] bg-[#F9F8F4] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFECE5]">
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6 lg:mb-8" style={{ color: COLOR_ORANGE }}>
              <Sparkles size={16} />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase font-sans">Book Your Spot</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 sm:mb-6 leading-tight text-[#1a1a1a]">
              Craft Your <br/>
              <span className="italic" style={{ color: COLOR_ORANGE }}>Perfect</span> <br/>
              Visit.
            </h1>
            
            <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              Select a date from our real-time medical calendar. We ensure ample time for your bespoke consultation.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="transition-all duration-300 p-3 sm:p-4 rounded-lg sm:rounded-xl border" style={{ backgroundColor: selectedDate ? 'white' : 'transparent', borderColor: selectedDate ? COLOR_BLUE : '#E5E7EB', borderStyle: selectedDate ? 'solid' : 'dashed' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CalendarIcon style={{ color: selectedDate ? COLOR_BLUE : '#D1D5DB' }} size={18} />
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 font-bold">Selected Date</div>
                    <div className="font-serif text-sm sm:text-base lg:text-lg">
                      {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : "Choose a date"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="transition-all duration-300 p-3 sm:p-4 rounded-lg sm:rounded-xl border" style={{ backgroundColor: selectedSlot ? 'white' : 'transparent', borderColor: selectedSlot ? COLOR_BLUE : '#E5E7EB', borderStyle: selectedSlot ? 'solid' : 'dashed' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock style={{ color: selectedSlot ? COLOR_BLUE : '#D1D5DB' }} size={18} />
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 font-bold">Time Slot</div>
                    <div className="font-serif text-sm sm:text-base lg:text-lg">
                      {selectedSlot || "Select a time"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
             <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                <AlertCircle size={12} style={{ color: COLOR_ORANGE }} />
                <span className="text-[10px] sm:text-xs">Mon-Sat: 10am-9pm | Sun: 10:30am-6pm</span>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="w-full md:w-[65%] p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden bg-white">
          
          {viewState === 'CALENDAR' && (
            <div className="calendar-view h-full flex flex-col fade-in-stagger">
              <div className="flex items-center justify-between mb-4 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif text-[#1a1a1a]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  {(() => {
                    const now = new Date();
                    const isCurrentMonth = currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === now.getMonth();
                    return (
                      <button
                        onClick={() => {
                          if (!isCurrentMonth) {
                            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
                          }
                        }}
                        disabled={isCurrentMonth}
                        className={`p-2 rounded-full transition-colors ${isCurrentMonth ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#F2F0E9] cursor-pointer'}`}
                      >
                        <ChevronLeft size={20}/>
                      </button>
                    );
                  })()}
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-[#F2F0E9] transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>

              <div className="calendar-grid mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</div>
                ))}
              </div>

              <div className="calendar-grid gap-y-2 sm:gap-y-4 mb-8">
                {calendarGrid.current.map((day, i) => (
                  <button
                    key={i}
                    disabled={!day.isCurrentMonth || day.isClosed || day.isPast}
                    onClick={() => handleDateSelect(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-300
                      ${!day.isCurrentMonth ? 'opacity-0 pointer-events-none' : ''}
                      ${day.isPast || day.isClosed ? 'bg-[#F9F9F9] text-gray-300 cursor-not-allowed' : 'hover:bg-[#F2F0E9] cursor-pointer text-[#1a1a1a]'}
                      ${selectedDate?.toDateString() === day.date.toDateString() ? 'shadow-lg scale-105 z-10' : ''}
                    `}
                    style={{ 
                      backgroundColor: selectedDate?.toDateString() === day.date.toDateString() ? COLOR_BLUE : undefined,
                      color: selectedDate?.toDateString() === day.date.toDateString() ? 'white' : undefined
                    }}
                  >
                    <span className="text-xs sm:text-sm font-medium">{day.date.getDate()}</span>
                  </button>
                ))}
              </div>

              <div className="flex-grow">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Available Slots</h3>
                {selectedDate && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[160px] overflow-y-auto scroller pr-2">
                    {generateCalendarGrid(selectedDate.getFullYear(), selectedDate.getMonth())
                      .find(d => d.date.toDateString() === selectedDate.toDateString())
                      ?.availableSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSlotSelect(slot)}
                          className="slot-anim py-2 px-1 rounded-lg text-[10px] sm:text-xs font-medium border transition-all"
                          style={{
                            backgroundColor: selectedSlot === slot ? COLOR_BLUE : 'white',
                            borderColor: selectedSlot === slot ? COLOR_BLUE : '#E5E7EB',
                            color: selectedSlot === slot ? 'white' : '#4B5563',
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                  </div>
                )}
                {selectedDate && calendarGrid.current.find(d => d.date.toDateString() === selectedDate.toDateString())?.availableSlots.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No available slots for this date</p>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                {error?.field === 'calendar' && <div className="text-red-500 text-[10px] font-sans flex items-center gap-1"><AlertCircle size={12} />{error.message}</div>}
                <button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-8 py-3 rounded-full transition-all group hover:shadow-lg ml-auto"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  <span className="font-sans text-xs font-bold tracking-wide">Continue</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {viewState === 'DETAILS' && (
            <div className="details-view h-full flex flex-col">
               <button onClick={() => setViewState('CALENDAR')} className="flex items-center gap-2 text-gray-400 hover:text-black mb-6 transition-colors w-fit">
                 <ChevronLeft size={14} /><span className="text-[10px] font-bold uppercase tracking-wider">Back</span>
               </button>

               <h2 className="text-2xl font-serif mb-8 text-[#1a1a1a]">Patient Details</h2>

               <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Full Name *</label>
                      <div className="flex items-center gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-transparent focus-within:border-[#3563A8] transition-all">
                        <User size={18} className="text-gray-400" />
                        <input 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                          placeholder="Your Name" 
                          className="bg-transparent w-full outline-none text-sm font-serif"
                          disabled={isSubmitting}
                        />
                      </div>
                      {error?.field === 'name' && <p className="text-red-500 text-[10px] ml-1">{error.message}</p>}
                    </div>
                    
                    {/* Mobile with Country Code Dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Mobile *</label>
                      <div className="flex items-center gap-2 bg-[#F9F9F9] rounded-xl border border-transparent focus-within:border-[#3563A8] transition-all">
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex items-center gap-1 px-3 py-4 hover:bg-gray-100 rounded-l-xl transition-colors"
                            disabled={isSubmitting}
                          >
                            <span className="text-sm font-medium">{formData.countryCode}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                          </button>
                          
                          {showCountryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden">
                              <div className="p-2 border-b border-gray-100">
                                <input
                                  type="text"
                                  placeholder="Search country..."
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                                />
                              </div>
                              <div className="overflow-y-auto max-h-64 scroller">
                                {filteredCountries.map((country) => (
                                  <button
                                    key={`${country.code}-${country.country}`}
                                    type="button"
                                    onClick={() => {
                                      setFormData({...formData, countryCode: country.code});
                                      setShowCountryDropdown(false);
                                      setCountrySearch('');
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-left transition-colors"
                                  >
                                    <span className="text-xs font-medium">{country.country} {country.code}</span>
                                    <span className="text-[10px] text-gray-400 truncate ml-2">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <Phone size={18} className="text-gray-400" />
                        <input 
                          type="tel"
                          value={formData.mobile} 
                          onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/[^0-9]/g, '').slice(0, 10)})} 
                          placeholder="1234567890" 
                          maxLength={10}
                          className="bg-transparent w-full outline-none text-sm font-sans pr-4"
                          disabled={isSubmitting}
                        />
                      </div>
                      {error?.field === 'mobile' && <p className="text-red-500 text-[10px] ml-1">{error.message}</p>}
                    </div>
                  </div>

                  {/* Email - Now Optional */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email (Optional)</label>
                    <div className="flex items-center gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-transparent focus-within:border-[#3563A8] transition-all">
                      <Mail size={18} className="text-gray-400" />
                      <input 
                        type="email"
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        placeholder="email@example.com" 
                        className="bg-transparent w-full outline-none text-sm font-sans"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error?.field === 'email' && <p className="text-red-500 text-[10px] ml-1">{error.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Interest</label>
                    <select 
                      value={formData.interest} 
                      onChange={(e) => setFormData({...formData, interest: e.target.value})} 
                      className="w-full bg-[#F9F9F9] p-4 rounded-xl border border-transparent focus:border-[#3563A8] outline-none text-sm font-sans appearance-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Treatment</option>
                      {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1 flex-grow">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Additional Message</label>
                    <div className="flex items-start gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-transparent focus-within:border-[#3563A8] transition-all h-24">
                      <MessageSquare size={18} className="text-gray-400 mt-1" />
                      <textarea 
                        value={formData.message} 
                        onChange={(e) => setFormData({...formData, message: e.target.value})} 
                        placeholder="Any specific concerns or questions..." 
                        className="bg-transparent w-full outline-none text-sm font-sans resize-none h-full"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                    {error?.field === 'submit' && (
                      <div className="text-red-500 text-[10px] flex items-center gap-2">
                        <AlertCircle size={14} />
                        <span>{error.message}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl"
                      style={{ 
                          backgroundColor: COLOR_ORANGE,
                          boxShadow: `0 10px 20px -5px ${COLOR_ORANGE}4D`
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
               </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
