/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import dynamic from 'next/dynamic';
import HomePages from "./components";
import TaskForm from "./components/Form";
import TaskList from "./components/List";
import { Suspense, useEffect, useState } from 'react';
import { useLaunchParams } from "@telegram-apps/sdk-react";

const TaskBoardClient = dynamic(() => Promise.resolve(TaskBoard), {
  ssr: false
});

function TaskBoard() {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const launchParams = useLaunchParams();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (launchParams?.startParam) {
          const encodedGroupId = launchParams.startParam;
          try {
            const decodedGroupId = atob(encodedGroupId);
            console.log("Decoded Group ID:", decodedGroupId);
            setGroupId(decodedGroupId);
          } catch (error) {
            console.error("Error decoding group ID:", error);
            setError("Invalid group ID format");
          }
        } else {
          console.log("No start_param available");
          setError("No group ID provided");
        }
      } catch (error) {
        console.error("Error in initializeComponent:", error);
        setError("An error occurred while initializing the component");
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!groupId) {
    return <div className="p-8">Please provide a valid group ID</div>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8">
      <header className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Hello!</h1>
        <h1 className="text-2xl font-bold text-[#737373]">Welcome to the Mini Apps</h1>
      </header>

      <main className="flex flex-col gap-8">
        <TaskForm groupId={groupId} />
        <TaskList groupId={groupId} />
      </main>

      <footer className="flex justify-center text-sm text-gray-500">
        Telegram Mini Apps
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <TaskBoardClient />
    </Suspense>
  );
}