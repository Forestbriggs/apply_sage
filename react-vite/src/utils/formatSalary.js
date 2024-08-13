export function cleanSalaryFormat(val) {
    //* Gets rid of all non numerical characters for pre POST request data cleaning
    const rawVal = val.replace(/[^\d]/g, '');
    return rawVal;
}

export function formatSalary(e) {
    const rawVal = cleanSalaryFormat(e.target.value)
    const formattedVal = new Intl.NumberFormat().format(rawVal);
    return formattedVal;
}