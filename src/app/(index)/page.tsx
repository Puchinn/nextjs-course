import api from "@/api";

import RestaurantCard from "./components/RestaurantCard/index";
import SearchBox from "./components/SearchBox";

export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  const restaurants = await api.search(searchParams.q);

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <SearchBox />
      {restaurants.length === 0 && "not founded"}
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
      })}
    </section>
  );
}
