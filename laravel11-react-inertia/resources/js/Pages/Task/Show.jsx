import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from '@/constants.jsx';
import { Head , Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TasksTable from '../Task/TasksTable';

export default function Show({auth, task, tasks, queryParams=null }){
    queryParams = queryParams || {}; 
  
    
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {`Task: ${task.name}`}
                    </h2>
                    <Link href= {route('task.edit', task.id)}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shawdow 
                    transistion-all hover: bg-emerald-600'>
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Task: ${task.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img 
                                src={task.image_path} 
                                alt=""
                                className='w-full h-64 object-cover'
                                    />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <div className='grid gap-1 grid-cols-2 mt-2'>
                                {/* first column */}
                                <div>
                                    <div>
                                        <label htmlFor="font-bold text-lg">Task ID</label>
                                        <p className='mt-1'>{task.id}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Task Name</label>
                                        <p className='mt-1'>{task.name}</p>
                                    </div>
                                    {/* task status */}
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Task Status</label>
                                        <p className='mt-3'>
                                            <span className={'px-2 py-1 rounded text-white ' + 
                                                TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                    {/* priority */}
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Task Priority</label>
                                        <p className='mt-3'>
                                            <span className={'px-2 py-1 rounded text-white ' + 
                                                TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </p>
                                    </div>
                                    {/* created by */}
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Created By</label>
                                        <p className='mt-1'>{task.createdBy.name}</p>
                                    </div>
                                </div>
                                {/* second column */}
                                <div>
                                    {/* due date */}
                                    <div>
                                        <label htmlFor="" className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                    {/* created at */}
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                    {/* updated at */}
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{task.updatedBy.name}</p>
                                    </div>
                                    {/* project detail */}
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Project</label>
                                        <p className='mt-1'>
                                            <Link 
                                                href={route('project.show', task.project.id)}
                                                className = 'hover:underline'>
                                                {task.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                    {/* assigned user id */}
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Assigned User</label>
                                        <p className='mt-1'>{task.assignedUser.name}</p>
                                    </div>
                                </div>   
                            </div>
                            {/* end of grid  */}
                            <div className='mt-4'>
                                <label htmlFor="" className='font-bold text-lg'>Description</label>
                                <p className='mt-1'>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <TasksTable 
                                tasks={tasks}
                                queryParams = {queryParams}
                                hideTaskColumn = {true}
                                 />
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    )
}