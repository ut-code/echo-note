import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
// import { useParams } from "react-router-dom";

import "./style.css";

function EditPage() {
  //   const { uuid: userId } = useParams();
  const [rawText] = useState<string>("要約される前のデータ。");
  const [summarizedText, setSummarizedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(true);

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

  function switchRecording(recording: boolean) {
    if (recording) {
      // startRecording();
    } else {
      // stopRecording(); : TODO
    }
  }
  function startPlaying(text: string) {
    // TODO: 改善
    // 発言を作成
    const uttr = new SpeechSynthesisUtterance(text);
    // 発言を再生 (発言キューに発言を追加)
    speechSynthesis.speak(uttr);
    speechSynthesis.addEventListener("end", () => setIsPlaying(false));
  }
  function stopPlaying() {
    // TODO
  }

  return (
    <body>
      <div id="sidebar" className="fixed">
        <button
          id="return-button"
          onClick={() => {
            location.href = "./files";
          }}
        >
          <img src="/left-arrow.png" className="icon" />
          戻る
        </button>
        <div
          id="plain-text-textbox"
          className="expect-user-input"
          contentEditable="true"
        >
          plain text should appear here
        </div>
        <button
          id="record-button"
          className="horizontal-center"
          onClick={() => {
            setIsRecording(!isRecording);
            switchRecording(isRecording);
          }}
        >
          {isRecording ? (
            <img src="./playing.png" className="icon" />
          ) : (
            <img src="./record.png" className="icon" />
          )}
          録音
        </button>
      </div>
      <div id="main">
        <div
          id="note-textbox"
          className="expect-user-input"
          contentEditable="true"
        >
          {summarizedText}
        </div>
        <button
          id="play-button"
          className="fixed"
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (isPlaying) {
              startPlaying(summarizedText);
            } else {
              stopPlaying();
            }
          }}
        >
          {isPlaying ? (
            <img src="/play.png" className="icon" />
          ) : (
            <img src="/playing.png" className="icon" />
          )}
          再生
        </button>
      </div>
    </body>
  );
}

export default EditPage;
