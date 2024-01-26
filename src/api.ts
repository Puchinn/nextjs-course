interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: number;
  ratings: number;
}

const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0AdQALQUCN74z-A1i_ZABs8JVqqPVcj-4KjmtVLfZO6vj8eChgkv7xjiB5P-q0kp5wNaevdSBlL_b/pub?output=csv";
const api = {
  list: async (): Promise<Restaurant[]> => {
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(url)
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    // Lo retornamos
    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    const restaurants = await api.list();
    const restaurant = restaurants.find((rest) => rest.id === id);

    if (restaurant) {
      return restaurant;
    } else {
      throw new Error("no restaurant finded");
    }
  },
  search: async (query: string): Promise<Restaurant[]> => {
    // Obtenemos los restaurantes
    const results = await api.list();

    if (!query) return results;

    // Los retornamos
    return results.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase()),
    );
  },
};

export default api;
