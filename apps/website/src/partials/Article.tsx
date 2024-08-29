import React from "react";
import { type Article } from "@/types/entities";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

export default function Article(props: Article) {
  return (
    <div className="flex flex-col px-10">
      <div className="flex py-16">
        <div className="mr-16 flex w-1/2 items-center">
          <div className="flex max-w-[30rem] flex-col items-start justify-center gap-16">
            <h1 className="font-aeonik text-7xl font-medium leading-[1.2] tracking-[-0.04em]">
              <Balancer>{props.title}</Balancer>
            </h1>
            <div className="flex w-full">
              <div className="flex w-full flex-col gap-1">
                <p className="font-azeret text-[0.688rem] tracking-[-0.06em]">
                  Written by
                </p>
                <p className="font-aeonik font-medium tracking-[-0.04em]">
                  {props.author}
                </p>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="font-azeret text-[0.688rem] tracking-[-0.06em]">
                  Published
                </p>
                <p className="font-aeonik font-medium tracking-[-0.04em]">
                  {props.date}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-[645/367] w-1/2 overflow-hidden rounded-lg">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-8 py-16 font-aeonik">
        <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
          In an era where traditional methods of artistic support are rapidly
          evolving, the rise of decentralized finance (DeFi) presents a
          groundbreaking opportunity to empower artists in ways previously
          unimaginable. At the forefront of this transformation is our platform,
          which is dedicated to empowering 5,000 artists by harnessing the
          innovative power of tokenization to connect them more deeply with
          their fans.
        </p>
        <div>
          <h2 className="text-xl font-semibold">
            The Vision: Redefining Artistic Empowerment
          </h2>
          <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
            For too long, artists have been reliant on conventional channels for
            revenue, often facing barriers that limit their creative freedom and
            financial growth. With our platform, we aim to disrupt this status
            quo by providing artists with a new paradigm—one where they have
            full autonomy over their creative output and the financial rewards
            that come with it.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">The Power of Tokenization</h2>
          <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
            Our platform enables artists to issue their own tokens, representing
            a piece of their creative journey. These tokens are more than just a
            form of digital currency; they are a direct link between the artist
            and their fans. Fans can purchase these tokens to show their
            support, effectively becoming stakeholders in the artist&apos;s
            success. This not only provides artists with immediate financial
            backing but also fosters a stronger, more engaged community around
            their work.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            Building a Supportive Community
          </h2>
          <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
            By empowering artists to connect with their audience in this
            revolutionary way, we are fostering a new type of relationship—one
            built on shared values, mutual success, and active participation.
            Fans are no longer passive consumers but active contributors to the
            artist&apos;s career, with a vested interest in their growth. This
            community-driven approach amplifies the artist&apos;s reach and
            provides a sustainable model for long-term success.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {" "}
            Resources and Tools for Success
          </h2>
          <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
            Our commitment to empowering 5,000 artists goes beyond tokenization.
            We provide a suite of resources and tools designed to help artists
            thrive in the digital age. From educational materials on how to
            navigate the world of DeFi to marketing support that helps artists
            promote their tokens, our platform is a comprehensive ecosystem for
            artistic success. We believe that by equipping artists with the
            right tools, we can help them unlock new revenue streams, increase
            their visibility, and gain more control over their creative
            endeavors.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {" "}
            A New Chapter in Artistic Support
          </h2>
          <p className="font-aeonik text-base tracking-[-0.04em] text-muted-foreground">
            The DeFi revolution is just beginning, and our platform is at the
            heart of this new chapter in artistic support. Whether you&apos;re
            an emerging artist looking to break into the industry or an
            established name seeking innovative ways to engage with your
            audience, our platform is designed to help you achieve your goals.
            By empowering 5,000 artists through tokenization and community
            building, we are redefining what it means to support and be
            supported in the creative world. Join us as we lead the charge in
            transforming the relationship between artists and their fans.
            Together, we can create a future where creativity is not only
            celebrated but also directly rewarded in a way that benefits
            everyone involved.
          </p>
        </div>
      </div>
    </div>
  );
}
