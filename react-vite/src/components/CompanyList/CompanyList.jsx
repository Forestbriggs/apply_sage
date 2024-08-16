import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';
import './CompanyList.css';
import { useEffect, useState } from 'react';
import { thunkGetUserCompanies } from '../../redux/companies';
import CompanyCard from './CompanyCard';
import { useNavigate } from 'react-router-dom';

// TODO add pagination
export default function CompanyList() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companies = useSelector(state => state.companies);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!isLoaded) {
            dispatch(thunkGetUserCompanies()).then(() => {
                setIsLoaded(true);
            })
        }

    }, [dispatch, isLoaded, navigate, sessionUser])

    const handleAddClick = () => {
        return navigate('/companies/select');
    }

    return (
        <>
            {isLoaded &&
                <div id='company_list'>
                    <h1>Your Companies</h1>
                    {companies.allIds.length === 0 &&
                        <div className='no_companies'>
                            <h2>Haven&apos;t applied to any companies yet?</h2>
                            <h2>Start the process now!</h2>
                            <button onClick={handleAddClick} className='add_button'>Add Application</button>
                        </div>
                    }
                    <div id='company_grid'>
                        {companies.allIds.map((company_id) => {
                            const company = companies.data[company_id];
                            return (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                />
                            )
                        })}
                    </div>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}