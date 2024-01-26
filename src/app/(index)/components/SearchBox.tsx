import {redirect} from "next/navigation";

export default function SearchBox() {
  const searchAction = async (formData: FormData) => {
    "use server";
    const query = formData.get("query");

    redirect(`/?q=${query}`);
  };

  return (
    <form action={searchAction} className="mb-4 inline-flex gap-2">
      <input className="px-2" defaultValue="" name="query" />
      <button className="bg-white/20 p-2" type="submit">
        Search
      </button>
    </form>
  );
}
