// so what we need in a chatbox?
// message body
// date
// error
// sending/sent
// is receiver? (left/right)

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const thisWeek = new Date()
thisWeek.setDate(thisWeek.getDate() - 2)

const thisMonth = new Date()
thisMonth.setDate(thisMonth.getDate() - 7)

const thisYear = new Date()
thisYear.setMonth(thisYear.getMonth() - 1)

const lastYear = new Date()
lastYear.setFullYear(thisYear.getFullYear() - 1)

const data = [
	//in your database you need to arrange the latest at last in array or the first
	// depend on how you plan it, but it is either descending or ascending
	// because you dont want to sort it everytime you receive it in front end
	// you could, but i dont understand why dont you just sort it when the message is created
	{
		body: 'this message is sent this year',
		receiver: true,
		date: lastYear,
	},

	{
		body: 'this message is sent this year',
		receiver: true,
		date: thisYear,
	},
	{
		body: 'this message is sent this month',
		receiver: true,
		date: thisMonth,
	},
	{
		body: 'this message is sent this week',
		receiver: false,
		date: thisWeek,
	},
	{
		body: 'this message is sent yesterday',
		receiver: true,
		date: yesterday,
	},
	{
		body: 'this message is sent today',
		sending: false, // this is only for receiver and last message
		receiver: true,
		date: new Date(), //today
	},
	{
		body: 'this message is sent today',
		receiver: false,
		date: new Date(),
	},
]
// we will add more date later, yesterday, this week, this month, this year,
// all this result in different date divider

// so we now done the UI, it is ugly, you deal with that yourself
// now we going to add the same date, to test whether it work or not
// since it is same day, we do not expect another date divider

// now we see there is another date divider for same date, which doesnt make sense
// this is known as bug, and to deduce this bug, before you console.log,
// you can start with some deduction, we know two thing, date divider is depend on
// date and previous date, we have date in our date, we dont have previous
// which mean our previous date is always undefined, which is why the date divider
// always appear with the message, we need to fix this

// now we complete all the date

export { data }
