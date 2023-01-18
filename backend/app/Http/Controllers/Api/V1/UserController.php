<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\V1\User\{
    CreateUserRequest,
    UpdateUserRequest
};

class UserController extends Controller
{
    private User $model;

    function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->model->with('role')->get();

        return response()->json([
            'users' => $users,
            'message' => 'Users was founded.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $user = $this->model->create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role_id" => $request->role ?? 1
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'User was successful created.'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->model->findOrFail($id);

        return response()->json([
            'user' => $user,
            'message' => 'User was successful founded.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->model->where("id", $id)->update($request->validated());

        return response()->json([
            'user' => $user,
            'message' => 'User was successful updated.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->model->find($id);

        $user->delete();

        return response()->json([
            'user' => $user,
            'message' => 'Users was successful deleted.'
        ], 204);
    }
}
