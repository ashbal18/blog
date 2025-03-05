"use server";



export default async function getTodo() {
    const res = await fetch(
        "https",
        {cache: "force-cache", next: { tags: ["todo"]}}
    );
    return await res.json();
}