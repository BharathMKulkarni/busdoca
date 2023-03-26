import { v4 as uuid } from "uuid";

export const clauses = [
  {
    id: uuid(),
    name: "Clause1",
    dynamicFields: [
      { label: "Designation", id: "${Designation}", value: "ASE" },
      { label: "Name", id: "${Name}", value: "Sai" },
      { label: "Salary", id: "${Salary}", value: "1cr" },
      { label: "ManagerName", id: "${ManagerName}", value: "Sairam" },
      {
        label: "StartingDate",
        id: "${StartingDate}",
        value: new Date().toString(),
      },
    ],
    paragraph:
      " Subject: Appointment for post of ${Designation} Dear ${Name}  Commencement of employment. Your employment will be effective, as of ${StartingDate} Job title. Your job title will be ${Designation}, and you will report to ${ManagerName} ... ${Salary} Place of posting ",
  },
  {
    id: uuid(),
    name: "Clause2",
    dynamicFields: [
      { label: "Candidate_name", id: "${Candidate_name}", value: "Shreya" },
      { label: "Companyy_name", id: "${Company_name}", value: "Oracle" },
      { label: "Job_title", id: " ${Job_title}", value: "ASE" },
      {
        label: "Start_date",
        id: "${Start_date}",
        value: new Date().toString(),
      },
    ],
    paragraph:
      " Dear ${Candidate_name},${Company_name} is delighted to offer you the full-time position of ${Job_title} starting from ${Start_date}, upon a successful round of [background check, drug screening, training details, etc]. ",
  },
  {
    id: uuid(),
    name: "Clause3",
    dynamicFields: [
      { label: "Candidate_name", id: "${Candidate_name}", value: "Shreya" },
      { label: "Company_name", id: "${Company_name}", value: "Oracle" },
      { label: "Job_title", id: " ${Job_title}", value: "ASE" },
      {
        label: "Start_date",
        id: "${Start_date}",
        value: new Date().toString(),
      },
    ],
    paragraph:
      " Dear ${Candidate_name},${Company_name} is delighted to offer you the full-time position of ${Job_title} starting from ${Start_date}, upon a successful round of [background check, drug screening, training details, etc]. ",
  },
];