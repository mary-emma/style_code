import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '@/services'

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    }, [])

    const handleCommentsSubmission = () => {
        setError(false)

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true)
            return
        }

        const commentObj = { name, email, comment, slug }

        console.log(storeData)
        if (storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('email')
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="mb-8 text-xl border-b font-semibold pb-4">
                Leave a Reply
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment"
                    name="comment" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text"
                    ref={nameEl}
                    className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="name" />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <input type="text"
                    ref={emailEl}
                    className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="email" />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" name="storeData" id="storeData" value="true" />
                    <label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">Save my email and name for the next time I comment</label>
                </div>
            </div>
            {error && <p className="text-red-500 text-xs">All fields are required</p>}
            <div className="mt-8">
                <button type="button" onClick={handleCommentsSubmission}
                    className="transition duration-400 ease hover:bg-indigo-500 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer">
                    Post Comment
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold text-indigo-500 mt-3">Your comment has been submitted for review</span>}
            </div>
            <h1>Comments Forms</h1>
        </div>
    )
}

export default CommentsForm
