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
      <div className="bg-card relative w-[700px]  p-6  rounded-xl">
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
        <div className="">
          <section className='flex justify-between  items-center'>

          <div className='mt-4 w-[50%] h-[350px]'>
         <Image
            src={HarmonyImage}
            className="h-full w-full cursor-pointer rounded-xl object-cover object-bottom transition duration-200 hover:scale-105 hover:opacity-80"
            alt="harmony image"
            aria-hidden="true"
            width={300}
            height={200}
            placeholder="blur"
            quality={100}
          />
          </div>
          <aside className='mt-8 rounded-md w-[48%] p-2'>
            <p className='text-primary font-bold text-lg'>Ensemble #{29 + index} Harmony</p>
            <p>Discover a unique musical experience with this exclusive harmony. 
            <br/>
             
              This piece blends soothing melodies and intricate arrangements, capturing the essence of artistry. 
              <br/>
              <br/>
              Claim it now and immerse yourself in a captivating soundscape.</p>
              <button className='mt-4 p-2 rounded-lg bg-primary text-black font-semibold'>Claim Harmony</button>
          </aside>
            </section>
          <div className="mt-4 text-white">
            <h3 className="text-lg text-white">Ensemble #{29 + index}</h3>
            <p className="mt-2">A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album.</p>
            <p className="mt-2">ETP: 0.041</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
