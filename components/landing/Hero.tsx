import { SignUpButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-20">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative w-full z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>AI-Powered Dental Assistant</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    Your dental
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    questions
                  </span>
                  <br />
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    answered instantly
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl font-medium leading-relaxed">
                  Chat with our AI dental assitant for instant advice, book
                  smart appointments and get personlized recommendations.
                  Available 24/7
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button size="lg">
                    <MicIcon className="size-5 mr-2" />
                    Try Voice Agent
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline">
                    <CalendarIcon className="size-5 mr-2" />
                    Book Appointment
                  </Button>
                </SignUpButton>
              </div>

              {/* Testimonials */}
              <div className="pt-8">
                <div className="flex items-center gap-6">
                  {/* Avatars */}
                  <div className="flex -space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                      alt="Jessica Davis"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                      alt="Sam Miller"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                      alt="Anna Lopez"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                      alt="Mike Rodriguez"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                      alt="Katie Lee"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                    />
                  </div>

                  {/* Rating and Stats */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-foreground font-bold">
                        4.9/5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Truste by{" "}
                      <span className="text-foreground font-semibold">
                        1200+ patients
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative lg:pl-8">
              {/* Gradient Orbs */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-primary/15 to-primary/5 rounded-full blur-2xl" />

              <Image
                src="/hero.png"
                alt="dental-robot"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
