export function set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function get(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    else return JSON.parse(value);
}

export function remove(key) {
    localStorage.removeItem(key);
}