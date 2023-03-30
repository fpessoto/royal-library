export default function Input({
  value,
  name,
  placeholder,
  onChangeCallback,
}: {
  value: string;
  name: string;
  placeholder: string;
  onChangeCallback: any;
}) {
  return (
    <input
      type="text"
      className="peer block min-h-[auto] w-full rounded border-1 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-500 dark:placeholder:text-neutral-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      placeholder={placeholder}
      name={name}
      onChange={(e) => onChangeCallback(e.target.value)}
      value={value}
    />
  );
}
