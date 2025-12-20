import { Home, BedDouble, Wrench, Bell, User } from "lucide-react";

export const NAV_LINKS = {
  common: [
    { label: "Home", path: "/", icon: Home },
  ],

  student: [
    { label: "My Room", path: "/student/room", icon: BedDouble },
    { label: "Maintenance", path: "/student/maintenance", icon: Wrench },
    { label: "Announcements", path: "/announcements", icon: Bell },
  ],

  staff: [
    { label: "Assigned Issues", path: "/staff/issues", icon: Wrench },
  ],

  warden: [
    { label: "Students", path: "/warden/students", icon: User },
    { label: "Reports", path: "/warden/reports", icon: Bell },
  ],
};
