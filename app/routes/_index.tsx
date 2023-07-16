import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import supabase from "utilis/supabase";

export const loader = async ({}: LoaderArgs) => {
  const { data } = await supabase.from("message").select()
  return {messages: data ?? []}
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}
