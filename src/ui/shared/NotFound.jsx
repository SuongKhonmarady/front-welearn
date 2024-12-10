import Empty from "../../assets/img/empty.png";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex flex-col gap-5 items-center">
          <p>No data found</p>
          <img src={Empty} alt="" className="w-[50%] h-[50%]" />
        </div>
      </div>
    </section>
  );
}
