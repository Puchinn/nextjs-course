"use client";

import type {Restaurant} from "@/types";

import {useState, useEffect} from "react";
import dynamic from "next/dynamic";

type Id = string;

function FavoriteButton({restaurant}: {restaurant: Restaurant}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const favourites: string | null = window.localStorage.getItem("favorites");

  const favouritesArray: Id[] = favourites ? (JSON.parse(favourites) as Id[]) : [];

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (isFavourite) {
      window.localStorage.setItem(
        "favorites",
        JSON.stringify(favouritesArray.filter((f) => f !== restaurant.id)),
      );
    } else {
      window.localStorage.setItem("favorites", JSON.stringify([...favouritesArray, restaurant.id]));
    }
  };

  useEffect(() => {
    const consult = window.localStorage.getItem("favorites");

    if (consult) {
      const favourites: Id[] = JSON.parse(consult) as Id[];

      setIsFavourite(favourites.includes(restaurant.id));
    }
  }, [restaurant.id]);

  return (
    <button
      className={`text-xl text-red-500 ${isFavourite ? "opacity-100" : "opacity-20"}`}
      type="button"
      onClick={toggleFavourite}
    >
      ♥
    </button>
  );
}

const DynamicFavoriteButton = dynamic(async () => FavoriteButton, {ssr: false});

export default DynamicFavoriteButton;
