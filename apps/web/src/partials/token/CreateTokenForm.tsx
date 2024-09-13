import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { config } from "@/providers/web3";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getAccount } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useToast } from "@/components/ui/use-toast";
import { BiError } from "react-icons/bi";
import { LuLoader2 } from "react-icons/lu";
import confetti from "canvas-confetti";

function CreateArtistToken({ onTokenCreated }: { onTokenCreated: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "1000000",
    artist: "",
    spotify: "",
  });
  const [opendialog, setOpendialog] = useState(false);

  const { isConnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { toast } = useToast();

  useEffect(() => {
    if (connectModalOpen) {
      setOpendialog(false);
    }
  }, [connectModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const wagmiContractConfig = {
    address: process.env
      .NEXT_PUBLIC_ARTIST_TOKEN_SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: artistTokenFactoryAbi,
  };
  const {
    data: hash,
    error: buyError,
    isPending,
    writeContract,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isConnected) {
      const { connector } = getAccount(config);
      writeContract?.({
        ...wagmiContractConfig,
        functionName: "createToken",
        connector,
        args: [
          formData.name,
          formData.symbol,
          BigInt(formData.supply),
          formData.artist,
          formData.spotify,
        ],
      });
    } else {
      openConnectModal?.();
    }
  };

  useEffect(() => {
    if (isConfirming) {
      toast({
        title: "Transaction Pending",
        description:
          "Your transaction has been submitted. Waiting for confirmation...",
      });
    }

    if (isConfirmed) {
      toast({
        title: "Transaction Confirmed",
        description: "Your transaction has been successfully isConfirmed.",
      });
      const colors1 = ["##B8FF5B", "##FFA41B"];
      const colors2 = ["##B45946", "##9747FF"];
      fireConfetti(colors1);
      fireConfetti(colors2);

      onTokenCreated();
    }

    if (buyError) {
      toast({
        title: "Transaction Error",
        description: "An error occurred during the transaction.",
      });
    }
  }, [isConfirming, isConfirmed, buyError]);

  useEffect(() => {
    if (isConfirmed && !opendialog) {
      setFormData({
        name: "",
        symbol: "",
        supply: "1000000",
        artist: "",
        spotify: "",
      });
    }
  }, [opendialog, isConfirmed]);

  /* Known Issue: Confetti effect only uses the first two colors from the array */
  function fireConfetti(colors: string[]) {
    const end = Date.now() + 4 * 1000;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }

  return (
    <div className="px-8 py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-[0.04em]">
          Create your token
        </h2>
        <p className="text-sm text-[#D0D0D0]">
          Launch your token today, Build fan connections, and grow your music
          journey with them.
        </p>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        {buyError && (
          <div className="mb-5 flex items-center rounded-md bg-orange-600/10 p-4 text-sm font-medium text-orange-600/60">
            <BiError className="mr-2 h-4 w-4 text-orange-600/50" />
            {/* @ts-expect-error */}
            {buyError.shortMessage}
          </div>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col gap-2.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <Label htmlFor="symbol">Ticker</Label>
            <Input
              id="symbol"
              name="symbol"
              placeholder="Enter ticker"
              type="text"
              value={formData.symbol}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <Label htmlFor="text">Spotify Link</Label>
            <Input
              id="spotify"
              name="spotify"
              placeholder="Enter spotify link"
              type="text"
              value={formData.spotify}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-8 w-full"
          disabled={isPending || isConfirming}
        >
          {isConnected ? (
            isPending ? (
              <div className="inline-flex items-center gap-2">
                <LuLoader2 className="h-4 w-4 animate-spin" /> Confirm In Your
                Wallet...
              </div>
            ) : isConfirming ? (
              <div className="inline-flex items-center gap-2">
                <LuLoader2 className="h-4 w-4 animate-spin" /> Launching...
              </div>
            ) : isConfirmed ? (
              <div className="inline-flex items-center gap-2">
                <LuLoader2 className="h-4 w-4 animate-spin" />
                Launching...
              </div>
            ) : (
              "Create Token"
            )
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateArtistToken;
