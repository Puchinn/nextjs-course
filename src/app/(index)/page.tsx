import Link from "next/link";

import api from "@/api";

import SearchBox from "./components/SearchBox";

export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  const restaurants = await api.search(searchParams.q);

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <SearchBox />
      {restaurants.length === 0 && "not founded"}
      {restaurants.map((restaurant) => {
        return (
          <Link key={restaurant.id} href={`/${restaurant.id}`} prefetch={false}>
            <img
              alt={restaurant.name}
              className="mb-3 h-[300px] w-full object-cover"
              src={restaurant.image}
            />
            <h2 className="inline-flex gap-2 text-lg font-bold">
              <span>{restaurant.name}</span>
              <small className="inline-flex gap-1">
                <span>⭐</span>
                <span>{restaurant.score}</span>
                <span className="font-normal opacity-75">({restaurant.ratings})</span>
              </small>
            </h2>
            <p className="opacity-90">{restaurant.description}</p>
          </Link>
        );
      })}
    </section>
  );
}