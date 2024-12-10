import Input from "../../../../ui/shared/Input";

export default function Choice({ data, onSelect }) {
  return (
    <li className="flex items-center gap-4 p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
      <label htmlFor={data.name} className="text-lg font-semibold text-gray-700">
        {data.name}
      </label>
      <Input
        type="radio"
        name="choice"
        id={data.id}
        value={data.id}
        onChange={onSelect}
        className="cursor-pointer"
      />
    </li>
  );
}
