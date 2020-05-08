import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import calendar from 'dayjs/plugin/calendar'
import { nanoid } from 'nanoid'
import clsx from 'clsx'
import { data as messages } from './data'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Card, CardBody } from 'reactstrap'

// extends plugin
dayjs.extend(localizedFormat)
dayjs.extend(calendar)

// first we create date divider
const DateDivider = props => {
	const { date, previousDate } = props
	const dateDivider = useMemo(() => {
		// the value of date divider is TODAY,YESTERDAY,
		// if same week but not yesterday or today, displat sun mon thu etc etc
		// if same month but not same week, display day, 1st,2nd,3rd etc etc
		// if same year but not same month, display day and month 1s Jan, 2nd Feb etc etc
		// if not same year, display day, month and year, 1st Jan 2010. 2nd Feb 2011 etc etc.
		// of course everything should be in locale
		// =================================
		// first we need to decide whether to show the date divider or not
		// there are two main conditions
		// first, check whether this is the first message, if it is first, then show
		// second, check if this message date is different than last message date

		const showDateDivider =
			!previousDate || !dayjs(date).isSame(previousDate, 'day')
		// if there is no previous message, then there is no previous date
		// now we check whether date and previous date are the same
		// if you check whether the day is same or not, it will also check month and year
		// now the condition to show date divider is ready
		// next we need to decide what to show\
		if (showDateDivider) {
			// first we need to start from highest priority, we need to check is it today?
			// dayjs() is equal to new Date() which is today
			if (dayjs().isSame(date, 'day')) {
				return dayjs().calendar().split(' ')[0]
				// returning TODAY is obviously not locale, because it is always english
				// if you want locale, you need to use dayjs calendar
				// in order to do this we need to extends some dayjs plugin
				// this will return 'TODAY' of your browser language
				// ok, so this is how you debug your code
				// always use your brain, be deductive,
				// just like you want to track down a criminal or a wild beast
				// now we going to finish the rest
			} else if (dayjs().isSame(dayjs(date).add(1, 'day'), 'day')) {
				return dayjs(date).calendar().split(' ')[0]
				// yesterday
			} else if (dayjs().isSame(date, 'week')) {
				// check whether it is same week
				return dayjs(date).format('dddd') // return SUN, MON, THU, WED etc etc
			} else if (dayjs().isSame(date, 'month')) {
				// check whether same month
				return dayjs(date).format('D') // return 1st, 2nd, 3rd, 4th etc etc
			} else if (dayjs().isSame(date, 'year')) {
				// check if same year
				return dayjs(date).format('D MMM YYYY') // return day month year
			}
		} else {
			return null
		}
	}, [date, previousDate])
	return dateDivider ? (
		<Row className='mt-4'>
			<Col className='text-center' md='12'>
				<Badge className='text-white'>{dateDivider}</Badge>
			</Col>
		</Row>
	) : null
}

// then we create message
// dayjs has the same api as momentjs
const Message = props => {
	const { date, previousDate, receiver, body, error, sending } = props
	const date_ = useMemo(() => {
		return dayjs(date).format('LT') // eg 8:30 PM
	}, [date])
	return (
		<>
			<DateDivider date={date} previousDate={previousDate} />
			<Row
				className={
					receiver
						? 'justify-content-end text-receiver'
						: 'justify-content-start text-left'
				}
			>
				<Col xs='auto' className={clsx(receiver ? 'pl-5' : 'pr-5')}>
					<Card className={clsx(receiver && 'bg-info text-white')}>
						<CardBody className='p-2'>
							<p>{body}</p>
							<div>
								<small
									className={clsx('opacity-60', error && ' font-weight-bold')}
									style={receiver && error ? { color: 'red' } : {}}
								>
									{receiver && error ? 'failed to send, click to retry' : date_}
									{receiver && (
										<i
											className={
												error
													? 'tim-icons icon-simple-remove'
													: sending
													? 'far fa-clock'
													: 'tim-icons icon-check-2'
											}
										/>
									)}
								</small>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

// so now message is done in
// we do something with container...or maybe not
// this is only front end, so data is premade, for backend data, wait for part 2

// remember to always include key, or else react cant keep track of you children,
// this result in extra rerendering/mount/unmount
// include the KEY props, always, damn it //<-- cant believe people are complaining this damn it
const ChatBox = props => {
	const uids = useMemo(() => {
		// nanoid return unique string
		return messages.map(() => nanoid())
	}, [])

	return (
		<div className='bg-primary'>
			<Container className='bg-white' style={{ width: '50%' }}>
				{messages.map((message, index) => {
					return (
						<Message
							key={uids[index]}
							{...message}
							previousDate={messages[index - 1] && messages[index - 1].date}
						/>
					) // this is how you do key
					// with useMemo and uid generator, it guarantee no mistake(reuse same id, array size change, etc etc)
					// so obviously no previous date here, we need to add it
				})}
			</Container>
		</div>
	)
}

// now we create data
// forgot to install bootstrap
// so we going to display Today and of course it change with your local language
// depend on your browser locale

export default ChatBox

// ok we are done
// end of stream
// i wil upload code in github and paste it in the channel
