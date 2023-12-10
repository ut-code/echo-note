import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
// import { useParams } from "react-router-dom";

function EditPage() {
  //   const { uuid: userId } = useParams();
  const [rawText] = useState<string>("要約される前のデータ。");
  const [summarizedText, setSummarizedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummarizedText = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/summarize-text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rawText }),
        });
        const summarizedText = (await response.json()) as {
          summarizedText: string;
        };
        setSummarizedText(summarizedText.summarizedText);
      } catch (error) {
        console.error("Error fetching summarized text data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummarizedText();
  }, [rawText]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Summarized Text</h1>
      {summarizedText ? (
        <div>
          <p>Summarized Text: {summarizedText}</p>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}

export default EditPage;
