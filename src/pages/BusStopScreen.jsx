import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BusStopScreen() {
  const { bus_stop_number } = useParams();

  const [busStop, setBusStop] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("the bus stop number")
    console.log("is = "+JSON.stringify(bus_stop_number))
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.VITE_API_URL}/api/busstops/number/${bus_stop_number}/`
      );

      const data = await response.json();
      setBusStop(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bus_stop_number]);

  if (loading) return <h3>Loading...</h3>;
  if (!busStop) return <h3>No data found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bus Stop Details</h2>

      <p><strong>Bus Stop Number:</strong> {busStop.bus_stop_number}</p>
      <p><strong>Bus Stop Name:</strong> {busStop.bus_stop_name}</p>

      <button onClick={fetchData} style={{ marginBottom: "20px" }}>
        Refresh
      </button>

      <h3>Bus Services</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Service Number</th>
            <th>Arrival Time</th>
            <th>Next Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {busStop.bussservice?.map((service) => (
            <tr key={service.id}>
              <td>{service.service_number}</td>
              <td>{service.arrival_time}</td>
              <td>{service.next_arrival_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusStopScreen;
