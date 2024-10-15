// src/app/trial-or-master-user/page.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TryUpgradePlan() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>
        <p className="mb-4 text-center">
          Thank you for registering! Would you like to continue as a trial user or upgrade to a master user?
        </p>

        <div className="flex flex-col space-y-4">
          {/* Button to continue as a trial user */}
          <Link href="/dashboard" className="w-full">
            <Button className="hover:bg-blue-700 hover:text-white text-black bg-transparent py-2 rounded-md w-full">
              Continue as Trial User
            </Button>
          </Link>

          {/* Button to upgrade to a master user */}
          <Link href="/plan/payment" className="w-full">
            <Button className="bg-green-500 hover:bg-green-700 text-white py-2 rounded-md w-full">
              Upgrade to Master User
            </Button>
          </Link>

          {/* Link to products section */}
          <Link href="/#products" className="w-full text-center underline text-blue-400">
              View Our Products
          </Link>
        </div>
      </Card>
    </div>
  );
}
