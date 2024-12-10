export default function Item({ data }) {
  return (
    <div // Pass data.id to the function
      className="p-5 space-y-5 w-full bg-white shadow-md border-gray-200 md:duration-500 md:hover:scale-105 md:hover:shadow-xl"
    >
      <h1 className="text-center text-xl">{data.name}</h1>
    </div>
  );
}
