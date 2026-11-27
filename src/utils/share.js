import { isValid, parseISO } from 'date-fns';

const SHARE_FIELDS = [
    'id',
    'ownerId',
    'title',
    'description',
    'location',
    'category',
    'date',
    'startTime',
    'endTime'
];

export function encodeEvent(event) {
    const data = Object.fromEntries(SHARE_FIELDS.map((k) => [k, event[k]]));
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    let binary = '';
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeEvent(code) {
    try {
        const base64 = code.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const data = JSON.parse(new TextDecoder().decode(bytes));
        if (!data.id || !data.title || typeof data.date !== 'string' || !isValid(parseISO(data.date))) return null;
        return { ...data, rsvps: [], tasks: [] };
    } catch {
        return null;
    }
}

export function shareUrl(event) {
    return `${window.location.origin}/events/${event.id}/rsvp?e=${encodeEvent(event)}`;
}