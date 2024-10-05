import StatusHistoryCard from './StatusHistoryCard';

export default function Overview({ application, appliedDate }: { application: any, appliedDate: string }) {
    return (
        <div
            className='flex flex-col gap-2 px-4 justify-between h-full
                xl:flex-row
            '
        >
            {/* App Details */}
            <div className='xl:w-1/2'>
                <h2 className='text-2xl font-bold py-2'>Job Application Details:</h2>
                <div className='flex flex-col rounded items-center border border-solid border-[#484848]'>
                    <div className='flex items-center justify-around'>
                        <p>Category:</p>
                        {application?.category?.name ?
                            <p>{application?.category?.name}</p> :
                            <p>Not Set</p>
                        }
                    </div>
                    <div className='flex items-center justify-around'>
                        <p>Salary Range:</p>
                        {
                            application.salary_min && application.salary_max ?
                                <p>${Number(application.salary_min)
                                    .toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    {' '}-{' '}
                                    {Number(application.salary_max)
                                        .toLocaleString('en-US', { minimumFractionDigits: 0 })}</p> :
                                <p>Not Set</p>
                        }
                    </div>
                    <div className='flex items-center justify-around'>
                        <p>Application Date:</p>
                        {
                            application.applied_date ?
                                <p>{appliedDate}</p> :
                                <p>Not Set</p>
                        }
                    </div>
                </div>
            </div>

            {/* Application Status History */}
            <div className='xl:w-1/2'>
                <h2 className='text-2xl font-bold py-2'>Application Status History:</h2>
                <div className='flex gap-2 mb-1'>
                    <h3>Feature coming soon...</h3>
                    <h4>Example below (Not actual data)</h4>
                </div>
                <div
                    className=' scrollable-div
                                    border border-solid border-[#484848] rounded p-2
                                    flex flex-col gap-2 h-fit overflow-y-scroll
                                    '
                >
                    <StatusHistoryCard status='Offer Received' date={new Date(2024, 10, 7)} />
                    <StatusHistoryCard status='Second Interview' date={new Date(2024, 10, 3)} />
                    <StatusHistoryCard status='First Interview' date={new Date(2024, 10, 1)} />
                    <StatusHistoryCard status='Applied' date={new Date(2024, 9, 24)} />
                    {/* TODO add recent history and link to history page */}
                </div>
            </div>
        </div>
    )
}