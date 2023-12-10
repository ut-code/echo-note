import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
// import { useParams } from "react-router-dom";

import "./style.css";

function EditPage() {
  //   const { uuid: userId } = useParams();
  const [rawText, setRawText] = useState<string>("要約される前のデータ。");
  const [summarizedText, setSummarizedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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

  // Web Speech APIの音声認識オブジェクトをチェック
  var SpeechRecognition: any = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // 継続的認識と暫定結果の設定
  recognition.continuous = true;
  recognition.interimResults = true;

  // 言語の設定（ここでは日本語に設定）
  recognition.lang = "ja-JP";

  // 音声認識イベントの設定
  recognition.onresult = function (event: any) {
    var transcript = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setRawText(transcript);
  };

  function switchRecording(recording: boolean) {
    if (recording) {
      recognition.start();
    } else {
      recognition.stop();
    }
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
        <textarea
          id="plain-text-textbox"
          className="expect-user-input"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />
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
          録音{isRecording && <span>中...</span>}
        </button>
      </div>
      <div id="main">
        <textarea
          id="note-textbox"
          className="expect-user-input"
          value={summarizedText}
          onInput={(e) => setSummarizedText(e.target.value)}
        />
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
