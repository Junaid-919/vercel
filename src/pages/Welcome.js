import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Persons Management System</h1>
      <p style={styles.subtitle}>
        Manage and view all registered persons from one place.
      </p>

      <button style={styles.button} onClick={() => navigate("/persons")}>
        View Persons
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#555",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "white",
  },
};

export default Welcome;
