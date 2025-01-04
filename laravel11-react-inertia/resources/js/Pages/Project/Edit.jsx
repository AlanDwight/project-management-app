import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from '@/constants.jsx';
import { Head , Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextAreaInput from '@/Components/TextAreaInput';

export default function Edit({auth, project}){ 
    // inertia class
    const {data, setData, post, errors, reset} =useForm({
        image: '',
        name : project.name || "", 
        status : project.status || "", 
        description : project.description || "", 
        due_date : project.due_date || "", 
        _method : 'PUT'
    })

    const onSubmit = (e)=>{ 
        e.preventDefault(); 
        post(route('project.update', project.id));
    }

    return( 
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Project "{project.name}"
                    </h2>
                </div>
            }

        >
        <Head title="Projects (Edit)" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                            <form 
                                onSubmit={onSubmit} 
                                action="" 
                                className='p-4 sm:p-8 bg-white dark:bg-gray-800
                                shadow sm:rounded-lg'>
                                
                                
                                {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
                                {project.image_path && 
                                    <div className='mb-4'>
                                        <img src={project.image_path} className='w-64' alt="" />
                                    </div>}
                                
                                <div>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "project_image_path"
                                        value = "Project Image"
                                    />
                                    <TextInput 
                                        id = "project_image_path"
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
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "project_name"
                                        value = "Project Name"
                                    />
                                    <TextInput 
                                        id = "project_name"
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
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "project_description"
                                        value = "Project Description"
                                    />
                                    <TextAreaInput
                                        id = "project_description"
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
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "project_due_date"
                                        value = "Project Deadline"
                                    />
                                    <TextInput
                                        id = "project_due_date"
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
                                <div className='mt-4'>
                                    {/* laravel breeze component */}
                                    <InputLabel 
                                        htmlFor = "project_status"
                                        value = "Project Status"
                                    />
                                    <SelectInput
                                        id = "project_status"
                                        
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
                                <div className='mt-4 text-right'>
                                    <Link href={route('project.index')} className='bg-gray-100 py-1 px-3 text-gray-800
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