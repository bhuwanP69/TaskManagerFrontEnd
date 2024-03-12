// get the data
export async function getData(): Promise<[]> {
  const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
  if (!ServerUrl) {
    throw new Error("Server URL is not defined");
  }
  const res = await fetch(`${ServerUrl}`, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function GetData() {
  return <div>GetData</div>;
}
