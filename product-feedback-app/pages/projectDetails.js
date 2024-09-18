import NavBar from '../components/NavBar'
import styles from './index.module.css'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import AddFeedBackButton from '../components/AddFeedbackButton'
import { getFeedback, getFeedbackByLeastUpvotes, getFeedbackByMostUpvotes, getFeebackByLeastComments, getFeebackByMostComments, listByCategory } from '../apis/feedback'
import FeedbackItem from '../components/FeebackItem'
import { FeedbackFiltersConstants, FeedbackFiltersPageContext } from '../context/FeedbackFiltersContext'
import { EmptyImage } from '../components/EmptyImage/EmptyImage'

export default function Index() {
  const [suggestionsArray, setSuggestionsArray] = useState([])
  const [filter, setFilter] = useState(FeedbackFiltersConstants.All)
  const context = {
    suggestionsArray: suggestionsArray,
    setSuggestionsArray: setSuggestionsArray,
    filter: filter,
    setFilter: setFilter
  }

  return (
    <div className={`container-fluid ${styles.parent} pb-4`}>
      <FeedbackFiltersPageContext.Provider value={context}>
        <div className='row'>
          <NavBar position='col-lg-3 col-sm-12' />
          <div className='col-lg-8 col-sm-12'>
            <SuggestionsList />
          </div>
        </div>
      </FeedbackFiltersPageContext.Provider>
    </div>
  )
}


function SuggestionsList({ className }) {
  const { suggestionsArray, setSuggestionsArray, filter, setFilter } = useContext(FeedbackFiltersPageContext)
  const router = useRouter()

  useEffect(() => {
    feedbackByFilters(filter).then((result) => {
      if (result) setSuggestionsArray(result)
    })
  }, [filter])

  return (
    <div>
      <div className='d-flex flex-row  align-items-center' style={{ backgroundColor: '#373F68', color: 'white', minHeight: 56 }}>

        <div className='flex-grow-1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-4 d-md-block d-none' style={{ fontWeight: 'bold' }}>{suggestionsArray.length} Suggestions</div>
              <div className='col-8 dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">Sort by: <span >{filter}</span></div>
              <ul className="dropdown-menu" style={{ minWidth: '10rem', maxWidth: '15rem' }}>
                <li onClick={(e) => setFilter(FeedbackFiltersConstants.MostUpvotes)} style={{ borderBottomStyle: 'solid', borderColor: '#979797' }}><a className="dropdown-item " href="#">{FeedbackFiltersConstants.MostUpvotes}</a></li>
                <li onClick={(e) => setFilter(FeedbackFiltersConstants.LeastUpvotes)} style={{ borderBottomStyle: 'solid', borderColor: '#979797' }}><a className="dropdown-item border-bottom-2" href="#">{FeedbackFiltersConstants.LeastUpvotes}</a></li>
                <li onClick={(e) => setFilter(FeedbackFiltersConstants.MostComments)} style={{ borderBottomStyle: 'solid', borderColor: '#979797' }}><a className="dropdown-item border-bottom-2" href="#">{FeedbackFiltersConstants.MostComments}</a></li>
                <li onClick={(e) => setFilter(FeedbackFiltersConstants.LeastComments)} style={{ borderBottomStyle: 'solid', borderColor: '#979797' }} ><a className="dropdown-item border-bottom-2" href="#">{FeedbackFiltersConstants.LeastComments}</a></li>
                <li onClick={(e) => setFilter(FeedbackFiltersConstants.All)}><a className="dropdown-item" href="#">All</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column flex-grow-1 pe-2' >
          <AddFeedBackButton onClick={() => router.push('/NewFeedBack')} />
        </div>
      </div>
      {
        suggestionsArray.length > 0 ? suggestionsArray.map((request, index) => {
          const { title, id, category, upvotes, status, description, comments } = request

          return (
            <FeedbackItem onClick={() => router.push({
              pathname: '/FeedbackDetail',
              query: { ...request }
            })} category={category} comments={comments} description={description} title={title}
              upvotes={upvotes} key={id} />
          )
        }) : <div className='d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: 'white', minHeight: '70vh', width: '100%', color: '#3A4374' }}>
          <EmptyImage />
          <h3 className='pt-2'>There is no feedback yet</h3>
          <p className='text-center'>Got a suggestion? Found a bug that needs to be squashed?<br /> We love hearing about new ideas to improve our app.</p>
          <button onClick={() => router.push('/NewFeedBack')} type="button" className=" btn btn-primary btn-lg d-block" style={{ width: '15rem', height: '3rem', fontSize: '1rem', maxWidth: '30rem', backgroundColor: '#AD1FEA', borderStyle: 'none' }}>Add Feedback</button>

        </div>
      }


    </div>
  )
}





async function feedbackByFilters(filterType) {
  const FEATURE = 0;
  const BUG = 1;
  const ENHANCEMENT = 2;
  const UI = 3;
  const UX = 4;

  let result = []

  if (filterType === FeedbackFiltersConstants.All) {
    result = await getFeedback()
  } else if (filterType === FeedbackFiltersConstants.MostUpvotes) {
    const { mostUpvotes } = await getFeedbackByMostUpvotes()
    result = mostUpvotes
  } else if (filterType === FeedbackFiltersConstants.LeastUpvotes) {
    const { leastUpvotes } = await getFeedbackByLeastUpvotes()
    result = leastUpvotes
  } else if (filterType === FeedbackFiltersConstants.MostComments) {
    const { mostComments } = await getFeebackByMostComments()
    result = mostComments
  } else if (filterType === FeedbackFiltersConstants.LeastComments) {
    const { leastComments } = await getFeebackByLeastComments()
    result = leastComments
  } else if (filterType === FeedbackFiltersConstants.Bug) {
    const { feedbackByCategory } = await listByCategory(BUG)
    result = feedbackByCategory
  } else if (filterType === FeedbackFiltersConstants.Enhancement) {
    const { feedbackByCategory } = await listByCategory(ENHANCEMENT)
    result = feedbackByCategory
  } else if (filterType === FeedbackFiltersConstants.Feature) {
    const { feedbackByCategory } = await listByCategory(FEATURE)
    result = feedbackByCategory
  } else if (filterType === FeedbackFiltersConstants.UI) {
    const { feedbackByCategory } = await listByCategory(UI)
    result = feedbackByCategory
  } else if (filterType === FeedbackFiltersConstants.UX) {
    const { feedbackByCategory } = await listByCategory(UX)
    result = feedbackByCategory
  }

  return result
}