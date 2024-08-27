import './ApplicationForm.css';

export default function ApplicationForm({ title, setTitle, jobCategory,
    setJobCategory, salaryMin, salaryMax, appliedDate, setAppliedDate,
    categories, errors, handleMinSalaryChange, handleMaxSalaryChange }) {
    return (
        <>
            <div>
                <label>Title<span className='required'> *</span><span className='errors'> {errors.title}</span></label>
                <input
                    placeholder='Job Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Job Category<span className='required'> *</span><span className='errors'> {errors.job_category}</span></label>
                <select
                    className='text-main-dark'
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                >
                    <option disabled value="">Select a Job Category</option>
                    {categories.map((category) => {
                        return (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    })}
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Minimum Salary<span className='errors'> {errors.salary_min}</span></label>
                <input
                    type='text'
                    placeholder='e.g., 50000'
                    value={salaryMin}
                    onChange={(e) => handleMinSalaryChange(e)}
                />
            </div>
            <div>
                <label>Maximum Salary<span className='errors'> {errors.salary_max}</span></label>
                <input
                    type='text'
                    placeholder='e.g., 100000'
                    value={salaryMax}
                    onChange={(e) => handleMaxSalaryChange(e)}
                />
            </div>
            <div>
                <label>Date Applied<span className='errors'> {errors.applied_date}</span></label>
                <input
                    type="date"
                    value={appliedDate}
                    onChange={(e) => setAppliedDate(e.target.value)}
                />
            </div>
        </>
    )
}