export const causesData = {
  1: {
    name: "Local Food Bank",
    subtitle: "Fighting Hunger in Our Community",
    description: "We are dedicated to eliminating food insecurity in our local community by providing fresh, nutritious food to families in need. Through our network of volunteers and partners, we distribute thousands of meals each week.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 10, description: "Provides meals for a family of four" },
      { amount: 25, description: "Stocks a local pantry for a week" },
      { amount: 50, description: "Feeds 20 children through our school program" },
      { amount: 100, description: "Supplies a month of groceries for two families" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    ],
    relatedOrganizations: [
      { name: "Community Kitchen", logo: "/placeholder.svg" },
      { name: "Meals on Wheels", logo: "/placeholder.svg" },
      { name: "Food Recovery Network", logo: "/placeholder.svg" },
    ],
  },
  2: {
    name: "City Youth Programs",
    subtitle: "Empowering Tomorrow's Leaders",
    description: "Our youth programs provide safe spaces and enriching activities for young people in our city. Through education, mentorship, and creative expression, we help youth develop the skills they need to succeed.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 15, description: "Provides art supplies for one student" },
      { amount: 30, description: "Funds a week of after-school programs" },
      { amount: 75, description: "Sponsors a youth leadership workshop" },
      { amount: 150, description: "Enables a summer camp experience" },
    ],
    images: [
      "https://images.unsplash.com/photo-1587729927069-dda05d2d7a3e",
      "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f",
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643",
    ],
    relatedOrganizations: [
      { name: "Teen Center", logo: "/placeholder.svg" },
      { name: "Arts for Youth", logo: "/placeholder.svg" },
      { name: "Mentorship Alliance", logo: "/placeholder.svg" },
    ],
  },
  3: {
    name: "Community Garden",
    subtitle: "Growing Together",
    description: "Our community garden initiative transforms unused urban spaces into vibrant gardens that provide fresh produce and educational opportunities for local residents.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 20, description: "Plants a new garden bed" },
      { amount: 40, description: "Provides tools for volunteers" },
      { amount: 60, description: "Funds educational workshops" },
      { amount: 100, description: "Establishes a new garden site" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    ],
    relatedOrganizations: [
      { name: "Urban Farmers", logo: "/placeholder.svg" },
      { name: "Seed Bank", logo: "/placeholder.svg" },
      { name: "Green Education", logo: "/placeholder.svg" },
    ],
  },
  4: {
    name: "Interfaith Housing",
    subtitle: "Building Homes, Building Hope",
    description: "We bring together faith communities to build and renovate affordable housing for families in need, creating stable homes and stronger communities.",
    monthlyReports: [
      { month: "June 2024", url: "#" },
      { month: "May 2024", url: "#" },
      { month: "April 2024", url: "#" },
    ],
    impactAmounts: [
      { amount: 25, description: "Provides building materials" },
      { amount: 50, description: "Funds home repairs" },
      { amount: 100, description: "Supports housing assistance" },
      { amount: 200, description: "Contributes to new home construction" },
    ],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    ],
    relatedOrganizations: [
      { name: "Faith Builders", logo: "/placeholder.svg" },
      { name: "Home Hope", logo: "/placeholder.svg" },
      { name: "Community Housing", logo: "/placeholder.svg" },
    ],
  },
  // Add more causes here (5-12) following the same pattern
};

export type CauseData = typeof causesData[keyof typeof causesData];