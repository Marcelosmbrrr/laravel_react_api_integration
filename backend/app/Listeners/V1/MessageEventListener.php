<?php

namespace App\Listeners\V1;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Pusher\Pusher;

class MessageEventListener
{
    private Pusher $pusher;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        $this->pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
            ]
        );
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        // This function sends a message to a specific channel that was created in Pusher plataform
        // Structure: $this->pusher->trigger('channel', 'client-side-event', data)
        // All clients connected to this channel wil receive this data through "new-message" event listener
        $this->pusher->trigger('laravel-react-chat', 'new-message', [
            "user_id" => $event->user_id,
            "username" => $event->username,
            "message" => $event->message
        ]);
    }
}
