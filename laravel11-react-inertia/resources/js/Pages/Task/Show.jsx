import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from '@/constants.jsx';
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Task: ${task.name}`}
                </h2>
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
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Task Status</label>
                                        <p className='mt-3'>
                                            <span className={'px-2 py-1 rounded text-white ' + 
                                                TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Created By</label>
                                        <p className='mt-1'>{task.createdBy.name}</p>
                                    </div>
                                </div>
                                {/* second column */}
                                <div>
                                    <div>
                                        <label htmlFor="" className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{task.updatedBy.name}</p>
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
            <div className="pb-12">
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
            </div>
        </AuthenticatedLayout>
    )
}