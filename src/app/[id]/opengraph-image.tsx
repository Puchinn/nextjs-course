import {ImageResponse} from "next/og";

import api from "@/api";

export const size = {
  width: 1100,
  height: 630,
};

export default async function Image({params: {id}}: {params: {id: string}}) {
  const restaurant = await api.fetch(id);

  return new ImageResponse(<div>{restaurant.name}</div>, {
    ...size,
  });
}
