import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
import { useParams } from "react-router-dom";

function Files() {
  const { uuid: fileId } = useParams();
  const [file, setFile] = useState<{
    name: string;
    content: string;
  }>({
    name: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/file/${fileId}`);
        const fileData = (await response.json()) as {
          name: string;
          content: string;
        };
        setFile(fileData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFileData();
  }, [fileId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <input
        type="text"
        value={file.content}
        onChange={async (e) => {
          setFile({ name: file.name, content: e.target.value });
          await fetch(`${API_BASE_URL}/file/${fileId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: e.target.value }),
          });
        }}
      />
    </>
  );
}

export default Files;
