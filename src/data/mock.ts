export type NavItem = {
  label: string;
  to: string;
  badge?: number;
  icon: string;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: "dashboard" },
  { label: "Booking list", to: "/bookings", badge: 5, icon: "booking" },
  { label: "Users", to: "/users", badge: 45, icon: "users" },
  { label: "Admins", to: "/admins", badge: 10, icon: "admins" },
  { label: "Branches", to: "/branches", badge: 3, icon: "branches" },
  { label: "Review branches", to: "/review-branches", badge: 3, icon: "review" },
  { label: "Notifications", to: "/notifications", badge: 3, icon: "notifications" },
  { label: "Reports", to: "/reports", icon: "reports" },
];

export type ReviewBranchRow = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  services: number;
  barbers: number;
};

export const reviewBranches: ReviewBranchRow[] = [
  {
    id: "1",
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/80?u=darlene",
    phone: "+966 123 45678910",
    services: 5,
    barbers: 3,
  },
  {
    id: "2",
    name: "Theresa Cooper",
    avatar: "https://i.pravatar.cc/80?u=theresa",
    phone: "+966 123 45678910",
    services: 8,
    barbers: 5,
  },
  {
    id: "3",
    name: "Geraldine Phillips",
    avatar: "https://i.pravatar.cc/80?u=geraldine",
    phone: "+966 123 45678910",
    services: 2,
    barbers: 1,
  },
  {
    id: "4",
    name: "Samantha Howard",
    avatar: "https://i.pravatar.cc/80?u=samantha",
    phone: "+966 123 45678910",
    services: 4,
    barbers: 2,
  },
];

export type ReviewDecision = "idle" | "approved" | "rejected";

export type SocialLink = {
  id: string;
  platform: "facebook" | "tiktok" | "whatsapp" | "instagram";
  label: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "fb",
    platform: "facebook",
    label: "Facebook Page",
    url: "https://facebook.com/goldenscissors",
  },
  {
    id: "tt",
    platform: "tiktok",
    label: "Tiktok Page",
    url: "https://tiktok.com/@goldenscissors",
  },
  {
    id: "wa",
    platform: "whatsapp",
    label: "Whatsapp",
    url: "https://whatsapp.com/@goldensciss",
  },
  {
    id: "ig",
    platform: "instagram",
    label: "Instagram Page",
    url: "https://instagram.com/goldenscissors",
  },
];

export type NotificationRow = {
  id: string;
  title: string;
  sendBy: string;
  sendTo: string;
  sendAt: string;
};

export const notifications: NotificationRow[] = [
  {
    id: "1",
    title: "You have a new booking request. Tap to view the details.",
    sendBy: "Ahmed Mohamed",
    sendTo: "Client (Android)",
    sendAt: "10/30/2024",
  },
  {
    id: "2",
    title: "Your booking has been confirmed successfully.",
    sendBy: "Ali Ayman",
    sendTo: "All",
    sendAt: "11/06/2024",
  },
  {
    id: "3",
    title: "You received a new booking request from a customer.",
    sendBy: "Tarek Khaled",
    sendTo: "All",
    sendAt: "11/13/2024",
  },
];

export type ComplaintReport = {
  id: string;
  date: string;
  name: string;
  avatar: string;
  email: string;
  details: string;
};

export const complaintReports: ComplaintReport[] = [
  {
    id: "#29312BA",
    date: "10/16/2024",
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/80?u=darlene",
    email: "darlene@gmail.com",
    details: "Delay in registration",
  },
  {
    id: "#29312BA",
    date: "10/23/2024",
    name: "Theresa Cooper",
    avatar: "https://i.pravatar.cc/80?u=theresa",
    email: "theresa@gmail.com",
    details: "for the additional features",
  },
];

export type ApplicationReport = {
  id: string;
  date: string;
  name: string;
  avatar: string;
  details: string;
  rating: number;
};

export const applicationReports: ApplicationReport[] = [
  {
    id: "#29312BA",
    date: "10/16/2024",
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/80?u=darlene",
    details: "The customer doesn't want to pay",
    rating: 5,
  },
  {
    id: "#29312BA",
    date: "10/23/2024",
    name: "Theresa Cooper",
    avatar: "https://i.pravatar.cc/80?u=theresa",
    details: "for the additional features",
    rating: 4,
  },
  {
    id: "#29312BA",
    date: "11/15/2024",
    name: "Martin Hernandez",
    avatar: "https://i.pravatar.cc/80?u=martin",
    details: "to enhance user experience",
    rating: 2,
  },
];

export const adminProfile = {
  name: "Ahmed Mohamed",
  email: "ahmedmohamed@gmail.com",
  phone: "01024671112",
  avatar: "https://i.pravatar.cc/200?u=ahmed-admin",
};
