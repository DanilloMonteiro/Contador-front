export default function TdDefault({
  value,
  name,
  onChange,
  readOnly,
  disabled,
}) {
  return (
    <>
      <td className="border border-slate-400 h-[35px] relative">
        <input
          className={`w-full px-3 py-1 text-center`}
          onChange={onChange}
          value={value}
          name={name}
          readOnly={readOnly}
        ></input>
        {disabled === true && (
          <div className="absolute w-full h-full left-0 top-0 bg-black opacity-20"></div>
        )}
      </td>
    </>
  );
}
