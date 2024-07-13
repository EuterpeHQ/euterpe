import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
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
import { CgSpinner } from "react-icons/cg";
import Balancer from "react-wrap-balancer";
import Spacer from "@/components/ui/spacer";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

function CreateArtistToken() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    artist: "",
    spotify: "",
  });
  const [hasViewedCompletedTransaction, setHasViewedCompletedTransaction] =
    useState(false);
  const [opendialog, setOpendialog] = useState(false);

  const { isConnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { toast } = useToast();

  // const handleDialog = (value: React.SetStateAction<boolean>) => {
  //   if (connectModalOpen) {
  //     setOpendialog(true);
  //   } else {
  //     setOpendialog(value);
  //   }
  // };
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
      if (!hasViewedCompletedTransaction && isConfirmed) {
        window.open(
          `https://sepolia.arbiscan.io/tx/${hash}`,
          "_blank",
          "noopener,noreferrer",
        );
        setHasViewedCompletedTransaction(true);
      } else {
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
      }
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
        description: "Your transaction has been successfully confirmed.",
      });
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
        supply: "",
        artist: "",
        spotify: "",
      });
    }
  }, [opendialog, isConfirmed]);

  return (
    <div className="mb-6 flex h-1/2 w-full max-w-[1500px] flex-col items-center justify-center gap-4">
      <Spacer size={96} />
      <Image height={88} width={88} src="/icons/token.png" alt="token" />
      <h2 className="font-semibold leading-tight text-muted-foreground">
        Launch your artist token
      </h2>
      <p className="-mt-2 max-w-md text-center text-sm leading-snug text-muted-foreground">
        <Balancer>
          Gain independence and earn directly through your fans with your own
          artist token.
        </Balancer>
      </p>
      <Dialog open={opendialog} onOpenChange={setOpendialog}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2">
            <HiOutlineRocketLaunch className="h-4 w-4" />
            Launch Token
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Token</DialogTitle>
            <DialogDescription>
              <form className="my-8" onSubmit={handleSubmit}>
                <div></div>
                {buyError && (
                  <div className="mx-auto mb-4 h-32 max-w-md overflow-y-scroll break-words rounded-lg bg-card p-4 text-red-500">
                    {buyError.message}
                  </div>
                )}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="name">Token Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter name of Token"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </LabelInputContainer>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <LabelInputContainer>
                    <Label htmlFor="symbol">Token Symbol</Label>
                    <Input
                      id="symbol"
                      name="symbol"
                      placeholder="ART"
                      type="text"
                      value={formData.symbol}
                      onChange={handleChange}
                      required
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="supply">Initial Supply</Label>
                    <Input
                      id="supply"
                      name="supply"
                      placeholder="21000000"
                      type="number"
                      value={formData.supply}
                      onChange={handleChange}
                      required
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="text">Spotify Link</Label>
                  <Input
                    id="spotify"
                    name="spotify"
                    placeholder="Enter your Spotify link"
                    type="text"
                    value={formData.spotify}
                    onChange={handleChange}
                    required
                  />
                </LabelInputContainer>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="w-full py-2 text-white"
                  disabled={isPending || isConfirming}
                >
                  {isConnected ? (
                    isPending ? (
                      <div className="inline-flex items-center gap-4">
                        <CgSpinner className="h-4 w-4 animate-spin" /> Confirm
                        In Your Wallet...
                      </div>
                    ) : isConfirming ? (
                      <div className="inline-flex items-center gap-4">
                        <CgSpinner className="h-4 w-4 animate-spin" />{" "}
                        Submitting...
                      </div>
                    ) : !hasViewedCompletedTransaction && isConfirmed ? (
                      <div className="inline-flex items-center gap-4">
                        View Transaction
                      </div>
                    ) : (
                      "Create Token"
                    )
                  ) : (
                    "Connect Wallet"
                  )}
                  <BottomGradient />
                </Button>
                {/* <button
                          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                          type="submit"
                        
                          Create
                          <BottomGradient />
                        </button> */}
                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                <p className="text-center text-xs">
                  Support for liquidity pools coming soon 🚀
                </p>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default CreateArtistToken;
