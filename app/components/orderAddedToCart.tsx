import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";

type OrderAddedToCartAlertProps = {
  dismissAlert: () => void;
};

export default function OrderAddedToCartAlert(
  props: OrderAddedToCartAlertProps
) {
  const { dismissAlert } = props;

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Pizza added to cart
          </h3>

          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <Link
                to="/cart"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                View cart
              </Link>
              <button
                type="button"
                onClick={dismissAlert}
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
