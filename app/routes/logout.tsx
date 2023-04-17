import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}

export default function Logout() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <img
          src={
            "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/jxkq997smgzvrwydvxj0"
          }
          alt="South Flo Pizza"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
        <Form method="post">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
          >
            Logout
          </button>
        </Form>
      </div>
    </div>
  );
}
