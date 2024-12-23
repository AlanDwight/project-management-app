<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// use Illuminate\Support\Carbon;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false ; // object wrapping to false 

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, 
            'name' => $this->name , 
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this -> status ,
            'priority' => $this -> priority, 
            'image_path'=> $this->image_path ?Storage::url($this->image_path) : '',
            'project' => new ProjectResource($this->project),
            'project_id' => $this->project_id,
            'assigned_user_id' => $this->assigned_user_id,
            'assignedUser' =>$this->assignedUser 
                                ? new UserResource($this -> assignedUser) 
                                : null , 
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
