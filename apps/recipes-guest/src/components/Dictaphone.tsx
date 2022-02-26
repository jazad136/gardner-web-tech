import React, { useEffect, useMemo, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime";

interface DictaphoneProps {
  setSpeechRecognitionSupported: React.Dispatch<React.SetStateAction<boolean>>;
  isEnabled: boolean;
  handleYouTubeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleIngredientsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dictaphone = ({
  setSpeechRecognitionSupported,
  isEnabled,
  handleYouTubeOpen,
  handleIngredientsOpen,
}: DictaphoneProps) => {
  const scrollHeight = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.innerHeight / 2;
    }
    return 0;
  }, []);

  const commands = [
    {
      command: "Scroll up",
      callback: () => window.scrollBy(0, -scrollHeight),
    },
    {
      command: "Scroll down",
      callback: () => window.scrollBy(0, scrollHeight),
    },
    {
      command: ["Close videos", "Hide videos"],
      callback: () => handleYouTubeOpen(false),
    },
    {
      command: ["Open videos", "Show videos"],
      callback: () => handleYouTubeOpen(true),
    },
    {
      command: ["Close ingredients", "Hide ingredients"],
      callback: () => handleIngredientsOpen(false),
    },
    {
      command: ["Open ingredients", "Show ingredients"],
      callback: () => handleIngredientsOpen(true),
    },
    {
      command: ["reset", "clear"],
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const {
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (isEnabled) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  }, [isEnabled, resetTranscript]);

  useEffect(() => {
    const isSupported =
      browserSupportsSpeechRecognition && isMicrophoneAvailable;

    setSpeechRecognitionSupported(isSupported);
  }, [
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    setSpeechRecognitionSupported,
  ]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      resetTranscript();
    };
  }, [resetTranscript]);

  return <></>;
};

export default Dictaphone;
