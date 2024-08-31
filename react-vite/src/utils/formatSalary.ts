export function cleanSalaryFormat(val:string):string {
    //* Gets rid of all non numerical characters for pre POST request data cleaning
    const rawVal = val.replace(/[^\d]/g, '');
    return rawVal;
}

export function formatSalary(e:Event):string {
    const target = e.target as HTMLInputElement;
    const rawVal = parseInt(cleanSalaryFormat(target.value), 10);
    const formattedVal = new Intl.NumberFormat().format(rawVal);
    return formattedVal;
}