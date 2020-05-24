import React, { useRef } from 'react';
import axios from '../../axios'
import Button from '@material-ui/core/Button'


const Blog = (props) => {
    const fileRef = useRef();

    const onSubmitHandler = (e) => {
        e.preventDefault()
        // console.log(fileRef.current.files[0])
        axios.post("/images", {
            "image": fileRef.current.files[0]
        }, {
            headers: { "content-type": "image/png" }
        })
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                ref={fileRef}
            ></input>
            <Button varient="contained" type="submit">Upload</Button>
        </form>
    );
};
export default Blog;