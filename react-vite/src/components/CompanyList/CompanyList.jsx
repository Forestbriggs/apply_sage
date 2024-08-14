import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';
import './CompanyList.css';
import { useEffect, useState } from 'react';
import { thunkGetUserCompanies } from '../../redux/companies';
import CompanyCard from './CompanyCard';

export default function CompanyList() {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.companies);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(thunkGetUserCompanies()).then(() => {
                setIsLoaded(true);
            }, [dispatch, isLoaded])
        }
    })

    return (
        <>
            {isLoaded &&
                <div id='company_list'>
                    <h1>Your Companies</h1>
                    <div id='company_grid'>
                        {companies.allIds.map((company_id) => {
                            const company = companies.data[company_id];
                            return (
                                <CompanyCard key={company.id} company={company} />
                            )
                        })}
                    </div>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}