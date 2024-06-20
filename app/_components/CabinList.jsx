// import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabines;

  if (filter === "all") displayedCabines = cabins;

  if (filter === "small")
    displayedCabines = cabins.filter((cabin) => cabin.maxCapacity < 3);

  if (filter === "medium")
    displayedCabines = cabins.filter(
      (cabin) => cabin.maxCapacity < 5 && cabin.maxCapacity >= 3
    );

  if (filter === "large")
    displayedCabines = cabins.filter((cabin) => cabin.maxCapacity >= 5);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabines.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
