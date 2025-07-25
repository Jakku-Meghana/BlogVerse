import React, { useEffect, useState } from 'react'
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName'

const AddBlog = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })

    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()

    const [showRequestInput, setShowRequestInput] = useState(false)
    const [requestedCategory, setRequestedCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const formSchema = z.object({
        category: z.string().min(3, 'Category must be at least 3 character long.'),
        title: z.string().min(3, 'Title must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
        blogContent: z.string().min(3, 'Blog content must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: '',
            title: '',
            slug: '',
            blogContent: '',
        },
    })

    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue('blogContent', data)
    }

    const blogTitle = form.watch('title')

    useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle])

    const handleCategoryChange = (value) => {
        if (value === 'request') {
            setShowRequestInput(true)
            setSelectedCategory("")
            form.setValue('category', "")
        } else {
            setSelectedCategory(value)
            setShowRequestInput(false)
            form.setValue('category', value)
        }
    }

    const handleRequestCategoryKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const trimmed = requestedCategory.trim()
            if (trimmed.length < 3) {
                return showToast('error', 'Category name must be at least 3 characters.')
            }

            try {
                const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category-requests/request`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ name: trimmed }),
                })

                const result = await response.json()
                if (!response.ok) {
                    return showToast('error', result.message || 'Failed to request category')
                }

                showToast('success', 'Category request submitted.')
                setRequestedCategory("")
                setShowRequestInput(false)
            } catch (err) {
                console.error(err)
                showToast('error', 'Something went wrong.')
            }
        }
    }

    async function onSubmit(values) {
        try {
            if (showRequestInput && requestedCategory.trim().length < 3) {
                return showToast('error', 'Requested category must be at least 3 characters.')
            }

            const newValues = {
                ...values,
                author: user.user._id,
                requestedCategory: showRequestInput ? requestedCategory : undefined
            }

            if (!file) {
                return showToast('error', 'Feature image required.')
            }

            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(newValues))

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }

            form.reset()
            setFile()
            setPreview()
            setRequestedCategory("")
            setShowRequestInput(false)
            navigate(RouteBlog)
            showToast('success', data.message)

        } catch (error) {
            showToast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    return (
        <div>
            <Card className="pt-5">
                <CardContent>
                    <h1 className='text-2xl font-bold mb-4'>Add Blog</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <>
                                                    <Select
                                                        onValueChange={handleCategoryChange}
                                                        value={selectedCategory}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categoryData?.category?.map(category => (
                                                                <SelectItem key={category._id} value={category._id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                            <SelectItem value="request" className="text-blue-600">
                                                                + Request New Category
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    {showRequestInput && (
                                                        <Input
                                                            className="mt-2"
                                                            placeholder="Enter category name to request"
                                                            value={requestedCategory}
                                                            onChange={(e) => setRequestedCategory(e.target.value)}
                                                            onKeyDown={handleRequestCategoryKeyDown}
                                                        />
                                                    )}
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter blog title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mb-3'>
                                <span className='mb-2 block'>Featured Image</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded'>
                                                {filePreview ? <img src={filePreview} /> : <span>Upload</span>}
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blog Content</FormLabel>
                                            <FormControl>
                                                <Editor props={{ initialData: '', onChange: handleEditorData }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog
