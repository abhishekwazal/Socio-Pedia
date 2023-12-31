import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget"

const PostsWidget = ({userId,isProfile=false}) => {
    const dispatch =useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async() => {
        const response = await fetch("http://localhost:3001/posts",{
            method:"GET",
            headers: {Authorization : `Bearer $`}
        })
        const data = await response.json()
        console.log(data);
        dispatch(setPosts({posts:data}))
    }

    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3001/${userId}/posts`,{
            method:"GET",
            headers: {Authorization : `Bearer $`}
        })
        const data = await response.json()
        dispatch(setPosts({posts:data}))
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts()
        }else {
            getPosts()
        }
    }, [])

    return (
        <>
        {Array.from(posts).map(
            ({
                _id,
                userId,
                fistName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
            }) => (
                <PostWidget
                key={_id}
                postId={_id}
                userId={userId}
                name={`${fistName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                />
            )
        )}
        </>
    )
}

export default PostsWidget