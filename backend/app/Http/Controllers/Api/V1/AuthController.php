<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\V1\User;

class AuthController extends Controller
{
    public User $model;

    function __construct(User $model)
    {
        $this->model = $model;
    }

    function signIn(Request $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                "message" => "Email or password incorrect."
            ], 404);
        }

        $permissions = [];
        if (auth()->user()->role->id === 1) {
            $permissions = ['users:all', 'roles:all'];
        } else {
            $permissions = ['users:read', 'roles:read'];
        }

        $token = auth()->user()->createToken("access_token", $permissions)->plainTextToken;

        return response()->json([
            "user" => auth()->user(),
            "token" => $token,
            "message" => "Successful authenticated."
        ]);
    }

    function getAuthData(Request $request)
    {
        return response()->json([
            "user" => auth()->user()
        ], 200);
    }

    function signOut()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "Logout successful."
        ]);
    }
}
