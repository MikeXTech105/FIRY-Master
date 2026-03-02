import { useEffect, useState } from "react";
import { getHealthStatus } from "./health.service";

const HealthPage = () => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await getHealthStatus();
        setStatus(data);
      } catch {
        setError("Failed to connect to API");
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>API Status</h2>
      <p>{status}</p>
    </div>
  );
};

export default HealthPage;