import React, { useEffect, useState } from 'react'
import { Alert, Spinner, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../../config'
import AdCard from '../../features/AdCard/AdCard'

const SearchPage = () => {
  const { searchPhrase } = useParams()
	const [status, setStatus] = useState(null)
	const [adsToShow, setAdsToShow] = useState([])

	useEffect(() => {
		setStatus('loading')

		const options = {
			method: 'GET',
		}
		fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
			.then(res => {
				if (res.status !== 200) {
					setStatus('serverError')
				} else {
					setStatus('')
					return res.json()
				}
			})
			.then(ads => setAdsToShow(ads))
			.catch(() => setStatus('serverError'))
	}, [searchPhrase])
	if (!adsToShow) return <p>Nothing matches your search....</p>

	return (
		<Container className='min-vh-100'>
			<h1 className='m-3 d-flex justify-content-center text-primary'>Search result</h1>
			<p className='text-primary'><i>Search phrase: &quot;{searchPhrase}&quot;</i></p>
			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}

			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Unexpected error...Try again!.</p>
				</Alert>
			)}

			<div className='d-flex justify-content-start flex-wrap mt-4'>
				{adsToShow.map((ad, i) => (
					<AdCard key={ad._id} ad={ad}/>
				))}
			</div>
		</Container>
	)
};

export default SearchPage;