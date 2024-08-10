import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';
import './CompanyList.css';
import { useEffect, useState } from 'react';
import { thunkGetUserCompanies } from '../../redux/companies';

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
                    <div id='company_list__container'>
                        <h1>Your Companies</h1>
                        {companies.allIds.map((company_id) => {
                            const company = companies.data[company_id];
                            // TODO create grid layout with companies
                            return (
                                <div key={`company-${company_id}`}>
                                    {company.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}