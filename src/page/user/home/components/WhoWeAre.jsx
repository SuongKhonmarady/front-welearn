import team from "../../../../assets/img/team.png";

export default function WhoWeAre() {
  return (
    <div className="flex flex-col gap-5 bg-gradient-to-r from-blue-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="md:w-1/3 hidden md:block">
          <img src={team} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-5 md:w-1/2 p-5">
          <h1 className="text-3xl font-semibold text-center">Who we are</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur vero dolorum cumque. Eveniet laborum ex eius expedita neque consectetur et magnam rem fugit, molestiae aliquam dolore ipsum soluta eaque amet?
          </p>
        </div>
      </div>
    </div>
  );
}
