"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ArtistToken } from "@/entities";
import { TokensDataTable } from "@/partials/token/TokensDataTable";
import { getArtistTokens } from "@/blockchain/token.interaction";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { CiStar } from "react-icons/ci";
import { Line } from 'react-chartjs-2';  
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';  // Import required components from Chart.js

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


export default function Page() {
  const { toast } = useToast();
  const columns: ColumnDef<ArtistToken>[] = [
    {
      id: 'icon',
      // Reduce padding for this column
    header: () => <div className=""></div>,
    cell: () => <div className="">
      <CiStar className="text-gray-500 hover:text-black cursor-pointer" size={20} />
    </div>,
    },
    {
      id: "rowNumber",
      // Reduce padding for this column
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div className="">Artist</div>,
      //cell: ({ getValue }) =>  getValue(),
      cell: ({ getValue }) => <div className="">{getValue() as   string}</div>,  
      filterFn: 'includesString', // Enable string filtering for the 'Artist' column
    },
    {
      accessorKey: "symbol",
      header: "Ticker",
      cell: ({ getValue }) => getValue(),
      filterFn: 'includesString',
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <button
          onClick={() => handleButtonClick(row.original)}
          className="px-3 py-[1px] border border-primary  text-primary rounded-[10px]"
        >
          Buy
        </button>
      ),
    },
    {
      accessorKey: "value",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("value"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
   
        return <div className=" font-medium">{formatted}</div>
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "totalSupply",
      header: "Market Cap",
      cell: ({ row }) => {
        const market = parseFloat(row.getValue("totalSupply"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(market)
   
        return <div className=" font-medium">{formatted}</div>
      },
      filterFn: 'includesString',
    },
    {
      // New column for the mini chart using Chart.js
      id: 'graph',
      header: "Last 7 Days",
      cell: ({ row }) => {
        const chartData = {
          labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
          datasets: [
            {
              label: 'Price Trend',
              data: row.original.priceTrend || [10, 12, 8, 15, 9, 13, 10],  // Replace this with actual trend data
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
              fill: false,
              tension: 0.3,  // Smoothness of the line
            },
          ],
        };

        const chartOptions = {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { display: false }, // Hide the X-axis
            y: { display: false }, // Hide the Y-axis
          },
        };

        return (
          <div style={{ width: '100px', height: '50px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        );
      },
    },
  ];

  const { isPending, error, data } = useQuery({
    queryKey: ["getArtistTokens"],
    queryFn: getArtistTokens,
  });

  const handleButtonClick = (token: ArtistToken) => {
    alert(`You clicked on ${token.name}`);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to Load Data",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
       

        {isPending ? (
          <div>Loading...</div>
        ) : (
          <TokensDataTable columns={columns} data={data ?? []} />
        )}
      </div>
    </>
  );
}
