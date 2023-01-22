<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ChatController;

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post("/signin", [AuthController::class, "signIn"]);
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::apiResource("/user", UserController::class);
        Route::apiResource("/role", RoleController::class);
        Route::post("/message", [ChatController::class, "message"]);
        Route::get("/auth-data", [AuthController::class, "getAuthData"]);
        Route::post("/signout", [AuthController::class, "signOut"]);
    });
});
