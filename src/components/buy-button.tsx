"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@/services/analytics";

interface BuyButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: "default" | "xl";
}

export const BuyButton = ({
  children,
  href: initialHref = "https://ronka.dev/qcwz",
  size = "default",
}: BuyButtonProps) => {
  const searchParams = useSearchParams();

  const initialUrl = new URL(initialHref);
  const mergedParams = new URLSearchParams(initialUrl.search);

  // Append current page's search parameters
  // useSearchParams returns a read-only object, so iterate if necessary
  const currentPageParams = new URLSearchParams(searchParams.toString());
  currentPageParams.forEach((value, key) => {
    mergedParams.append(key, value); // append will add new param, even if key exists
  });

  let finalHref = initialUrl.pathname;
  if (mergedParams.toString()) {
    finalHref += `?${mergedParams.toString()}`;
  }
  // Prepend origin if initialHref was a full URL
  if (initialUrl.origin && initialUrl.origin !== "null" && initialUrl.protocol) {
     // Check if initialUrl.origin is not the "null" string literal and protocol exists
    finalHref = `${initialUrl.origin}${finalHref}`;
  }


  const baseClasses =
    "inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-base font-medium text-white shadow-lg transition-all duration-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 hover:animate-none relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

  const sizeClasses = size === "xl" ? "h-16 px-12 text-lg" : "h-12 px-8";

  const handleClick = () => {
    track("add_to_cart", {
      value: 198,
      currency: "ILS",
      content_ids: ["wc_post_id_819"],
      content_name: "מפצחים את קוד הראיון: המדריך המלא להצלחה בראיונות טכניים",
      content_category: "כללי",
      content_type: "product",
      source: "high-tech-guide",
    });
  };

  return (
    <Link
      href={finalHref}
      className={`${baseClasses} ${sizeClasses}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
