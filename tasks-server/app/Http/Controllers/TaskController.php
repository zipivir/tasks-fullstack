<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Task;
use DB;

class TaskController extends Controller
{
    public function index() 
    {
        $tasks = DB::table('tasks')->get();
        return $tasks;
    }

    public function create(Request $request)
    {
        Log::debug('create task request: '.$request);
        $task = Task::create([
            'name' => $request->name,
            'done' => false
        ]);
        return $task;
    }

    public function update(Request $request, $id)
    {
        Log::debug('update task request: '.$request);
        $task = DB::table('tasks')
                ->where('id', $id)
                ->update([$request->field => $request->value]);
        return $task;
    }

    public function delete(Request $request, $id)
    {
        // $logger->info('request '.$request);
        $task = DB::table('tasks')
                ->where('id', $id)
                ->delete();
        return $task;
    }
}
