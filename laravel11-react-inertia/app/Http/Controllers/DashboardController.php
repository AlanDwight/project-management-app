<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Http\Resources\TaskResource;



class DashboardController extends Controller
{
    public function index(){ 
        $user = auth()->user();
        // pending
        $totalPendingTasks = Task::query()-> where('status', 'pending')-> count();
        $myPendingTasks = Task::query()-> where('status', 'pending')->where('assigned_user_id', $user->id)-> count();
        // in progress
        $totalInProgressTasks = Task::query()-> where('status', 'in_progress')-> count();
        $myInProgressTasks = Task::query()-> where('status', 'in_progress')->where('assigned_user_id', $user->id)-> count();
        // completed
        $totalCompletedTasks = Task::query()-> where('status', 'completed')-> count();
        $myCompletedTasks = Task::query()-> where('status', 'completed')->where('assigned_user_id', $user->id)-> count();

        // active tasks 
        $activeTasks = Task::query()->whereIn('status', ['pending', 'in_progress'])
                                    ->where('assigned_user_id', $user->id)
                                    ->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);
        return Inertia::render('Dashboard',[
            'totalPendingTasks' =>         $totalPendingTasks, 
            'myPendingTasks'       =>      $myPendingTasks,
            'totalInProgressTasks' =>      $totalInProgressTasks,
            'myInProgressTasks'    =>      $myInProgressTasks,
            'totalCompletedTasks'  =>      $totalCompletedTasks,
            'myCompletedTasks'     =>      $myCompletedTasks,
            'activeTasks'          =>      $activeTasks,
        ]);
    }
}
