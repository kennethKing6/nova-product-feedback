import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState, createContext, useContext } from 'react'
import AddFeedbackButton from '../../components/AddFeedbackButton'
import ImageFakeData from '../../assets/user-images/image-elijah.jpg'
import FeedbackItem from '../../components/FeebackItem';
import { getComments, postComments, postLevelOneComments, postLevelTwoComments } from '../../apis/comments'
import $ from "jquery";
const CommmentsContext = createContext()

export default function index() {
  const [hasPosted, setHasPosted] = useState()
  const router = useRouter();
  const [comments, setComments] = useState([]);

  const { category, description, title, upvotes, _id } = router.query;

  // const { status, data = [] } = useQuery('comments', () => getComments(_id))

  useEffect(() => {
    getComments(_id).then(({ comments }) => {
      setComments(comments)
    })
  }, [])

  useEffect(() => {
    getComments(_id).then(({ comments }) => {
      setComments(comments)
    })

  }, [hasPosted])

  const contextValue = {
    setHasPosted: setHasPosted,
    hasPosted: hasPosted,
    comments: comments
  }

  return (
    <CommmentsContext.Provider value={contextValue}>
      <div className='container-fluid d-flex flex-column pb-5 h-100' >
        <div className='w-75 mx-auto  mt-3' style={{ fheight: '10vh', }}><TopBar /></div>
        <div className='w-75 mx-auto  mt-3' style={{ height: '20vh', }}><FeedbackItem comments={comments}
          category={category} description={description} title={title} upvotes={upvotes} onClick={() => { }} /></div>
        <div id='recentComment' className='w-75 mx-auto card mt-3 overflow-auto' style={{ maxHeight: '60vh', overflowY: 'scroll' }}><Comments comments={comments} /></div>
        <div className='w-75 mx-auto card mt-3' style={{ height: '30vh', }}><AddComment /></div>

      </div>
    </CommmentsContext.Provider>
  )
}

function TopBar() {
  const router = useRouter()

  return (

    <div className='mb-2 ms-3 mt-3'>
      <div >
        <div className='row pt-2'>
          <div className='col-4 text-center' style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <span style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div onClick={() => router.back()} style={{ cursor: 'pointer' }}>
                <svg style={{ marginTop: '5%', position: 'relative', top: '.1rem' }} width="10" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 5l4-4" stroke="#647196" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
                <span style={{ fontSize: '16px', color: "#647196" }}> Go Back</span>
              </div>
            </span>
          </div>
          <div className='col-8 postion-relative pt-2 text-end pe-3'><button onClick={() => router.push({
            pathname:'/EditFeedback',
            query:router.query
          })} style={{ backgroundColor: '#4661E6', color: 'white' }} className='btn p-3'>Edit Feedback</button></div>
        </div>
      </div>
    </div>
  )
}
function AddComment() {
  const TotalLength = 250;
  const [remainingTextLength, setRemainingTextlength] = useState(TotalLength)
  const [comment, setComment] = useState('')
  const router = useRouter();
  const { setHasPosted, hasPosted } = useContext(CommmentsContext)

  useEffect(() => {
    updateRemainingLength()
  }, [comment])

  function updateRemainingLength() {
    setRemainingTextlength(TotalLength - comment.length)
  }
  return (
    <>
      <h5 className='w-75 mx-auto mt-3'>Add Comment</h5>
      <textarea className="form-control  w-75 mx-auto" id="exampleFormControlTextarea1" rows="5"
        placeholder='Type your comment here'
        value={comment}
        style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}
        onChange={(input) => {
          if (remainingTextLength >= 1 || comment.length > input.target.value.length) {
            setComment(input.target.value)

          }
        }} />
      <div className='row mt-5 w-75 m-auto'>
        <div className='col-8'><p className=' mx-auto' style={{ color: '#647196' }}>{remainingTextLength} characters left</p></div>
        <div className='col-4 text-end pe-4 pb-4'>
          <button type='button' className='btn btn-lg'
            style={{ backgroundColor: '#AD1FEA', color: 'white' }}
            onClick={async () => {
              const { _id } = router.query
              try {
                await postComments(_id, comment)
                setComment('')
                setHasPosted(Math.random() * Math.random())
                $('#recentComment').stop().animate({
                  scrollTop: $('#recentComment')[0].scrollHeight + ($('#recentComment')[0].scrollHeight * 0.6)
                }, 800);
              } catch (err) {
                alert("Failed to post")
              }
            }}
          >Post Comment</button>
        </div>
      </div>
    </>
  )
}

function AddReply({postReplyID,comment}) {
  const TotalLength = 250;
  const [remainingTextLength, setRemainingTextlength] = useState(TotalLength)
  const [reply, setComment] = useState('')
  const router = useRouter();
  const { setHasPosted, hasPosted } = useContext(CommmentsContext)
  const {_id,user = {},createdAt} = comment
  const {username = 'username'} = user;

  useEffect(() => {
    updateRemainingLength()
  }, [reply])

  function updateRemainingLength() {
    setRemainingTextlength(TotalLength - reply.length)
  }
  return (
    <div className='w-100 row ms-5'>
      <div className='col-9'>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
          placeholder='Type your reply here'
          value={reply}
          style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}
          onChange={(input) => {
            if (remainingTextLength >= 1 || reply.length > input.target.value.length) {
              setComment(input.target.value)
            }
          }} />
      </div>
      <div className='col-3'>
        <button type='button' className='btn btn-lg col-3 w-75'
          style={{ backgroundColor: '#AD1FEA', color: 'white' }}
          onClick={async () => {
            try {
              await postLevelOneComments(_id, reply,username)
              setComment('')
              setHasPosted(Math.random() * Math.random())
              $(`#${createdAt}`).click()
              window.location.href = `#${postReplyID}`

            } catch (err) {
              alert("Failed to reply")
            }
          }}
        >Post reply</button>

      </div>
    </div>
  )
}

