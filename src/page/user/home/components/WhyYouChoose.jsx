import test from "../../../../assets/img/test.png";

export default function WhyYouChoose() {
  return (
    <div className='flex flex-col gap-8 items-center justify-center text-center py-8'>
        {/* <h1 className='text-3xl font-semibold text-center'>Why Choose OpenScholarships?</h1> */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl'>
            {/* <div className='flex flex-col items-center space-y-4 p-6'>
                <img src={test} alt="" className='w-16 h-16 mx-auto' />
                <p className='text-sm text-gray-700'>Smart scholarship matching based on your profile</p>
            </div> */}
            <div className='flex flex-col items-center space-y-4 p-6'>
                <img src={test} alt="" className='w-14 h-14 mx-auto' />
                <p className='text-sm text-gray-700 font-medium'>Real-time deadline tracking</p>
            </div>
            {/* <div className='flex flex-col items-center space-y-4 p-6'>
                <img src={test} alt="" className='w-16 h-16 mx-auto' />
                <p className='text-sm text-gray-700'>AI-powered scholarship recommendations</p>
            </div> */}
            <div className='flex flex-col items-center space-y-4 p-6'>
                <img src={test} alt="" className='w-14 h-14 mx-auto' />
                <p className='text-sm text-gray-700 font-medium'>Global scholarship database with daily updates</p>
            </div>
        </div>
    </div>
  );
}
