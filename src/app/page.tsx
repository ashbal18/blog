import Card from "@/components/card";
import Wrapper from "@/components/wrapper";
import { IBlog } from "@/type";

export default async function Home() {
  const res = await fetch(
    "https://jazzygirl-us.backendless.app/api/data/Blogs?loadRelations=author",
    { cache: "no-store" } // Tambahkan ini agar tidak menggunakan cache lama
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data: IBlog[] = await res.json();

  return (
    <div>
      <Wrapper>
        <div className="grid w-full p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
          {data.map((item, idx) => (
            <div key={idx}>
              <Card
                category={item.category}
                title={item.title}
                thumbnail={item.thumbnail || "/default-thumbnail.jpg"} 
                name={item.author?.name || "Unknown"} 
                email={item.author?.email || "Unknown"} 
                objectId={item.objectId}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
