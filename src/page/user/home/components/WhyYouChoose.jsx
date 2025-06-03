import test from "../../../../assets/img/test.png";

export default function WhyYouChoose() {
  return (
    <div className='flex flex-col gap-5'>
        {/* <h1 className='text-3xl font-semibold text-center'>Why Choose OpenScholarships?</h1> */}
        <div className='grid grid-cols-2 md:grid-cols-4'>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>Smart scholarship matching based on your profile</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>Real-time deadline tracking and notifications</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>AI-powered scholarship recommendations</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>Global scholarship database with daily updates</p>
            </div>
        </div>
    </div>
  );
}
