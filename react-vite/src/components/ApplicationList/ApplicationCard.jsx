import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import determineStatusClass from '../../utils/determineStatusClass';

export default function ApplicationCard({ application }) {
    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`${application.id}`)
    }

    return (
        <div className="application_card" onClick={handleClick}>
            <div>
                <h3>{application.title}</h3>
                <p>{application.company.name}</p>
            </div>
            <div>
                <p>Status</p>
                <p className={determineStatusClass(application.status.name)}>{application.status.name}</p>
            </div>
            <div>
                <p>Date Applied</p>
                <p>{format(new Date(application.applied_date), 'M/d/yyyy')}</p>
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
                <p>{format(new Date(application.updated_at), 'M/d/yyyy')}</p>
            </div>
        </div >
    )
}