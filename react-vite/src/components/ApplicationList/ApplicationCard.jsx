import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import determineStatusClass from '../../utils/determineStatusClass';
import verifyStringLength from '../../utils/verifyStringLength';

export default function ApplicationCard({ application }) {
    const navigate = useNavigate();
    let appliedDate = null;
    let lastUpdated;

    if (application.applied_date) {
        const isoDateStr = new Date(application.applied_date).toISOString();
        const parsedDate = parseISO(isoDateStr.split('T')[0])
        const formattedDate = format(parsedDate, 'M/d/yyyy');
        appliedDate = formattedDate;
    }

    const isoDateStr = new Date(application.updated_at).toISOString();
    const parsedDate = parseISO(isoDateStr.split('T')[0])
    const formattedDate = format(parsedDate, 'M/d/yyyy');
    lastUpdated = formattedDate;

    const handleClick = () => {
        sessionStorage.removeItem('app-page');
        return navigate(`${application.id}`)
    }

    return (
        <div
            className="
            border border-[rgb(255,255,255,0.5)] rounded flex flex-col gap-3 items-center justify-around p-2
            sm:flex-row
            hover:border-[#1F1F1F] hover:cursor-pointer
            "
            onClick={handleClick}
        >
            <div
                className='
                flex gap-5 border-b border-[rgb(255,255,255,0.5)] pb-1
                sm:flex-col sm:border-b-0 sm:border-r sm:gap-3 sm:w-8/12 sm:pb-0 sm:pr-1 sm:pl-4
                '
            >
                <h3
                    className={`${verifyStringLength(application.title, 18) ?
                        '' : 'break-all'} font-bold`}
                >
                    {application.title}
                </h3>
                <p>{application.company.name}</p>
            </div>
            <div
                className='
                flex items-start justify-between w-10/12
                sm:flex-col sm:w-8/12 sm:gap-2 sm:pl-10
                '
            >
                <div>
                    <p>Status</p>
                    <p className={determineStatusClass(application.status.name)}>{application.status.name}</p>
                </div>
                <div>
                    <p>Date Applied</p>
                    {appliedDate ?
                        <p>{appliedDate}</p> :
                        <p>Not Set</p>
                    }
                </div>
            </div>
            <div
                className='
                flex items-start justify-between w-10/12
                sm:flex-col sm:w-8/12 sm:gap-2
                '
            >
                <div>
                    <p>Salary Range</p>
                    {application.salary_min && application.salary_max ?
                        <p>${Number(application.salary_min)
                            .toLocaleString('en-US', { minimumFractionDigits: 0 })}
                            {' '}-{' '}
                            {Number(application.salary_max)
                                .toLocaleString('en-US', { minimumFractionDigits: 0 })}</p> :
                        <p>Not Set</p>
                    }
                </div>
                <div>
                    <p>Last Updated</p>
                    <p>{lastUpdated}</p>
                </div>
            </div>
        </div >
    )
}