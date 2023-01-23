<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\V1\MessageEvent;
use App\Http\Requests\V1\Chat\SendMessageRequest;

class ChatController extends Controller
{
    function message(Request $request)
    {
        dd("ok");
        event(new MessageEvent($request->username, $request->message));

        return [];
    }
}
