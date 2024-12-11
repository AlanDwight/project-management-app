import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from '@/constants.jsx';
import { Head , Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TasksTable from '../Task/TasksTable';

export default function Show({auth, project, tasks, queryParams=null }){
    queryParams = queryParams || {}; 
  
    
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Project: ${project.name}`}
                </h2>
            }
        >
            <Head title={`Project: ${project.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img 
                                src={project.image_path} 
                                alt=""
                                className='w-full h-64 object-cover'
                                    />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <div className='grid gap-1 grid-cols-2 mt-2'>
                                {/* first column */}
                                <div>
                                    <div>
                                        <label htmlFor="font-bold text-lg">Project ID</label>
                                        <p className='mt-1'>{project.id}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Project Name</label>
                                        <p className='mt-1'>{project.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Project Status</label>
                                        <p className='mt-3'>
                                            <span className={'px-2 py-1 rounded text-white ' + 
                                                PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="font-bold text-lg">Created By</label>
                                        <p className='mt-1'>{project.createdBy.name}</p>
                                    </div>
                                </div>
                                {/* second column */}
                                <div>
                                    <div>
                                        <label htmlFor="" className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{project.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{project.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="" className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{project.updatedBy.name}</p>
                                    </div>
                                </div>   
                            </div>
                            {/* end of grid  */}
                            <div className='mt-4'>
                                <label htmlFor="" className='font-bold text-lg'>Description</label>
                                <p className='mt-1'>{project.description}</p>
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
                                hideProjectColumn = {true}
                                 />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}