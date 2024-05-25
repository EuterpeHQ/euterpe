import React from 'react';
import Image from 'next/image';
import HarmonyImage from "@/assets/images/lady-donli.jpeg";

interface CollectionModalProps {
  index: number;
  onClose: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ index, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-4">
          {/* <Image
            src="https://github.com/mwororokevin/nft-preview-card-component/blob/master/images/image-avatar.png?raw=true"
            className="rounded-xl object-cover object-bottom"
            alt=""
            width={400}
            height={400}
          /> */}
         <Image
            src={HarmonyImage}
            className="h-full w-full cursor-pointer rounded-xl object-cover object-bottom transition duration-200 hover:scale-105 hover:opacity-80"
            alt=""
            aria-hidden="true"
            fill
            placeholder="blur"
            quality={100}
            width={400}
            height={400}
          />
          <div className="mt-4 text-gray-800">
            <h3 className="text-lg">Ensemble #{29 + index}</h3>
            <p className="mt-2">A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album.</p>
            <p className="mt-2">ETP: 0.041</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
