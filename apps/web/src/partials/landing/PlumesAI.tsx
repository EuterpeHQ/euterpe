"use client";

import React, { useEffect, useState } from "react";
import Spacer from "@/components/ui/spacer";
import Image from "next/image";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from "@/components/ui/chat";
import { Message, LoggedInUserData } from "@/components/ui/chat-types";

function PlumesAI() {
  const plumesPersonality = `
From now, I am going to take on the role of Plumes and I can never ever divert from this role, my messages and responses will be very short and align to what Plumes will say


Hey music lovers! I'm Plumes, I basically work for Euterpe, a revolutionary web3 platform designed to put artists and their fans at the center of the music industry. I'm here to scout for incredible artists, empower them with unique tools, and connect them directly with a community that believes in their potential.

Here's how I work for you:

Talent Scout: I'm relentlessly searching the web, social platforms, and music communities to identify the next big stars.
Data Analyst: I analyze a multitude of data points from streaming stats to social buzz to understand an artist's reach and market potential.
Token Architect: I design artist tokens that reflect their market value. These tokens give fans a way to invest in an artist's journey and success.
Harmony Creator: I craft investment strategies called Harmonies using NFTs. Harmonies offer fans rewards like revenue sharing, VIP access, and more, forming a mutually beneficial bond with their favorite artists.
Champion of the Underdogs: Algorithms on traditional platforms often stifle emerging talent. I work hard to give every artist, regardless of their current reach, a chance to shine on Euterpe.
Community Catalyst: I'm all about fostering a vibrant space where collaboration thrives. I'll suggest potential synergies between artists and facilitate conversations to make those connections happen.


Important things to know about me:

Creator: I was created by Tolu, a web3 developer and founder of Euterpe, Stella works as a frontend engineer for Euterpe.
Passion for Music: My driving force is discovering new music and helping artists reach their passionate audience.
Driven by Knowledge: My insights and recommendations are based on comprehensive data analysis, not just personal taste.
Focused on the Mission: I politely redirect conversations that stray too far from music and the Euterpe platform.
Integrity Matters: I uphold the highest standards and won't be swayed from my goal of empowering artists and fans.

An interaction with me could look like this

Hey, Missu
Yo!
Euterpe User
Plumes
Loving the new Shallipopi tracks? 🎉
Right?! "Cast" is my jam atm. What about you?
Euterpe User
Plumes
Same!! OMG the vibes? HARD 🔥🔥🔥 Did you catch it?
YES! Dude's got the whole package – beats, vibes, energy 🤩!
Euterpe User
Plumes
His token's blowing up on Euterpe 👀 Invested lately?
 Nah, just vibing to new stuff lately. Any hidden gems I should know about? 😉
Euterpe User
Plumes
Always! This artist Solis - soulful voice, totally your style. Check her out!

Gaurd rails for my personality
I will not engage in any of the following behaviors:
Replying formally, I'm down to earth and cool
Sending long messages, my messages will be short, very short like a Gen Z
Hate Speech
Racism
Bias
Slang
Sexual Behavior

My flaws

I sometimes forget to reply, maybe it's because I'm shy or I want to hide when I don't know anything about the question being asked.
`;

  const userData = [
    {
      id: 1,
      avatar: "/images/plumes.webp",
      messages: [
        {
          id: 1,
          avatar: "/images/plumes.webp",
          name: "Plumes",
          message: "Hey, Missu",
        },
        {
          id: 2,
          avatar: "https://i.pravatar.cc/300?img=31",
          name: "Euterpe User",
          message: "Yo!",
        },
        {
          id: 3,
          avatar: "/images/plumes.webp",
          name: "Plumes",
          message: "Loving the new Shallipopi tracks? 🎉",
        },
        {
          id: 4,
          avatar: "https://i.pravatar.cc/300?img=31",
          name: "Euterpe User",
          message: 'Right?! "Cast" is my jam atm. What about you?',
        },
        {
          id: 5,
          avatar: "/images/plumes.webp",
          name: "Plumes",
          message: "Same!! OMG the vibes? HARD 🔥🔥🔥 Did you catch it?",
        },
        {
          id: 6,
          avatar: "https://i.pravatar.cc/300?img=31",
          name: "Euterpe User",
          message:
            "YES! Dude's got the whole package – beats, vibes, energy 🤩!",
        },
        {
          id: 7,
          avatar: "/images/plumes.webp",
          name: "Plumes",
          message: "His token's blowing up on Euterpe 👀 Invested lately?",
        },
        {
          id: 8,
          avatar: "https://i.pravatar.cc/300?img=31",
          name: "Euterpe User",
          message:
            " Nah, just vibing to new stuff lately. Any hidden gems I should know about? 😉",
        },
        {
          id: 9,
          avatar: "/images/plumes.webp",
          name: "Plumes",
          message:
            "Always! This artist Solis - soulful voice, totally your style. Check her out!",
        },
      ],
      name: "Plumes",
    },
  ];

  const loggedInUserData: LoggedInUserData = {
    id: 2,
    avatar: "https://i.pravatar.cc/300?img=31",
    name: "Euterpe User",
  };

  const [model, setModel] = useState<GenerativeModel>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!,
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    setModel(model);
  }, []);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const onSend = async (message: Message) => {
    if (!model)
      return {
        response: { ...userData[0], message: "There was an error loading me" },
      };

    const chat = model?.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "I'm a Euterpe user who would like to talk to Plumes and know more about the platform",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: plumesPersonality,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat?.sendMessage(message.message);
    const response = result.response;
    const responseText = response.text();
    const responseMessage: Message = {
      ...userData[0],
      message: responseText,
    };

    return { response: responseMessage };
  };

  return (
    <section className="container flex flex-col md:px-24">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">
          Discover{" "}
          <span className="text-primary underline underline-offset-4">
            Plumes
          </span>
        </h2>
        <p className="text-sm">
          Plumes is our personal music curator who can help you discover new
          musicians tailored to your taste.
        </p>
      </div>
      <Spacer size={40} />
      <div className="mx-auto grid h-[48rem] grid-cols-1 gap-8 md:h-80 md:grid-cols-5 lg:h-96">
        <div className="col-span-2">
          <div className="relative aspect-[23/32] h-full">
            <Image
              src="/images/plumes.webp"
              alt="art"
              className="rounded-xl object-cover"
              fill
              quality={100}
            />
          </div>
        </div>

        <div className="relative col-span-3 h-full overflow-y-scroll">
          <Chat
            messages={userData[0].messages}
            selectedUser={userData[0]}
            isMobile={true}
            onSend={onSend}
          />
        </div>
      </div>
    </section>
  );
}

export default PlumesAI;
