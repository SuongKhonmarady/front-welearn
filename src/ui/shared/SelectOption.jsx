export default function SelectOption({ options, onSelectChange }) {
  return (
    <select
      onChange={onSelectChange}
      className="rounded-xl p-1 sm:p-2 dark:bg-white dark:text-[#283d50] uppercase text-sm md:text-base border border-[#283d50]"
    >
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
