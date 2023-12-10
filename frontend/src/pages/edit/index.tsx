import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
// import { useParams } from "react-router-dom";

import "./style.css";
const RANDOM_LONG_SENTENCES: string = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
She learned that water bottles are no longer just to hold liquid, but they're also status symbols.
Check back tomorrow; I will see if the book has arrived.
The old rusted farm equipment surrounded the house predicting its demise.
The spa attendant applied the deep cleaning mask to the gentleman’s back.
My Mum tries to be cool by saying that she likes all the same things that I do.
The fish listened intently to what the frogs had to say.
She wanted to be rescued, but only if it was Tuesday and raining.
The white water rafting trip was suddenly halted by the unexpected brick wall.
Tomatoes make great weapons when water balloons aren’t available.
The tour bus was packed with teenage girls heading toward their next adventure.
The complicated school homework left the parents trying to help their kids quite confused.
They ran around the corner to find that they had traveled back in time.
Before he moved to the inner city, he had always believed that security complexes were psychological.
While all her friends were positive that Mary had a sixth sense, she knew she actually had a seventh sense.
The knives were out and she was sharpening hers.
She can live her life however she wants as long as she listens to what I have to say.
Nobody questions who built the pyramids in Mexico.
Blue sounded too cold at the time and yet it seemed to work for gin.
I'd always thought lightning was something only I could see.
If I don’t like something, 'll stay away from it.
The sign said there was road work ahead so he decided to speed up.
She always speaks to him in a loud voice.
Dan took the deep dive down the rabbit hole.
The wake behind the boat told of the past while the open sea for told life in the unknown future.
I am counting my calories, yet I really want dessert.
There aren't enough towels in the world to stop the sewage flowing from his mouth.
I am happy to take your donation; any amount will be greatly appreciated.
It was the best sandcastle he had ever seen.
The door slammed on the watermelon.
We need to rent a room for our party.
Everybody should read Chaucer to improve their everyday vocabulary.
One small action would change her life, but whether it would be for better or for worse was yet to be determined.
The heat
Behind the window was a reflection that only instilled fear.
He was willing to find the depths of the rabbit hole in order to be with her.
They finished building the road they knew no one would ever use.
Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn.
It didn't and they don't recommend anyone else do it eithe
Iguanas were falling out of the trees.
When I cook spaghetti, I like to boil it a few minutes past al dente so the noodles are super slippery.
They called out her name time and again, but were met with nothing but silence.
Garlic ice-cream was her favorite.
He found the end of the rainbow and was surprised at what he found there.
The crowd yells and screams for more memes.
It's never comforting to know that your fate depends on something as unpredictable as the popping of corn.
It didn't take long for Gary to detect the robbers were amateurs.
She insisted that cleaning out your closet was the key to good driving.
He kept telling himself that one day it would all somehow make sense.
Dolores wouldn't have eaten the meal if she had known what it actually was.
I was very proud of my nickname throughout high school but today- I couldn't be any different to what my nickname was.
He turned in the research paper on Friday; otherwise, he would have not passed the class.`;

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

  return (
    <body>
      <div id="sidebar" className="fixed">
        <button
          id="return-button"
          onClick={() => {
            location.href = "./files";
          }}
        >
          <img src="left-arrow.png" className="icon" />
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
          <img src="/record.png" className="icon" />
          <img src="/playing.png" className="icon" hidden />
          録音
        </button>
      </div>
      <div id="main">
        <button id="settings-button" className="fixed">
          <img src="/settings.png" className="icon" />
          設定
        </button>
        <div
          id="note-textbox"
          className="expect-user-input"
          contentEditable="true"
        >
          {RANDOM_LONG_SENTENCES}
        </div>
        <button id="play-button" className="fixed">
          <img src="/play.png" className="icon" />
          <img src="/playing.png" className="icon" hidden />
          再生
        </button>
      </div>
    </body>
  );
}

export default EditPage;
