<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        // $logger->info('request '.$request);
        $task = DB::table('tasks')->insert([
            'name' => $request->name,
            'done' => false
        ]);
        return $task;
    }

    public function update(Request $request, $id)
    {
        // $logger->info('request '.$request);
        $task = DB::table('tasks')
                ->where('id', $id)
                ->update(['done' => $request->done]);
    }
}
