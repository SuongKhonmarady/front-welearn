import test from "../../../../assets/img/test.png";

export default function WhyYouChoose() {
  return (
    <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-semibold text-center'>Why you should chooose we learn ?</h1>
        <div className='grid grid-cols-2 md:grid-cols-4'>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>Clearly answer of exam baccII</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>All info about scholarship from local and abroad</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>Many exercise for testing your skill</p>
            </div>
            <div className='space-y-5 p-3'>
                <img src={test} alt="" className='w-12' />
                <p>A lot of book which relate to BaccII</p>
            </div>
        </div>
    </div>
  )
}
