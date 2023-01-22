<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\V1\MessageEvent;

class ChatController extends Controller
{
    function message(Request $request)
    {

        event(new MessageEvent($request->username, $request->message));

        return [];
    }
}
