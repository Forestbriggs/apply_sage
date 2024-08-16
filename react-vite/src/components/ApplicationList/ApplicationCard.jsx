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
        return navigate(`${application.id}`)
    }

    return (
        <div className="application_card" onClick={handleClick}>
            <div>
                <h3
                    className={verifyStringLength(application.title, 18) ? 'application_title' : ''}
                >
                    {application.title}
                </h3>
                <p>{application.company.name}</p>
            </div>
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
            <div>
                <p>Salary Range</p>
                <p>${Number(application.salary_min)
                    .toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    {' '}-{' '}
                    {Number(application.salary_max)
                        .toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
            </div>
            <div>
                <p>Last Updated</p>
                <p>{lastUpdated}</p>
            </div>
        </div >
    )
}