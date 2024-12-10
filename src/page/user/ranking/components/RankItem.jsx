export default function RankItem({ data, id }) {
  const { point, user } = data;

  const getRowStyle = (index) => {
    switch (index) {
      case 1:
        return "bg-gradient-to-r from-[#cc9910] to-[#fcf97c]";
      case 2:
        return "bg-gradient-to-r from-[#C0C0C0] to-[#e9e9eb]";
      case 3:
        return "bg-gradient-to-r from-[#ca6533] to-[#F0C9BA]";
      default:
        return "bg-gradient-to-r from-[#7dd3fc] to-[#e0f2fe]";
    }
  };

  return (
    <tr className={`${getRowStyle(id)}`}>
      <td className="py-2 px-4">{id}</td>
      <td className="py-2 px-4">{user.name}</td>
      <td className="py-2 px-4">{user.isGraduate ? "Graduate" : "Not Graduate"}</td>
      <td className="py-2 px-4">{point}</td>
    </tr>
  );
}
