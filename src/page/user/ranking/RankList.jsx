import { useContext, useEffect, useState } from "react";
import RankDataContext from "../../../context/rank/RankContext";
import Spinner from "../../../ui/shared/Spinner";
import RankItem from "./components/RankItem";
import NotFound from "../../../ui/shared/NotFound";
import { getRank } from "../../../context/rank/RankAction";
import SelectOption from "../../../ui/shared/SelectOption";
import { types, userIndentity } from "../../../data/dummyData";
import { getCategory, getType } from "../../../context/subject/SubjectAction";
import Button from "../../../ui/shared/Button";

export default function RankList() {
  const { listRanks, listCategory, loading, dispatch } =
    useContext(RankDataContext);
  const [isGraduate, setGraduate] = useState(0);
  const [type, setType] = useState(1);
  const [category, setCategory] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setGraduate(selectedOption);
  };

  const handleChangeType = (e) => {
    const selectedType = parseInt(e.target.value);
    setType(selectedType);
  };

  const handleChangeCategory = (e) => {
    const selectedCategory = parseInt(e.target.value);
    setCategory(selectedCategory);
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchData = async () => {
      const data = isGraduate ? await getCategory() : await getType(type);
      dispatch({ type: "SET_CATEGORY", payload: data });
    };
    fetchData().then(() => fetchRank());
  }, [dispatch, type , isGraduate]);

  const fetchRank = async () => {
    const data = await getRank(category, isGraduate);
    dispatch({ type: "SET_RANKS", payload: data });
  };

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-row gap-2">
          <SelectOption
            options={userIndentity}
            onSelectChange={handleSelectChange}
          />
          {isGraduate === 0 && (
            <SelectOption options={types} onSelectChange={handleChangeType} />
          )}
        </div>
        <div className="flex flex-row gap-2">
          <SelectOption
            options={listCategory}
            onSelectChange={handleChangeCategory}
          />
          <Button customClass="border-2" onClick={() => fetchRank()}>Search</Button>
        </div>
      </div>

      {loading ? (
        <Spinner isFull />
      ) : listRanks.length ? (
        <table className="relative overflow-x-auto bg-white ">
          <thead className="uppercase bg-[#283d50] text-white">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Username</th>
              <th className="py-2">Identity</th>
              <th className="py-2">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {listRanks.map((item, id) => (
              <RankItem data={item} id={id + 1} key={item.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
