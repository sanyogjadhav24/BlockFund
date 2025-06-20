// components/VoiceAgent.jsx
import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const VoiceAgent = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const listenTimeoutRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });

    if (listenTimeoutRef.current) clearTimeout(listenTimeoutRef.current);
    listenTimeoutRef.current = setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 10000); // Auto stop after 10s
  };

  const triggerReactInputChange = (element, value) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      element.constructor.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(element, value);

    const event = new Event("input", { bubbles: true });
    element.dispatchEvent(event);
  };

  const handleCommand = (command) => {
    console.log("🎤 Command:", command);

    if (command.includes("profile")) {
      speak("Opening profile");
      navigate("/profile");
    } else if (command.includes("create campaign")) {
      speak("Creating new campaign");
      navigate("/create-campaign");
    } else if (command.includes("home")) {
      speak("Going to home page");
      navigate("/");
    } else if (command.includes("type name")) {
      const name = command.replace("type name", "").trim() || "John Doe";
      const input = document.querySelector('input[name="name"]');
      if (input) {
        input.focus();
        triggerReactInputChange(input, name);
        speak(`Typed name ${name}`);
      }
    } else if (command.includes("set title")) {
      const title = command.replace("set title to", "").trim() || "My Campaign";
      const input = document.querySelector('input[name="title"]');
      if (input) {
        input.focus();
        triggerReactInputChange(input, title);
        speak(`Set title to ${title}`);
      }
    } else if (command.includes("write story")) {
      const story = command.replace("write story", "").trim() || "Helping orphans build a better future.";
      const textarea = document.querySelector('textarea[name="description"]');
      if (textarea) {
        textarea.focus();
        triggerReactInputChange(textarea, story);
        speak("Typed your story");
      }
    }
    
    else if (command.includes("search campaign")) {
  const keyword = command.replace("search campaign", "").trim();
  if (window.searchCampaigns) {
    window.searchCampaigns(keyword);
    speak(`Searching for campaign titled ${keyword}`);
  } else {
    speak("Sorry, search is not available here.");
  }
}
else if (command.includes("reload") || command.includes("refresh")) {
  speak("Reloading the page");
  window.location.reload();
}
    
    else {
      speak("Sorry, I did not understand the command.");
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      handleCommand(transcript.toLowerCase().trim());
      resetTranscript();

      responseTimeoutRef.current = setTimeout(() => {
        startListening();
      }, 1500);
    }
  }, [listening]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      <button
        onClick={startListening}
        className="p-4 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition duration-200"
      >
        🎙️
      </button>
      <p className="text-xs text-gray-300 mt-2 max-w-[220px] text-center">
        {listening ? "🎧 Listening..." : transcript}
      </p>
      
    </div>
  );
};

export default VoiceAgent;
