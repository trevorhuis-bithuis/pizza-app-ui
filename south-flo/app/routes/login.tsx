import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { LockClosedIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { AuthorizationError } from "remix-auth";


export default function Login() {
    const actionData = useActionData();

    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <img
                    src={"https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/jxkq997smgzvrwydvxj0"}
                    alt="South Flo Pizza"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <Form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    {actionData?.error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{actionData.error.message}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-slate-700 group-hover:text-slate-400" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </Form>

            </div>
        </div>
    );
}


export async function action({ request }: ActionArgs) {
    try {
        return await authenticator.authenticate("user-pass", request, {
            successRedirect: "/login",
            throwOnError: true,
        });
    } catch (error) {
        if (error instanceof Response) return error;
        if (error instanceof AuthorizationError) {
            return {
                error: {
                    message: "Invalid username or password",
                },
            };
        }
    }

};


export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        successRedirect: "/",
    });
};