import Item from "./Item"

export default function ItemList({ data }) {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 text-sm md:text-l">
      {data.map((item) => (
        <Item data={item} key={item.id} />
      ))}
    </div>
  );
}
