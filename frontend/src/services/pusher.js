import Pusher from 'pusher-js';

// Docs - connection: https://pusher.com/docs/channels/using_channels/connection/

// Pusher.logToConsole = true;

const pusher = new Pusher(`${import.meta.env.VITE_PUSHER_APP_KEY}`, {
    cluster: `${import.meta.env.VITE_PUSHER_APP_CLUSTER}`
});

export default pusher;