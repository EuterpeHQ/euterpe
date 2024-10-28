import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { IconType } from "react-icons";

interface CommunityCardProps {
  icon: IconType;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function CommunityCard({
  icon: Icon,
  title,
  description,
  link,
  linkText,
}: CommunityCardProps) {
  return (
    <div
      className={`flex cursor-pointer gap-x-6 rounded-lg border border-border bg-opacity-10 p-4 transition-all duration-150 hover:bg-surfaceVariant`}
    >
      <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      <div>
        <h3 className="text-base font-semibold leading-7">{title}</h3>
        <p className="mt-2 leading-7">{description}</p>
        <p className="mt-4">
          <a
            href={link}
            className="text-sm font-semibold leading-6 text-primary transition-all duration-150"
          >
            {linkText} <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Join Our Community
        </h2>
        <p className="mt-2 text-lg leading-8 text-muted-foreground">
          Connect with us on different platforms for support and updates.
        </p>
      </div>
      <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        <CommunityCard
          icon={FaXTwitter}
          title="Follow us on Twitter"
          description="Stay informed with our latest news and updates on Twitter."
          link="#"
          linkText="Follow on Twitter"
        />
        <CommunityCard
          icon={FaDiscord}
          title="Join our Discord"
          description="Engage with the community and get support on our Discord server."
          link="#"
          linkText="Join Discord"
        />
        <CommunityCard
          icon={FaTelegramPlane}
          title="Join us on Telegram"
          description="Get real-time updates and connect with our community on Telegram."
          link="#"
          linkText="Join Telegram"
        />
        <CommunityCard
          icon={FaWhatsapp}
          title="Chat with us on WhatsApp"
          description="Reach out for quick support and connect with us on WhatsApp."
          link="#"
          linkText="Join WhatsApp"
        />
      </div>
    </div>
  );
}