function AddSecondLevelReply({postReplyID,reply}) {
  const TotalLength = 250;
  const [remainingTextLength, setRemainingTextlength] = useState(TotalLength)
  const [secondLevelReply, setSecondLevelReply] = useState('')
  const { setHasPosted } = useContext(CommmentsContext)
  const {_id = '',user = {},createdAt} = reply
  const {username = 'username'} = user;


  useEffect(() => {
    updateRemainingLength()
  }, [secondLevelReply])

  function updateRemainingLength() {
    setRemainingTextlength(TotalLength - secondLevelReply.length)
  }
  return (
    <div className='w-100 row ms-5'>
      <div className='col-9'>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
          placeholder='Type your reply here'
          value={secondLevelReply}
          style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}
          onChange={(input) => {
            console.log(`input.target.value:${input.target.value}`)
            if (remainingTextLength >= 1 || secondLevelReply.length > input.target.value.length) {
              setSecondLevelReply(input.target.value)
            }
          }} />
      </div>
      <div className='col-3'>
        <button type='button' className='btn btn-lg col-3 w-75'
          style={{ backgroundColor: '#AD1FEA', color: 'white' }}
          onClick={async () => {
            try {
              await postLevelTwoComments(_id,secondLevelReply,username)
              setSecondLevelReply('')
              setHasPosted(Math.random() * Math.random())
              $(`#${createdAt}`).click()
              window.location.href = `#${postReplyID}`

            } catch (err) {
              alert("Failed to reply")
            }
          }}
        >Post reply</button>

      </div>
    </div>
  )
}

function Comments() {
  return (
    <FirstLevelComments />

  )
}

function FirstLevelComments() {

  const { comments } = useContext(CommmentsContext)


  if (Array.isArray(comments)) {
    return (
      <>
        <h5 className='w-75 mx-auto mt-3'>{Array.isArray(comments) ? comments.length : 0} Comments</h5>
        {comments.map((comment, index) => {
          const { content, user = {}, replies = [],_id,createdAt } = comment;
          const { name = 'name', username = 'username' } = user
          const id = "doctorbot_" + _id;

          return (
            <div className='w-75 mx-auto mt-5'>
              <div className='row' >
                <div className='col-10 d-flex flex-row justify-content-start'>
                  <div><Image height={90} width={90} src={ImageFakeData} style={{ borderRadius: '2.5rem', padding: 5 }} /></div>
                  <div className='d-flex justify-content-center align-items-start flex-column ps-3 pt-2' >
                    <h6>{name}</h6>
                    <p>{username}</p>
                    <p>{content}</p>
                  </div>
                </div>
                <div className='col-2 '>
                  <p id={`${createdAt}`} style={{ color: '#4661E6' }} type="button" data-bs-toggle={`collapse`} data-bs-target={`#${id}`} aria-expanded="false" aria-controls={`${id}`}>
                    Reply
                  </p>
                </div>
              </div>
              <div className="collapse" id={`${id}`}><AddReply  postReplyID={id} comment={comment}/></div>
              {replies.length > 0 ? <>
                <hr style={{ borderBottomStyle: 'solid', borderBottomWidth: 1 }} />
                <SecondLevelComments replies={replies} />
              </> : <></>}
            </div>
          )
        })}
      </>
    )
  } else {
    return <></>
  }


}

function SecondLevelComments({ replies }) {
  return (
    <>
      {replies.map((reply, index) => {
        const { content, replyingTo, user, replies,_id,createdAt } = reply
        const { name = 'name', username = 'username' } = user
        const id = `level_one_${_id}`
        return (
          <div className='w-75 mx-auto '>
            <div className=''>
              <div className='row' >
                <div className='col-10 d-flex flex-row justify-content-start'>
                  <div><Image height={90} width={90} src={ImageFakeData} style={{ borderRadius: '2.5rem', padding: 5 }} /></div>
                  <div className='d-flex justify-content-center align-items-start flex-column ps-3 pt-2' >
                    <h6>{name}</h6>
                    <p>{username}</p>
                    <p><span style={{ color: '#AD1FEA', fontWeight: 'bold' }}>@{replyingTo}</span> {content}</p>
                  </div>
                </div>
                <div className='col-2 '>
                  <p style={{ color: '#4661E6' }} id={`${createdAt}`}  type="button" data-bs-toggle={`collapse`} data-bs-target={`#${id}`} aria-expanded="false" aria-controls={`${id}`}>
                    Reply</p>
                </div>
              </div>
              <div className="collapse" id={`${id}`}><AddSecondLevelReply  postReplyID={id} reply={reply}/></div>
              {replies.length > 0 ? <ThirdLevelComments replies={replies} /> : <></>}
            </div>
          </div>
        )
      })}
    </>
  )
}

function ThirdLevelComments({ replies }) {
  return (
    <>
      {replies.map((reply, index) => {
        const { content, replyingTo, user, } = reply
        const { name = 'name', username = 'username' } = user
        return (
          <div className=''>
            <div className='w-75 mx-auto'>
              <div className='row' >
                <div className='col-10 d-flex flex-row justify-content-start'>
                  <div><Image height={100} width={100} src={ImageFakeData} style={{ borderRadius: '2.5rem', padding: 5 }} /></div>
                  <div className='d-flex justify-content-center align-items-start flex-column ps-3 pt-2' >
                    <h6>{name}</h6>
                    <p>{username}</p>
                    <p><span style={{ color: '#AD1FEA', fontWeight: 'bold' }}>@{replyingTo}</span> {content}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}