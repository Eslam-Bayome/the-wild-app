import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Cabin from "./../../_components/Cabin";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   // this will wait for the slowest data fetching to end and send all of them once
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  const { name } = cabin;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center  mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
