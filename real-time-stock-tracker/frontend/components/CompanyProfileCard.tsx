"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Globe,
  MapPin,
  CalendarDays,
  Link as LinkIcon,
} from "lucide-react";

type CompanyProfile = {
  name: string;
  ticker: string;
  logo: string;
  exchange: string;
  ipo?: string;
  industry: string;
  weburl: string;
  country: string;
};

type CompanyProfileCardProps = {
  profile: CompanyProfile;
  peers?: string[];
};

export default function CompanyProfileCard({ profile, peers }: CompanyProfileCardProps) {
  return (
    <div className="bg-white shadow rounded p-6 col-span-full md:col-span-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:divide-x sm:divide-gray-200">
        
        {/* Left: Company name + logo */}
        <div className="sm:pr-6 mb-4 sm:mb-0 flex-1">
        <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{profile.ticker}</p>
        
        {profile.logo && (
            <Image
            src={profile.logo}
            alt={`${profile.name} logo`}
            width={60}
            height={60}
            className="rounded"
            />
        )}
        </div>

        {/* Right: Company info */}
        <div className="sm:pl-6 flex-1">
        <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm text-gray-800">
            <dt className="font-medium text-gray-600">Industry:</dt>
            <dd>{profile.industry}</dd>

            <dt className="font-medium text-gray-600">Country:</dt>
            <dd>{profile.country}</dd>

            <dt className="font-medium text-gray-600">Exchange:</dt>
            <dd>{profile.exchange}</dd>

            <dt className="font-medium text-gray-600">IPO Date:</dt>
            <dd>{profile.ipo || "N/A"}</dd>

            <dt className="font-medium text-gray-600">Website:</dt>
            <dd>
            <a
                href={profile.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                Visit Website
            </a>
            </dd>
        </dl>
        </div>
        </div>

        {/* Peers below */}
        {peers && peers.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Peers:</span>
            {peers.slice(0, 5).map((peer) => (
                <Link
                key={peer}
                href={`/stocks/${peer}`}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200"
                >
                {peer}
                </Link>
            ))}
            </div>
        )}
    </div>
  );
}
