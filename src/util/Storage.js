import * as moment from 'moment';

function set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function get(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    else return JSON.parse(value);
}

function remove(key) {
    localStorage.removeItem(key);
}

export function getCLogKeys() {
    return get('cLogs');
}

export function getCLog(key) {
    return get(key);
}

export function getCLogBoxes(key) {
    return get(`boxes-${key}`);
}

export function createCLog(title, desc, days, total) {
    const id = moment().locale('ko').format('YYYYMMDDHHmmss');
    const start = moment().locale('ko').startOf('days');
    const end = moment(start).add(parseInt(days), 'days');
    
    let cLogs = get('cLogs');
    if (!cLogs) cLogs = [];
    cLogs.push(id);
    set('cLogs', cLogs);

    set(id, {
        id, title, desc,
        days: parseInt(days),
        start: start.format('YYYY.MM.DD'),
        end: end.format('YYYY.MM.DD'),
        total: parseInt(total),
        count: 0
    });

    let dayBoxes = [];
    for (let d = 1; d <= days; d++) {
        dayBoxes.push({
            day: d,
            count: 0
        });
    }
    set(`boxes-${id}`, dayBoxes);
}

export function writeCount(count, boxes, boxIndex, cLog) {
    boxes[boxIndex].count = parseInt(count || '0');
    set(`boxes-${cLog.id}`, boxes);

    let totalCount = 0;
    boxes.forEach(box => {
        totalCount += box.count;
    });
    cLog.count = totalCount;
    set(cLog.id, cLog);

    return {
        cLog,
        boxes
    };
}

export function deleteCLog(cLogKeys, cLog) {
    const keys = cLogKeys.filter(key => key !== cLog.id);
    set('cLogs', keys);
    remove(`boxes-${cLog.id}`);
    remove(cLog.id);

    if (keys.length === 0) {
        remove('cLogs');
        return {
            cLogKeys: [],
            cLog: {},
            boxes: []
        };
    } else {
        return {
            cLogKeys: keys,
            cLog: getCLog(keys[0]),
            boxes: getCLogBoxes(keys[0])
        };
    }
}