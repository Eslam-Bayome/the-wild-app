"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const Filter = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    // we set in the url search param  something called capacity with the value of filter but it
    // it change it intenally only it dosnt navigate to it we need a replace fn called router
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter={"small"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={"medium"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;6 guests
      </Button>
      <Button
        filter={"large"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        7&mdash;12 guests
      </Button>
    </div>
  );
};

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => {
        handleFilter(filter);
      }}
      className={`${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      } px-5 py-2 hover:bg-primary-700`}
    >
      {children}
    </button>
  );
}
