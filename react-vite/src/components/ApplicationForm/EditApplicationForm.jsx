import { format, isFuture, parseISO } from "date-fns";
import { cleanSalaryFormat, formatSalary } from "../../utils/formatSalary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditApplication, thunkGetApplicationById } from "../../redux/applications";
import ApplicationForm from "./ApplicationForm";
import LoadingPage from "../LoadingPage";

export default function EditApplicationForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const [title, setTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [appliedDate, setAppliedDate] = useState('');
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchCategories = async () => {
        const response = await fetch('/api/categories')
        const data = await response.json();
        setCategories(data);
    }

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!Number.isInteger(Number(applicationId))) {
            return navigate('/error-page');
        }
        fetchCategories();
        if (!isLoaded) {

            dispatch(thunkGetApplicationById(applicationId)).then((app) => {
                if (app.errors) {
                    return navigate('/error-page')
                }
                if (sessionUser.id !== app.user_id) {
                    return navigate('/');
                }

                setTitle(app.title);
                if (app.category) {
                    setJobCategory(app.category.id);
                } else {
                    setJobCategory('other');
                }
                if (app.salary_min) setSalaryMin('$' + new Intl.NumberFormat().format(app.salary_min));
                if (app.salary_max) setSalaryMax('$' + new Intl.NumberFormat().format(app.salary_max));
                if (app.applied_date) {
                    const isoDateStr = new Date(app.applied_date).toISOString();
                    const parsedDate = parseISO(isoDateStr.split('T')[0])
                    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                    setAppliedDate(formattedDate);
                }
                setIsLoaded(true);
            })
        }
    }, [isLoaded, sessionUser, dispatch, applicationId, navigate])

    const handleMinSalaryChange = (e) => {
        const formattedVal = formatSalary(e);
        if (formattedVal === '0') {
            setSalaryMin('');
            return;
        }
        setSalaryMin('$' + formattedVal);
    }

    const handleMaxSalaryChange = (e) => {
        const formattedVal = formatSalary(e);
        if (formattedVal === '0') {
            setSalaryMax('');
            return;
        }
        setSalaryMax('$' + formattedVal);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const [y, m, d] = appliedDate.split('-');
        const applied_date = new Date(y, parseInt(m, 10) - 1, d);
        setErrors({});
        const newErrors = {};
        if (title.length <= 0) newErrors.title = 'Title is required';
        if (title.length > 100) newErrors.title = 'Title must be 100 characters or less';
        if (!jobCategory) newErrors.job_category = 'Job category is required'
        if (salaryMin.length !== 0 && Number(salaryMin) <= 0) newErrors.salary_min = 'Minimum salary must be greater than 0';
        if (salaryMax.length !== 0 && Number(salaryMax) <= 0) newErrors.salary_max = 'Maximum salary must be greater than 0';
        if (isFuture(applied_date)) newErrors.applied_date = 'Applied date can not be in the future'


        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const payload = { title };
        if (jobCategory !== 'other') payload.job_category = jobCategory
        if (salaryMin) payload.salary_min = Number(cleanSalaryFormat(salaryMin));
        if (salaryMax) payload.salary_max = Number(cleanSalaryFormat(salaryMax));
        if (appliedDate) payload.applied_date = format(applied_date, 'M/d/yyyy');

        return dispatch(thunkEditApplication(applicationId, payload)).then((data) => {
            return navigate(`/applications/${data}`)
        }).catch((e) => setErrors(e))
    }

    return (
        <>
            {isLoaded &&
                <div id="app_form__container">
                    <h1>Edit Job Application</h1>
                    <form>
                        <ApplicationForm
                            title={title}
                            setTitle={setTitle}
                            jobCategory={jobCategory}
                            setJobCategory={setJobCategory}
                            salaryMax={salaryMax}
                            salaryMin={salaryMin}
                            appliedDate={appliedDate}
                            setAppliedDate={setAppliedDate}
                            categories={categories}
                            errors={errors}
                            handleMinSalaryChange={handleMinSalaryChange}
                            handleMaxSalaryChange={handleMaxSalaryChange}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}