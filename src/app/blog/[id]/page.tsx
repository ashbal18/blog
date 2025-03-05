import { IBlog } from "@/type";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<{ title: string; openGraph: { images: string[] } }> {
  const { id } = await params;
  const res = await fetch(
    `https://jazzygirl-us.backendless.app/api/data/Blogs/${id}?loadRelations=author`
  );
  const data: IBlog = await res.json();

  return {
    title: data.title,
    openGraph: {
      images: [data.thumbnail],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const res = await fetch(
    `https://jazzygirl-us.backendless.app/api/data/Blogs/${id}?loadRelations=author`
  );
  const data: IBlog = await res.json();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-cover bg-center p-6 md:p-12 gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/3 w-full flex md:block justify-center md:justify-start mb-6 md:mb-0">
          <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg flex md:flex-col items-center gap-4">
            <button className="text-white bg-green-600 py-2 px-4 rounded-lg">
              <a href="/">Kembali</a>
            </button>

            <p className="text-gray-700 font-semibold text-lg">Bagikan</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=%22https://www.facebook.com/sharer/sharer.php?u=%22}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000/blog/A7BFABF2-F733-491D-B42E-5D479D91F99D`}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={`https://www.twitter.com/intent/tweet?url=http://localhost:3000/blog/A7BFABF2-F733-491D-B42E-5D479D91F99D`}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://wa.me/?text=http://localhost:3000/blog/A7BFABF2-F733-491D-B42E-5D479D91F99D`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 px-6 md:px-10">
          <p className="text-base font-semibold text-green-600">
            {data.category}
          </p>
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
            {data.title}
          </h1>
          <p className="text-gray-700 text-lg">{data.author.name}</p>

          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="rounded-lg shadow-lg w-full max-h-96 object-cover"
          />
          <div
            className="w-full text-gray-800 text-lg text-justify"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4 mt-auto text-center">
        <p className="text-gray-600">&copy; 2025 My Blog. Adams.</p>
      </footer>
    </div>
  );
}
