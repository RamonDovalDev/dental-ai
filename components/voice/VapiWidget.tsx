"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { vapi } from "@/lib/vapi/vapi";
import { Button } from "../ui/button";

type Message = {
  content: string;
  role: string;
};

// Check if an unknown data is an object
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

// Validate transcription event before using it
const isFinalTranscript = (
  message: unknown,
): message is {
  type: "transcript";
  transcriptType: "final";
  transcript: string;
  role: string;
} => {
  if (!isRecord(message)) return false;

  return (
    message.type === "transcript" &&
    message.transcriptType === "final" &&
    typeof message.transcript === "string" &&
    typeof message.role === "string"
  );
};

const VapiWidget = () => {
  const { user, isLoaded } = useUser();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Avoid initiating or terminating calls through concurrent actions
  const callActiveRef = useRef(false);
  const connectingRef = useRef(false);

  // Sync the references with the state
  useEffect(() => {
    callActiveRef.current = callActive;
  }, [callActive]);

  useEffect(() => {
    connectingRef.current = connecting;
  }, [connecting]);

  // Auto-Scroll to the last message
  useEffect(() => {
    const container = messageContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, callEnded]);

  // Configurate Vapi events
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const handleMessage = (message: unknown) => {
      if (!isFinalTranscript(message)) return;

      const newMessage: Message = {
        content: message.transcript,
        role: message.role,
      };

      setMessages((prev) => [...prev, newMessage]);
    };

    const handleError = (error: unknown) => {
      console.error("Vapi Error:", error);
      setConnecting(false);
      setCallActive(false);
      setIsSpeaking(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // Eliminamos los listeners cuando el componente se desmonta.
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  // Start or stop the conversation

  const toggleCall = useCallback(async () => {
    if (connectingRef.current) return;

    if (callActiveRef.current) {
      try {
        await vapi.stop();
      } catch (error: unknown) {
        console.error("Failed to stop call:", error);
      }

      return;
    }

    const assistantID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

    if (!assistantID) {
      console.error("Assistant is not configured with an ID");
      return;
    }

    setConnecting(true);
    connectingRef.current = true;
    setMessages([]);
    setCallEnded(false);

    try {
      await vapi.start(assistantID);
    } catch (error: unknown) {
      console.error("Failed to start Vapi call:", error);

      setConnecting(false);
      connectingRef.current = false;
      setCallActive(false);
      callActiveRef.current = false;
      setIsSpeaking(false);
    }
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="max-w-5xl mx-auto flex flex-col pb-20 px-4 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono">
          <span>Talk to your </span>
          <span className="text-primary uppercase">AI Dental Assistant</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Have a voice conversation with our AI Assistant for denta advice and
          guidance
        </p>
      </div>

      {/* Conversation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Assitant Card */}
        <Card className="relative bg-card/90 backdrop-blur-sm border border-border overflow-hidden">
          <div className="relative aspect-video flex flex-col items-center justify-center p-6">
            {/* Voice Animation */}
            <div
              className={`absolute inset-0 ${isSpeaking ? "opacity-30" : "opacity-0"} transition-opacity duration-300`}
            >
              <div className="absolute left-0 right-0 top/1/2 -translate-y-1/2 flex items-center justify-center h-20">
                {[0, 1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-16 mx-1 bg-primary rounded-full ${isSpeaking ? "animate-sound-wave" : ""}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      height: isSpeaking ? `${30 + index * 10}%` : "5%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${isSpeaking ? "animate-pulse" : ""}`}
              />

              <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/5" />

                <Image
                  src="/logo.png"
                  alt="logo"
                  width={48}
                  height={48}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">Dental AI</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Dental Assistant
            </p>

            {/* Voice State */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                isSpeaking ? "border-primary" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />

              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                    ? "Listening..."
                    : callEnded
                      ? "Call ended"
                      : connecting
                        ? "Connecting..."
                        : "Waiting..."}
              </span>
            </div>
          </div>
        </Card>

        {/* User Card */}
        <Card className="relative bg-card/90 backdrop-blur-sm border border-border overflow-hidden">
          <div className="relative aspect-video flex flex-col items-center justify-center p-6">
            <div className="relative size-32 mb-4">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="user"
                  width={128}
                  height={128}
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <div className="size-full rounded-full bg-muted flex items-center justify-center text-3xl font-bold">
                  {user?.firstName?.charAt(0) ?? "U"}
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-foreground">You</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user
                ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                : "Guest"}
            </p>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border mt-4">
              <div className="w-2 h-2 rounded-full bg-muted" />
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Transcription */}
      {(messages.length > 0 || callEnded) && (
        <div
          ref={messageContainerRef}
          className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
        >
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className="message-item animate-in fade-in duration-300"
              >
                <div className="font-semibold text-xs text-muted-foreground mb-1">
                  {message.role === "assistant" ? "Dental-AI" : "You"}
                </div>
                <p className="text-foreground">{message.content}</p>
              </div>
            ))}

            {callEnded && (
              <div className="message-item animate-in fade-in duration-300">
                <div className="font-semibold text-xs text-primary mb-1">
                  System
                </div>

                <p className="text-foreground">
                  Call ended. Thank you for using Dental-AI!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 text-xl rounded-3xl cursor-pointer ${
            callActive
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          } text-white relative`}
          onClick={toggleCall}
          disabled={connecting}
        >
          {connecting && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75" />
          )}

          <span>
            {callActive
              ? "End Call"
              : connecting
                ? "Connecting..."
                : callEnded
                  ? "Call Again"
                  : "Start Call"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default VapiWidget;
