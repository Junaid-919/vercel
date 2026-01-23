import React, { useEffect, useState, useCallback } from "react";

const API_URL = "https://backend-vercel-beryl.vercel.app/api/get_person_data/";
const PAGE_SIZE = 10;

const PersonsList = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch persons");

      const data = await res.json();
      setPersons(data);
      setLastUpdated(new Date());
      setCurrentPage(1); // reset pagination on refresh
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + auto refresh every 5 minutes
  useEffect(() => {
    fetchPersons();
    const interval = setInterval(fetchPersons, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchPersons]);

  // Pagination logic
  const totalPages = Math.ceil(persons.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = persons.slice(startIndex, startIndex + PAGE_SIZE);

  if (loading) return <div style={styles.center}>Loading persons...</div>;
  if (error) return <div style={{ ...styles.center, color: "red" }}>{error}</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Persons</h2>
            {lastUpdated && (
              <p style={styles.lastUpdated}>
                Last refreshed: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>

          <button
            style={styles.refreshBtn}
            onClick={fetchPersons}
            title="Refresh"
          >
            🔄
          </button>
        </div>

        {/* Table */}
        {persons.length === 0 ? (
          <p style={styles.empty}>No persons found.</p>
        ) : (
          <>
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
                {currentData.map((person, index) => (
                  <tr
                    key={person.id}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#f9fafb" : "#ffffff",
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  style={styles.pageBtn}
                >
                  Prev
                </button>

                <span style={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  style={styles.pageBtn}
                >
                  Next
                </button>
              </div>
            )}
          </>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  lastUpdated: {
    fontSize: "0.85rem",
    color: "#6b7280",
    marginTop: "4px",
  },
  refreshBtn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    fontSize: "1.2rem",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.3)",
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
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },
  pageBtn: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  },
  pageInfo: {
    fontSize: "0.9rem",
    color: "#374151",
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
