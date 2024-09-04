import { format, parseISO } from 'date-fns';

export default function formatDate(date: Date) {
        const isoDateStr = new Date(date).toISOString();
        const parsedDate = parseISO(isoDateStr.split('T')[0])
        const formattedDate = format(parsedDate, 'M/d/yyyy');
        return formattedDate;
}