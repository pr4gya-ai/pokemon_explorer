export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search Pokemon by name..."
      aria-label="Search Pokemon by name"
      className="w-full rounded-full border-2 border-white bg-white px-5 py-3 text-base text-gray-800 shadow focus:border-yellow-400 focus:outline-none"
    />
  );
}
