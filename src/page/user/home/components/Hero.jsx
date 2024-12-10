import dog from "../../../../assets/img/Hero.png";

export default function Hero() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center ">
      <div className="flex flex-col gap-5 p-5 md:w-1/2">
        <h1 className="text-3xl font-semibold">
          We Learn , We grow , <br /> We achieve
        </h1>
        <p>
          Hello all users, our website will be your important path of studying.
          We’re trying our best to improve and bring new Function and Exercise
          here to help you in order to improve your skill. We hope you will
          learn a lot from this website and we go together.
        </p>
        <p className="text-3xl font-semibold px-10 text-blue-600 text-center">
          Let Study !
        </p>
      </div>
      <div className="hidden md:flex flex-col p-5 w-1/2">
        <img src={dog} alt="dogImage" className="w-[500px] mx-auto" />
      </div>
    </div>
  );
}
