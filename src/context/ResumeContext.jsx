import React, { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

const initialData = {
  generalInfo: {
    name: "John Smith",
    email: "johnsmith@outlook.com",
    phone: "(250) - 281 - 8743",
    location: "Vancouver, Canada",
  },
  educations: [
    {
      school: "University of British Columbia",
      field: "Bachelor of Science",
      location: "Vancouver, Canada",
      startDate: "Sept 2002",
      endDate: "July 2007",
    },
    {
      school: "Kitsilano High School",
      field: "",
      location: "Vancouver, Canada",
      startDate: "Sept 1998",
      endDate: "July 2002",
    },
  ],
  experiences: [
    {
      company: "Company Name",
      role: "Manager",
      location: "Vancouver, Canada",
      startDate: "Sept 2008",
      endDate: "July 2011",
      description:
        "Let me know if you’d like to abstract the name into a nested object (person.name.first, person.name.last) or make this a controlled form component.",
    },
    {
      company: "Company Name",
      role: "Manager",
      location: "Vancouver, Canada",
      startDate: "Sept 2011",
      endDate: "July 2015",
      description:
        "Let me know if you’d like to abstract the name into a nested object (person.name.first, person.name.last) or make this a controlled form component.",
    },
  ],
  projects: [
    {
      name: "Project One",
      description:
        "Let me know if you’d like to abstract the name into a nested object (person.name.first, person.name.last) or make this a controlled form component.",
    },
    {
      name: "Project Two",
      description:
        "Let me know if you’d like to abstract the name into a nested object (person.name.first, person.name.last) or make this a controlled form component.",
    },
  ],
  skills: ["HTML", "CSS", "Javascript", "React.js", "next.js", "Sanity CMS"],
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    const stored = localStorage.getItem("resumeData");
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resume));
  }, [resume]);

  // Updaters for each section
  const updateGeneralInfo = (info) =>
    setResume((r) => ({ ...r, generalInfo: info }));
  const updateEducations = (educations) =>
    setResume((r) => ({ ...r, educations }));
  const updateExperiences = (experiences) =>
    setResume((r) => ({ ...r, experiences }));
  const updateProjects = (projects) => setResume((r) => ({ ...r, projects }));
  const updateSkills = (skills) => setResume((r) => ({ ...r, skills }));

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateGeneralInfo,
        updateEducations,
        updateExperiences,
        updateProjects,
        updateSkills,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
