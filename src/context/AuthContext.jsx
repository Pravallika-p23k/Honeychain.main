import React, { createContext, useContext, useState } from 'react';
import profileImage from "../assets/profile.jpg";
const AuthContext = createContext();

const MOCK_USERS = {
  beekeeper: {
    id: "RBH-4821",
    name: "Ramesh Kumar",
    email: "ramesh.beekeeping@gov.in",
    role: "beekeeper",
    roleTitle: "Certified Rural Beekeeper",
    cluster: "Andhra Pradesh - Chittoor Cluster",
    location: "Madanapalle Village, Chittoor, AP",
    hivesCount: 12,
    regNo: "KVIC-RBH-2024-8841",
    phone: "+91 98765 43210",
    avatar: profileImage,
  },
  gov_officer: {
    id: "KVIC-GOV-904",
    name: "Dr. Anand Sharma",
    email: "anand.sharma@kvic.gov.in",
    role: "gov_officer",
    roleTitle: "Senior Quality Assurance Officer",
    department: "Khadi & Village Industries Commission (KVIC)",
    jurisdiction: "Southern Zone (AP, TS, KA)",
    badgeNo: "GOV-IN-9042",
    phone: "+91 94110 12345",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  buyer: {
    id: "PROC-BUY-108",
    name: "Vikram Malhotra",
    company: "Apex Organic Honey Exports Ltd.",
    email: "procurement@apexorganics.in",
    role: "buyer",
    roleTitle: "Commercial Buyer & Processor",
    location: "Hyderabad Industrial Park, TS",
    licenseNo: "FSSAI-10019042000123",
    phone: "+91 98100 55443",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USERS.beekeeper);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password, role = 'beekeeper') => {
    const selectedUser = MOCK_USERS[role] || MOCK_USERS.beekeeper;
    setUser({ ...selectedUser, email: email || selectedUser.email });
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (role) => {
    if (MOCK_USERS[role]) {
      setUser(MOCK_USERS[role]);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
