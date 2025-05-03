export const initialIncidents = [
  {
    id: 1,
    title: "Unauthorized Model Access Attempt",
    description: "An external IP attempted to access the AI model API without proper authentication. The attempt was blocked and logged for further review.",
    severity: "High",
    reported_at: "2025-04-10T08:45:00Z"
  },
  {
    id: 2,
    title: "Unexpected Output in Medical Diagnosis",
    description: "The AI system suggested an incorrect diagnosis for a rare disease, which was caught by a human reviewer before reaching the patient.",
    severity: "Medium",
    reported_at: "2025-04-09T16:20:00Z"
  },
  {
    id: 3,
    title: "Delayed Response in Emergency Detection",
    description: "A delay in the AI's response time was observed during a simulated emergency drill, potentially impacting real-time alerts.",
    severity: "High",
    reported_at: "2025-04-08T11:10:00Z"
  },
  {
    id: 4,
    title: "False Positive in Content Moderation",
    description: "The content moderation AI flagged a harmless post as inappropriate, resulting in unnecessary user escalation.",
    severity: "Low",
    reported_at: "2025-04-07T13:55:00Z"
  },
  {
    id: 5,
    title: "Model Drift Detected in Financial Forecasting",
    description: "A monitoring system detected model drift in the financial forecasting AI, prompting a scheduled retraining.",
    severity: "Medium",
    reported_at: "2025-04-06T09:30:00Z"
  }
];

export const addNewIncident = (incidents, newIncident) => {
  const incident = {
    ...newIncident,
    id: incidents.length + 1,
    reported_at: new Date().toISOString()
  };
  return [...incidents, incident];
};