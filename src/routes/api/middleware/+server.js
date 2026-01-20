import { json, error } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return error(400, 'userId is required');
        }

        // Send $identify event to Mixpanel
        const identifyData = {
            event: '$identify',
            properties: {
                $identified_id: userId,
                token: 'df65aa0866129f40cc97ca11a1b58035'
            }
        };

        const response = await fetch('https://api.mixpanel.com/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([identifyData])
        });

        if (!response.ok) {
            console.error('Identify error:', response.status, response.statusText);
            return error(500, 'Failed to identify user');
        }

        return json({ success: true, message: 'success!' });

    } catch (err) {
        console.error('Identify middleware error:', err);
        return error(500, 'Internal server error');
    }
}

export async function POST({ request }) {
    try {
        const { eventName, properties = {}, isTimeEvent } = await request.json();

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

        return json({ success: true, message: 'Event sent successfully', fullData: JSON.stringify(response) }); 

    } catch (err) {
        console.error('Middleware error:', err);
        return error(500, 'Internal server error');
    }
}

export async function PUT({ request }) {
    try {
        const { userId, email, fullName } = await request.json();

        if (!userId) {
            return error(400, 'userId is required');
        }

        const engageData = {
            $token: 'df65aa0866129f40cc97ca11a1b58035',
            $distinct_id: userId,
            $set: {
                $email: email,
                $name: fullName
            }
        };

        const response = await fetch('https://api.mixpanel.com/engage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([engageData])
        });

        if (!response.ok) {
            console.error('Mixpanel engage error:', response.status, response.statusText);
            return error(500, 'Failed to set user properties');
        }

        return json({ success: true, message: 'User properties set successfully' });

    } catch (err) {
        console.error('Engage middleware error:', err);
        return error(500, 'Internal server error');
    }
}
