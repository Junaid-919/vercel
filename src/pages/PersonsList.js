import React, { useEffect, useState } from "react";

const PersonsList = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://backend-vercel-1cqc7cnq8-shaik-junaids-projects-35758ac6.vercel.app/api/get_person_data/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch persons");
        return res.json();
      })
      .then((data) => {
        setPersons(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.center}>Loading persons...</div>;
  if (error) return <div style={{ ...styles.center, color: "red" }}>{error}</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Persons</h2>

        {persons.length === 0 ? (
          <p style={styles.empty}>No persons found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person, index) => (
                <tr
                  key={person.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                  }}
                >
                  <td style={styles.td}>{person.id}</td>
                  <td style={styles.td}>{person.name}</td>
                  <td style={styles.td}>{person.age}</td>
                  <td style={styles.td}>{person.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px",
  },
  card: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "500",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
  },
  empty: {
    padding: "20px",
    textAlign: "center",
    color: "#6b7280",
  },
};

export default PersonsList;
