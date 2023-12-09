import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
import { useParams } from "react-router-dom";

function UserInfo() {
  const { uuid: userId } = useParams();
  const [user, setUser] = useState<{
    username: string;
    name: string;
    password: string;
  }>({
    username: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        const userData = (await response.json()) as {
          username: string;
          name: string;
          password: string;
        };
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default UserInfo;
