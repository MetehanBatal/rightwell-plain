import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { eventName, properties = {} } = await request.json();

        if (!eventName) {
            return error(400, 'Event name is required');
        }

        const mixpanelData = {
            event: eventName,
            properties: {
                ...properties,
                time: Date.now(),
                token: 'df65aa0866129f40cc97ca11a1b58035'
            }
        };

        const response = await fetch('https://api.mixpanel.com/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([mixpanelData])
        });

        if (!response.ok) {
            console.error('Mixpanel API error:', response.status, response.statusText);
            return error(500, 'Failed to send event to Mixpanel');
        }

        return json({ success: true, message: 'Event sent successfully' });

    } catch (err) {
        console.error('Middleware error:', err);
        return error(500, 'Internal server error');
    }
}
