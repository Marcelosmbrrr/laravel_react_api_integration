<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\V1\MessageEvent;
use App\Http\Requests\V1\Chat\SendMessageRequest;

class ChatController extends Controller
{
    function message(SendMessageRequest $request)
    {   
        // Send message data to the event
        // The data is sent to Pusher by the Listener of this event
        event(new MessageEvent(auth()->user()->id, auth()->user()->username, $request->input('message')));

        return response(["message" => "Message successful sent!"], 201);
    }
}
