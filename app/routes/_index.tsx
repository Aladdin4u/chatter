import { Form, useLoaderData } from "@remix-run/react";
import Login from "components/login";
import createServerSupabase from "utils/supabase.server";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import RealtimeMessages from "components/Realtime-message";

export const action = async ({request}:ActionArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { message } = Object.fromEntries(await request.formData())
  const {error} = await supabase.from("messages").insert({ content: String(message)})

  if(error) {
    console.log(error)
  }

  return json(null, {headers: response.headers})
}

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response })
  const { data } = await supabase.from("messages").select()
  return json({messages: data ?? []}, {headers: response.headers })
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Login />
      <RealtimeMessages serverMessages={messages}/>
      <Form>
        <input type="text" name="message" />
        <button type="submit">send</button>
      </Form>
    </div>
  );
}
