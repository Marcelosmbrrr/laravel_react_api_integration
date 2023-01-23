<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Events\V1\MessageEvent;
use App\Http\Requests\V1\Chat\SendMessageRequest;

class ChatController extends Controller
{
    function message(SendMessageRequest $request)
    {
        dd($request->validated());
        event(new MessageEvent($request->username, $request->message));

        return [];
    }
}
