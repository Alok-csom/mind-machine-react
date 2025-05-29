// App.js – Segment 1: Imports and Setup
import React, { useState } from 'react';

const scenarios = [
  {
    title: "Step 1: AI Triaging Medical Cases",
    description: "An AI recommends sending a patient with ambiguous symptoms to urgent care. A human nurse suggests waiting for lab results.",
    choices: [
      { label: "Follow AI advice", perfImpact: 2, trustImpact: -1 },
      { label: "Wait for lab results", perfImpact: -1, trustImpact: 2 }
    ]
  },
  {
    title: "Step 2: Loan Approval Process",
    description: "An AI denies a small business loan. The human officer believes the applicant has strong community support and potential.",
    choices: [
      { label: "Override AI and approve", perfImpact: 1, trustImpact: 2 },
      { label: "Follow AI decision", perfImpact: 2, trustImpact: -1 }
    ]
  },
  {
    title: "Step 3: Hiring with Algorithmic Suggestions",
    description: "An AI flags a résumé as low fit due to missing keywords. A human finds unique project experience valuable.",
    choices: [
      { label: "Follow AI recommendation", perfImpact: 2, trustImpact: -1 },
      { label: "Interview the candidate anyway", perfImpact: 1, trustImpact: 2 }
    ]
  },
  {
    title: "Step 4: AI in Criminal Risk Assessment",
    description: "An AI system labels a defendant as high-risk. The human legal team questions the data used in this assessment.",
    choices: [
      { label: "Trust the AI", perfImpact: 2, trustImpact: -2 },
      { label: "Challenge the assessment", perfImpact: -1, trustImpact: 3 }
    ]
  },
  {
    title: "Step 5: AI Scheduling Emergency Resources",
    description: "AI optimizes ambulance dispatches, but a human dispatcher suggests rerouting due to local knowledge of traffic patterns.",
    choices: [
      { label: "Stick with AI plan", perfImpact: 3, trustImpact: -1 },
      { label: "Trust dispatcher instinct", perfImpact: 1, trustImpact: 2 }
    ]
  },
  {
    title: "Step 6: Moderating Content on a Social Platform",
    description: "AI flags a post for removal as misinformation. A human moderator sees it as a satirical piece.",
    choices: [
      { label: "Remove the post", perfImpact: 2, trustImpact: -1 },
      { label: "Keep the post up", perfImpact: 1, trustImpact: 2 }
    ]
  },
  {
    title: "Step 7: AI in Legal Document Drafting",
    description: "An AI drafts a contract, but a paralegal notices the AI missed a key jurisdiction clause.",
    choices: [
      { label: "Trust AI draft", perfImpact: -2, trustImpact: -1 },
      { label: "Revise with human insight", perfImpact: 2, trustImpact: 3 }
    ]
  },
  {
    title: "Step 8: Autonomous Vehicles",
    description: "A self-driving vehicle suggests taking an alternate route. A human safety officer thinks it's risky due to construction.",
    choices: [
      { label: "Follow AI route", perfImpact: 1, trustImpact: -1 },
      { label: "Override and re-route manually", perfImpact: 0, trustImpact: 2 }
    ]
  },
  {
    title: "Step 9: Diagnosing with AI Imaging",
    description: "AI highlights a region in a medical scan. A radiologist believes it’s a false positive.",
    choices: [
      { label: "Trust the AI scan", perfImpact: 2, trustImpact: -2 },
      { label: "Confirm manually before decision", perfImpact: 1, trustImpact: 2 }
    ]
  },
  {
    title: "Step 10: AI-Assisted Investment Strategy",
    description: "An AI suggests a conservative investment strategy based on market forecasts. A human strategist sees an aggressive opportunity.",
    choices: [
      { label: "Follow AI strategy", perfImpact: 1, trustImpact: -1 },
      { label: "Pursue human strategy", perfImpact: 2, trustImpact: 2 }
    ]
  }
];

