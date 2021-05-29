import moment from 'moment';
import { CLog, CLogDay } from '../type/CLogTypes';

const API_URL = 'http://localhost:5000/api/v1';

export async function getCLogs() {
    const response = await fetch(`${API_URL}/cLogs`);
    return (await response.json()).result;
}

export async function getCLog(key: string) {
    const response = await fetch(`${API_URL}/cLog/${key}`);
    return (await response.json()).result;
}

export async function getCLogDays(key: string) {
    const response = await fetch(`${API_URL}/cLogDays/${key}`);
    return (await response.json()).result;
}

export async function createCLog(
    title: string,
    desc: string,
    days: number,
    total: number,
) {
    const start = moment().locale('ko').startOf('days');
    const end = moment(start).add(days, 'days');

    let response = await fetch(`${API_URL}/cLog`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            desc,
            days: days,
            start: start.format('YYYY.MM.DD'),
            end: end.format('YYYY.MM.DD'),
            total: total,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const cLog: CLog = (await response.json()).result;

    let cLogDays: Array<CLogDay> = [];
    for (let d = 0; d < days; d++) {
        cLogDays.push({
            cLogId: cLog.id,
            date: moment(start).add(d, 'days').format('M/D'),
            count: 0,
        });
    }
    response = await fetch(`${API_URL}/cLogDays`, {
        method: 'POST',
        body: JSON.stringify(cLogDays),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (await response.json()).result;
}

export async function updateCLog(cLog: CLog) {
    let response = await fetch(`${API_URL}/cLog`, {
        method: 'PUT',
        body: JSON.stringify(cLog),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (await response.json()).result;
}

export async function updateCLogDay(cLogDay: CLogDay) {
    let response = await fetch(`${API_URL}/cLogDay`, {
        method: 'PUT',
        body: JSON.stringify(cLogDay),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (await response.json()).result;
}

export async function deleteCLog(id: string) {
    let response = await fetch(`${API_URL}/cLog/${id}`, {
        method: 'DELETE',
    });

    return (await response.json()).result;
}
