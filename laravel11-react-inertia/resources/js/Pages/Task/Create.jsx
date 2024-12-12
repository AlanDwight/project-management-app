import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from '@/constants.jsx';
import { Head , Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextAreaInput from '@/Components/TextAreaInput';

export default function Create({auth, projects, users}){ 
    // inertia class
    const {data, setData, post, errors, reset} =useForm({
        image: '',
        name : "", 
        status : '', 
        dscription : '', 
        due_date : '', 

    })

    const onSubmit = (e)=>{ 
        e.preventDefault(); 
        post(route('task.store'));
    }

    return( 
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create New Task
                    </h2>
                </div>
            }

        >
        <Head title="Tasks" />
            {/* <pre>{JSON.stringify(projects, undefined,2)}</pre> */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <form 
                                onSubmit={onSubmit} 
                                action="" 
                                className='p-4 sm:p-8 bg-white dark:bg-gray-800
                                            shadow sm:rounded-lg'>
                                
                                {/* project selection for task */}
                                <div className=''>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_project_id"
                                        value = "Project"
                                    />
                                    <SelectInput
                                        id = "task_project_id"
                                        
                                        name = "project_id"
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('project_id', e.target.value)}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.data.map(project => { 
                                            return ( 
                                                <option value={project.id} key={project.id}>{project.name}</option>
                                            )
                                        })}
                                    </SelectInput>
                                    <InputError
                                        message={errors.priority}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* Image path */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_image_path"
                                        value = "Task Image"
                                    />
                                    <TextInput 
                                        id = "task_image_path"
                                        type = "file"
                                        name = "image"
                                        // value = {data.Image}
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('image', e.target.files[0])}
                                    />
                                    <InputError
                                        message={errors.image}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* Task name */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_name"
                                        value = "Task Name"
                                    />
                                    <TextInput 
                                        id = "task_name"
                                        type = "text"
                                        name = "name"
                                        isFocused = {true}
                                        value = {data.name}
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('name', e.target.value)}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* Task Description */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_description"
                                        value = "Task Description"
                                    />
                                    <TextAreaInput
                                        id = "task_description"
                                        type = "text"
                                        name = "description"
                                        value = {data.description}
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('description', e.target.value)}
                                    />
                                    <InputError
                                        message={errors.description}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* task deadline */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_due_date"
                                        value = "Task Deadline"
                                    />
                                    <TextInput
                                        id = "task_due_date"
                                        type = "date"
                                        name = "due_date"
                                        value = {data.due_date}
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('due_date', e.target.value)}
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* task status */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_status"
                                        value = "Task Status"
                                    />
                                    <SelectInput
                                        id = "task_status"
                                        
                                        name = "status"
                                        value = {data.status}
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.status}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* task priority */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_priority"
                                        value = "Task Priority"
                                    />
                                    <SelectInput
                                        id = "task_priority"
                                        
                                        name = "priority"
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.priority}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* assigned user to task */}
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "task_assigned_user"
                                        value = "Assigned User"
                                    />
                                    <SelectInput
                                        id = "task_assigned_user"
                                        
                                        name = "assigned_user_id"
                                        className = "mt-1 block w-full"
                                        onChange = {e => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map(user => { 
                                            return ( 
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            )
                                        })}

                                    </SelectInput>
                                    <InputError
                                        message={errors.assigned_user_id}
                                        className='mt-2' 
                                    />
                                </div>
                                {/* create and cancel button */}
                                <div className='mt-4 text-right'>
                                    <Link href={route('task.index')} className='bg-gray-100 py-1 px-3 text-gray-800
                                    rounded shadow transistion-all hover:bg-gray-200 mr-2'>
                                        Cancel
                                    </Link>
                                    <button className='bg-emerald-500 text-white py-1 px-3 
                                    rounded shadow transistion-all hover:bg-emerald-600'>Submit</button>
                                </div>
                                
                            </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}