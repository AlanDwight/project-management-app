<?php

namespace App\Http\Controllers;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task:: query();

        $sortField = request('sort_field', 'created_at'); 
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')){ 
            $query -> where('name', 'like', '%' . request('name') . '%' );
        }

        if (request('status')){ 
            $query -> where('status',request('status') );
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1); 

        return Inertia::render('Task/Index', [
            'tasks' => TaskResource:: collection($tasks),
            'queryParams' => request() -> query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();

        return Inertia::render('Task/Create', [
            'projects' => ProjectResource:: collection($projects), 
            'users' => UserResource:: collection($users), 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request -> validated();
        /** @var $image \Illuminate\Http\UploadedFile  */
        $image = $data['image'] ?? null ; // get the image otherwise null 
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image){ 
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        Task::create($data); 
        return to_route('task.index')->with('success', 'Task was created');  

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {  
        return Inertia::render('Task/Show',[
            'task' => new TaskResource($task),
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();

        return Inertia::render('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource:: collection($projects), 
            'users' => UserResource:: collection($users),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        // dd($data);
        $image = $data['image'] ?? null ; // get the image otherwise null 
        $data['updated_by'] = Auth::id();
        if($image){ 
            //check if previous image exit 
            if($task->image_path){ 
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task-> update($data); 
        return to_route('task.index')->with('success', "Task \"$task->name\" was updated.");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete(); 
        if($task->image_path){ 
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')->with('success', "Task \"$name\" was deleted");

    }

    public function myTasks(){ 
        $user = auth()->user(); 
        $query = Task:: query()->where('assigned_user_id', $user->id);

        $sortField = request('sort_field', 'created_at'); 
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')){ 
            $query -> where('name', 'like', '%' . request('name') . '%' );
        }

        if (request('status')){ 
            $query -> where('status',request('status') );
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1); 

        return Inertia::render('Task/Index', [
            'tasks' => TaskResource:: collection($tasks),
            'queryParams' => request() -> query() ?: null,
            'success' => session('success'),
        ]); 
    }
}
