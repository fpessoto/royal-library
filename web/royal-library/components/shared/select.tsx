export default function Select({
  onChangeFunc,
  list,
  selected,
  optionName,
}: {
  onChangeFunc: any;
  list: any;
  selected: any;
  optionName: string;
}) {
  return (
    <select
      data-te-select-init
      value={selected}
      onChange={(e) => onChangeFunc(+e.target.value)}
      className="border-1 peer block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-500 dark:placeholder:text-neutral-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    >
      <option value="0">Select</option>
      {list.map((item: any) => {
        return (
          <option key={item.id} value={item.id}>
            {item[optionName]}
          </option>
        );
      })}
      ;
    </select>
  );
}
