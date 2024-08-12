import './ApplicationForm.css';

export default function ApplicationForm({ title, setTitle, jobCategory,
    setJobCategory, salaryMin, setSalaryMin, salaryMax, setSalaryMax,
    appliedDate, setAppliedDate, categories, errors }) {
    return (
        <>
            <div>
                <label>Title</label>
                <input
                    placeholder='Job Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Job Category</label>
                <select
                    value={jobCategory}
                    onChange={setJobCategory}
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
                </select>
            </div>
            <div>
                <label>Minimum Salary</label>
                <input
                    type='number'
                    placeholder='e.g., 50000'
                    min='0'
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                />
            </div>
            <div>
                <label>Maximum Salary</label>
                <input
                    type='number'
                    placeholder='e.g., 100000'
                    min='0'
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                />
            </div>
            <div>
                <label>Date Applied</label>
                <input
                    type="date"
                    value={appliedDate}
                    onChange={(e) => setAppliedDate(e.target.value)}
                />
            </div>
        </>
    )
}