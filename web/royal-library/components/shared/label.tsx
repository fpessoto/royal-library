export default function Label( { htmlFor, text } : { htmlFor: string, text: string}  ) {


  return (
    <label
      htmlFor={htmlFor}
      className="text-black"
    >
      {text}
    </label>
  );
}
