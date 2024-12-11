import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from '@/constants.jsx';
import { Head , Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TasksTable from './TasksTable';

export default function Index({auth, tasks, queryParams = null }){
    queryParams = queryParams || {}; 
    

    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    tasks
                </h2>
            }
        >
            <Head title="tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <TasksTable 
                                tasks={tasks}
                                queryParams = {queryParams}
                                 />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}