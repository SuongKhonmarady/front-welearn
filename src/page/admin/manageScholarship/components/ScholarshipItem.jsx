import { removeScholarship } from "../../../../context/scholarship/Scholarship";
import Button from "../../../../ui/shared/Button";

export default function ScholarshipItem({ data, onRefresh }) {
  const { description, post_at, link, id } = data;

  const handleRemove = async (e) => {
    e.preventDefault();
    const res = await removeScholarship(id);
    if (res) {
      onRefresh();
    }
  };

  return (
    <li className="flex flex-col gap-2 p-5 border-2">
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-col gap-2">
          <p>{description}</p>
          <p className="text-blue-500">Post at : {post_at}</p>
          <a href={`${link}`} className="text-blue-500">
            Link : {link}
          </a>
        </div>
        <div>
          <Button customClass="bg-red-500 text-white" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
