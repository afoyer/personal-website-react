import React from "react";

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About This Boilerplate</h1>
      <p>
        This is a React boilerplate designed to get you started quickly with
        modern web development.
      </p>

      <div className="tech-stack">
        <h2>Technology Stack</h2>
        <ul>
          <li>
            <strong>Frontend:</strong> React 19 with TypeScript
          </li>
          <li>
            <strong>Build Tool:</strong> Vite for fast development
          </li>
          <li>
            <strong>Authentication:</strong> AWS Amplify
          </li>
          <li>
            <strong>State Management:</strong> Jotai
          </li>
          <li>
            <strong>Routing:</strong> React Router
          </li>
          <li>
            <strong>Styling:</strong> CSS with modern design
          </li>
        </ul>
      </div>

      <div className="getting-started">
        <h2>Quick Start</h2>
        <ol>
          <li>Clone this repository</li>
          <li>
            Install dependencies with <code>npm install</code>
          </li>
          <li>Configure AWS Amplify</li>
          <li>
            Start developing with <code>npm run dev</code>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default About;
