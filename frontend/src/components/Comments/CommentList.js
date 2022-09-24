import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  fetchPostCommentAction,
  deleteCommentAction,
} from "../../Redux/Slices/comments/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UpdateComment from "./UpdateComment";

export default function CommentsList({ id }) {
  const dispatch = useDispatch();
  // const [item,setItem]=useState([]);
  const [visible, setVisible] = useState(3);
  const [show, setShow] = useState(false);
  const [commentId, setCommentId] = useState("");

  // console.log(id);

  // let  comment=useSelector(state=>state.comment);
  // const {commentCreated}=comment
  // console.log(commentCreated);

  const showMore = () => {
    setVisible((preValue) => preValue + 3);
  };
  const showless = () => {
    setVisible((preValue) => 3);
  };

  const state = useSelector((state) => state?.comment);
  const {
    loading,
    appErr,
    serverErr,
    comments,
    commentCreated,
    deletedComment,
    updatedComment,
  } = state;

  useEffect(() => {
    dispatch(fetchPostCommentAction(id));
    setCommentId("");
  }, [dispatch, commentCreated, deletedComment, updatedComment]);

  const user = useSelector((state) => state?.users);
  const _id = user?.userAuth?._id;
  // const isCreatedBy = PostDetails?.user?._id === _id;

  const sowform = (id) => {
    if (id != commentId) {
      setCommentId(id);
    } else if (commentId) {
      setCommentId("");
    } else {
      setCommentId(id);
    }
  };

  return (
    <div>
      <ul className="divide-y bg-gray-200  divide-gray-500 p-3 mt-5">
        <div className="text-gray-400">{comments?.length} Total Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-gray-900 text-lg text-center">No comments</h1>
          ) : (
            comments?.slice(0, visible).map((comment) => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.userId?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment?.user?._id}`}>
                        <h3 className="text-sm font-medium text-gray-900">
                          {comment?.userId?.name}
                        </h3>
                        </Link>
                        <p className="text-bold text-gray-900 text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                          {comment?.isEdited ? (
                            <span className="text-gray-500">(Edited)</span>
                          ) : null}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}
                            {_id===comment?.userId?._id ? (
                              <p class="flex">
                        {/* <Link to={""} class="p-3">
                          <PencilAltIcon class="h-5 mt-3 text-gray-600" />
                        </Link> */}
                        <button
                          onClick={() => {
                            sowform(comment._id);
                          }}
                        >
                          <PencilAltIcon class="h-5 mt-3 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            dispatch(deleteCommentAction(comment?._id))
                          }
                          class="ml-3"
                        >
                          <TrashIcon class="h-5 mt-3 text-red-500" />
                        </button>
                      </p>
                            ):null
                          }
                      
                          {commentId === comment._id && (
                            <UpdateComment id={comment._id} />
                          )}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
        {comments?.length > 3 ? (
          <div className="flex justify-between">
            <button onClick={showless} className="mt-3 text-gray-400">
              showless
            </button>
            <button onClick={showMore} className="mt-3 text-gray-400">
              showMore
            </button>
          </div>
        ) : null}
      </ul>
    </div>
  );
}
