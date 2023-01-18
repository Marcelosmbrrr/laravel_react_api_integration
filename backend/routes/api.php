<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post("/signin", [AuthController::class, "signIn"]);
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::apiResource("/user", UserController::class);
        Route::apiResource("/role", RoleController::class);
        Route::get("/auth-data", [AuthController::class, "getAuthData"]);
        Route::post("/signout", [AuthController::class, "signOut"]);
    });
});