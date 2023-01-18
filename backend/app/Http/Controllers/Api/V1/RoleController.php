<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\V1\Role;
use App\Http\Requests\V1\Role\{
    CreateRoleRequest,
    UpdateRoleRequest
};

class RoleController extends Controller
{
    private Role $model;

    function __construct(Role $model)
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
        $roles = $this->model->all();

        return response()->json([
            'roles' => $roles,
            'message' => 'Roles was founded.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRoleRequest $request)
    {
        $role = $this->model->create($request->validated());

        return response()->json([
            'role' => $role,
            'message' => 'Role was successful created.'
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
        $role = $this->model->findOrFail($id);

        return response()->json([
            'role' => $role,
            'message' => 'Role was successful founded.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoleRequest $request, $id)
    {
        $role = $this->model->where("id", $id)->update($request->validated());

        return response()->json([
            'role' => $role,
            'message' => 'Role was successful updated.'
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
        $role = $this->model->where("id", $id)->delete();

        return response()->json([
            'role' => $role,
            'message' => 'Role was successful deleted.'
        ], 204);
    }
}
