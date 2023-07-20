export default function TdDefault({ value, name, onChange, readOnly }) {
  return (
    <>
      <td className="border border-slate-400 h-[35px]">
        <input
          className={`w-full px-3 py-1 text-center`}
          onChange={onChange}
          value={value}
          name={name}
          readOnly={readOnly}
        ></input>
      </td>
    </>
  );
}
