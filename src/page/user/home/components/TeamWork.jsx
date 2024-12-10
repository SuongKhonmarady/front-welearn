import dog from "../../../../assets/img/Hero.png";

export default function TeamWork() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold text-center">Team Work</h1>
      <p className="text-center">
        We build this website for our final project of year 3 RUPP
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5">
        <div className="flex flex-col gap-5 items-center p-5">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src={dog} alt="" className="object-cover w-full h-full" />
          </div>
          <p>Som lyhuy</p>
        </div>
        <div className="flex flex-col gap-5 items-center p-5">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src={dog} alt="" className="object-cover w-full h-full" />
          </div>
          <p>Sok Reaksa</p>
        </div>
        <div className="flex flex-col gap-5 items-center p-5">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src={dog} alt="" className="object-cover w-full h-full" />
          </div>
          <p>Sok Cheapanha</p>
        </div>
        <div className="flex flex-col gap-5 items-center p-5" >
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src={dog} alt="" className="object-cover w-full h-full" />
          </div>
          <p>Suong khonMarady</p>
        </div>
        <div className="flex flex-col gap-5 items-center p-5">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src={dog} alt="" className="object-cover w-full h-full" />
          </div>
          <p>NHOEB KONGHUY</p>
        </div>
      </div>
    </div>
  );
}
