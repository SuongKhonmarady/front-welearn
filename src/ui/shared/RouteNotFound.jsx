import { useNavigate } from "react-router-dom";

export default function RouteNotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center flex flex-col gap-5 p-10 border-2 rounded-xl">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="tracking-tight font-extrabold dark:text-primary-500">
            Something When Wrong
          </p>
          <p className="text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#283d50] py-2 rounded-xl text-white"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </section>
  );
}
