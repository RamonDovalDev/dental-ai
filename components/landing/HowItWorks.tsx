import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const HowItWorks = () => {
  return (
    <section className="relative max-w-7xl mx-auto py-32 px-6 z-10 outline-hidden">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-clur-sm mb-6">
          <ZapIcon className="size-4 text-primary" />
          <span className="text-sm text-primary font-bold">Simple Process</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Three steps to
          </span>
          <br />
          <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            better dental health
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Our streamlined process makes dental care accessible, convenient, and
          stress-free for everyone
        </p>
      </div>

      {/* Steps */}
      <div className="relatiue">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 hidden lg:block" />

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Step 1 */}
          <div className="realtive group">
            <div className="relative bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-linear-to-r from-primary to-primary/80 flex items-center justify-center rounded-full text-sm text-primary-foreground font-bold shadow-lg">
                1
              </div>
              <div className="w-20 h-20 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/audio.png"
                  alt="audio-icon"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>
              <h3 className="text-2xl text-center font-bold mb-4">
                Ask Questions
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Chat with our AI Assistant about any dental concerns. Get
                instant answers about symptoms, treatment and oral dental health
                tips.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  24/7 available
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Instant Response
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="realtive group">
            <div className="relative bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-linear-to-r from-primary to-primary/80 flex items-center justify-center rounded-full text-sm text-primary-foreground font-bold shadow-lg">
                2
              </div>
              <div className="w-20 h-20 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/brain.png"
                  alt="brain-icon"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>
              <h3 className="text-2xl text-center font-bold mb-4">
                Get expert Advice
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Receive personalized recommendations based on thousands of
                dental cases. Our AI provides professional-grade insights.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  AI-Powered
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Personalized
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="realtive group">
            <div className="relative bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-linear-to-r from-primary to-primary/80 flex items-center justify-center rounded-full text-sm text-primary-foreground font-bold shadow-lg">
                3
              </div>
              <div className="w-20 h-20 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/calendar.png"
                  alt="calendar-icon"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>
              <h3 className="text-2xl text-center font-bold mb-4">
                Book & Get Care
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Schedule with verified dentists and receive comprehensive
                follow-up care. Track your progress seamlessly.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Verified Doctors
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Follow-up Care
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <SignUpButton mode="modal">
          <Button size="lg">
            <ArrowRightIcon className="mr-2 size-5" />
            Get started now
          </Button>
        </SignUpButton>
      </div>
    </section>
  );
};

export default HowItWorks;