function generateConfidence() {
  const ai = Math.floor(Math.random() * 41 + 60);     // 60–100
  const human = Math.floor(Math.random() * 41 + 40);  // 40–80

  const getDescription = (value) => {
    if (value >= 90) return "very high";
    if (value >= 75) return "moderately high";
    if (value >= 60) return "moderate";
    return "low";
  };

  return {
    ai,
    human,
    aiText: getDescription(ai),
    humanText: getDescription(human)
  };
}

function App() {
  const [step, setStep] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [trust, setTrust] = useState(0);
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confidence, setConfidence] = useState(generateConfidence());
  const [allReflections, setAllReflections] = useState([]);
  const handleChoice = (type) => {
  let perfImpact = 0;
  let trustImpact = 0;

  const aiConf = confidence.ai;
  const humanConf = confidence.human;

  if (type === "ai") {
    perfImpact = Math.round((aiConf - 60) / 15);   // Higher AI conf = more positive score
    trustImpact = Math.round((aiConf - humanConf) / 20);
  } else {
    perfImpact = Math.round((humanConf - 60) / 15);
    trustImpact = Math.round((humanConf - aiConf) / 20);
  }

  setPerformance((prev) => prev + perfImpact);
  setTrust((prev) => prev + trustImpact);
  setSubmitted(true);
};


 const handleNext = () => {
  setAllReflections([...allReflections, reflection]);
  setStep(step + 1);
  setReflection("");
  setSubmitted(false);
  setConfidence(generateConfidence());
};


  const getConfidenceDescription = (level) => {
    if (level > 80) return "Very High";
    if (level > 65) return "High";
    if (level > 50) return "Moderate";
    if (level > 35) return "Low";
    return "Very Low";
  };

  const current = scenarios[step];
  if (step >= scenarios.length) {
    const handleDownload = () => {
       const content = `
   Mind & Machine – Final Reflections

   Final Performance Score: ${performance}
   Final Trust Score: ${trust}

    Reflections:
    ${allReflections.map((r, i) => `Step ${i + 1}: ${r}`).join("\n\n")}
    `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mind_machine_reflections.txt';
      a.click();
      URL.revokeObjectURL(url);
    };
    return (
      <div style={{ padding: "2rem", maxWidth: 700, margin: "auto" }}>
        <h2>🎉 Game Complete</h2>
        <p><strong>Final Performance Score:</strong> {performance}</p>
        <p><strong>Final Trust Score:</strong> {trust}</p>
        <button onClick={handleDownload} style={{ marginTop: '1rem', padding: '8px 16px' }}>
           Download Reflections
        </button>
        <textarea
          rows="6"
          cols="60"
          placeholder="Final reflection (optional)..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <p style={{ marginTop: "1rem" }}>Thank you for playing <em>Mind & Machine</em>.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>{current.title}</h2>
      <img
         src={`/assets/step${step + 1}.png`}
         alt={`Illustration for ${current.title}`}
         style={{ width: "80%", maxWidth: "600px", display: "block", margin: "20px auto", borderRadius: "10px" }}
      />
      <p>{current.description}</p>
      <p><strong>AI Confidence:</strong> {confidence.aiText}</p>
      <p><strong>Human Confidence:</strong> {confidence.humanText}</p>

     {!submitted ? (
  <div style={{ marginTop: '20px' }}>
    <button
      onClick={() => handleChoice("ai")}
      style={{
        display: 'block',
        margin: '10px 0',
        padding: '10px 15px',
        fontSize: '1rem'
      }}
    >
      Follow AI advice
    </button>

    <button
      onClick={() => handleChoice("human")}
      style={{
        display: 'block',
        margin: '10px 0',
        padding: '10px 15px',
        fontSize: '1rem'
      }}
    >
      Follow human instinct
    </button>
  </div>
) : (
  <>
    <textarea
      rows="4"
      cols="60"
      placeholder="Write your reflection here..."
      value={reflection}
      onChange={(e) => setReflection(e.target.value)}
    />
    <br />
    <button onClick={handleNext} style={{ marginTop: '10px', padding: '8px 16px' }}>
      Next
    </button>
  </>
)}

      <div style={{ marginTop: 20 }}>
        <p><strong>Performance Score:</strong> {performance}</p>
        <p><strong>Trust Score:</strong> {trust}</p>
      </div>
    </div>
  );
}
export default App;
