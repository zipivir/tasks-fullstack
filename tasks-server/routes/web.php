<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::resource('task', 'TaskController');

Route::get('/tasks', 'App\Http\Controllers\TaskController@index'); //{
    // return view('welcome');
// });

/**
 * Add New Task
 */
Route::post('/tasks', 'App\Http\Controllers\TaskController@create');

/**
 * Update Task
 */
Route::put('/tasks/{id}', 'App\Http\Controllers\TaskController@update');

/**
 * Delete Task
 */
Route::delete('/tasks/{task}', function (Task $task) {
    //
});

Route::get('/token', function (Request $request) {
    $token = $request->session()->token();

    //$token = csrf_token();

    return $token;
});
