import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
// import { useParams } from "react-router-dom";

function EditPage() {
  //   const { uuid: userId } = useParams();
  const rawText = useState<string>("要約される前のデータ。");
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
    <body>
      <div id="sidebar" className="fixed">
        <button id="return-button">
          <img src="./src/left-arrow.png" className="icon" />
          戻る
        </button>
        <div
          id="plain-text-textbox"
          className="expect-user-input"
          contentEditable="true"
        >
          plain text should appear here
        </div>
        <button id="record-button" className="horizontal-center">
          <img src="./src/record.png" className="icon" />
          <img src="./src/playing.png" className="icon" hidden />
          録音
        </button>
      </div>
      <div id="main">
        <button id="settings-button" className="fixed">
          <img src="./src/settings.png" className="icon" />
          設定
        </button>
        <div
          id="note-textbox"
          className="expect-user-input"
          contentEditable="true"
        >
          note sample
        </div>
        <button id="play-button" className="fixed">
          <img src="./src/play.png" className="icon" />
          <img src="./src/playing.png" className="icon" hidden />
          再生
        </button>
      </div>
    </body>
  );
}

export default EditPage;
