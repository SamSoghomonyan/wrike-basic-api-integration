import dotenv from "dotenv";
dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
  }

  return response.json();
}
