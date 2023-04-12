import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import Navbar from "~/components/navbar";

export const meta: V2_MetaFunction = () => {
  return [{ title: "South Flo Pizza" }];
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

const testimonials = [
  {
    id: 1,
    quote:
      `I've tried pizza all over the world, but I have to say, the pizza at this restaurant is simply unbeatable. From the crispy crust to the perfectly balanced toppings, every bite is a delight. It's no wonder they're always packed!`,
    attribution: 'Sarah Peters, Houston',
  },
  {
    id: 2,
    quote:
      `I'm a self-proclaimed pizza connoisseur, and I can confidently say that this restaurant makes the best pizza in town. The sauce is rich and tangy, the cheese is melty and gooey, and the crust has just the right amount of chewiness. It's the kind of pizza that keeps you coming back for more.`,
    attribution: 'Kelly McPherson, Austin',
  },
  {
    id: 3,
    quote:
      `I recently discovered this hidden gem of a pizza place, and I am blown away by how good the pizza is. The ingredients are fresh and high-quality, and the flavors are out of this world. I can't believe I've been missing out on this pizza for so long!`,
    attribution: 'Chris Paul, San Antonio',
  },
]

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
            <img
              src="https://media.istockphoto.com/id/1303021179/photo/different-tipes-of-pizza.jpg?b=1&s=170667a&w=0&k=20&c=LkDbMg4uxhFmvsFomSxh1xHMSqwgOYRN5hMZixe9smM="
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-white bg-opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
        </div>

        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Order a South Flo Pizza today!!
            </h2>
            <Link
              to="/order"
              className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
            >
              Order Here
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="testimonial-heading"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 id="testimonial-heading" className="text-2xl font-bold tracking-tight text-gray-900">
              What are people saying?
            </h2>

            <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.id} className="sm:flex lg:block">
                  <svg
                    width={24}
                    height={18}
                    viewBox="0 0 24 18"
                    aria-hidden="true"
                    className="flex-shrink-0 text-gray-300"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                    <p className="text-lg text-gray-600">{testimonial.quote}</p>
                    <cite className="mt-4 block font-semibold not-italic text-gray-900">{testimonial.attribution}</cite>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

