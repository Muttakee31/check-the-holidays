import Head from 'next/head'
import {Calendar} from "react-calendar";
import React, {useEffect, useState} from "react";
import {BaseURL} from "../config";
import Sidebar from "../Components/Sidebar";
import dayjs from "dayjs";
import axios from 'axios';

export default function Home() {
    const [date, setDate] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined);
    const [holidays, setHolidays] = useState([]);
    const [offList, setOffList] = useState([]);
    const [tab, setTab] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect( () => {
        let temp = [];
        setLoader(true);
        axios.get(BaseURL+'/api/holidays.js').then(response => {
            if (response.status === 200) {
                setHolidays(response.data.holidays);
                response.data.holidays.map((instant, index) => {
                    let id = instant._id;
                    instant.date.map((ins, ind)=> {
                        temp.push({date: ins, id: id});
                    })
                });
                setOffList(temp);
                setLoader(false);
            }
        }).catch(e => {
            setLoader(false);
            console.log(e);
        });
    }, []);


    const activateTab = (value, event) => {
        offList.map((instant, index) => {
            if (dayjs(instant.date).format('DD-MM-YYYY') === dayjs(value).format('DD-MM-YYYY')) {
                setTab(instant._id);
                setNewDate(value);
            }
        });
        setStartDate(value);
        setSelectedMonth(value.getMonth());
        //console.log(value.getMonth());
    };

    const setNewDate = (date) => {
        setDate(date);
    };

    const changeDate = ({ activeStartDate, view }) => {
        setStartDate(activeStartDate);
    };

   const tileClassName = ({ date, view }) => {
        // Add class to tiles in month view only
       if (view === 'month') {
           if (offList.find(dDate => (dayjs(dDate.date).format('DD-MM-YYYY') == dayjs(date).format('DD-MM-YYYY')))) {
               return 'holiday';
           }
       }
       /*offList.map((instant, index) => {
           if (dayjs(instant.date).format('DD-MM-YYYY') === dayjs(date).format('DD-MM-YYYY')) {
               return 'holiday'
           }
       });*/
    };


  return (
    <div>
      <Head>
        <title>Know official holidays</title>
        <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
              crossOrigin="anonymous" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="Check the holidays" />
          <link rel="apple-touch-icon" href="/icons/icon-128.png" />
          <meta name="description" content="A sample weather app" />
          <meta name="theme-color" content="#2F3BA2" />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://check-the-holidays.now.sh' />
          <meta name='twitter:title' content='Check the holidays' />
          <meta name='twitter:description' content='Get to know your next free day in few clicks!' />
          <meta name='twitter:image' content='https://check-the-holidays.now.sh/static/icons/icon-128.png' />
          <meta name='twitter:creator' content='' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Check the holidays' />
          <meta property='og:description' content='Get to know your next free day in few clicks' />
          <meta property='og:site_name' content='Check the holidays' />
          <meta property='og:url' content='https://check-the-holidays.now.sh' />
          <meta property='og:image' content='https://check-the-holidays.now.sh/static/icons/apple-touch-icon.png' />

      </Head>

        <div className='full-container'>

            <Sidebar tab={tab} setNewDate={setNewDate} holidays={holidays} loader={loader}
                     setStartDate={setStartDate} selectedMonth={selectedMonth}/>

            <div className='calendar-container'>
                <h1 className="title">
                    Welcome to Holiday Calendar
                </h1>

                <Calendar
                    value={date}
                    activeStartDate={startDate}
                    onActiveStartDateChange={changeDate}
                    tileClassName={tileClassName}
                    calendarType='Hebrew'
                    onClickDay={activateTab}
                    minDetail='year'
                />
            </div>
        </div>


      {/*<footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>*/}
    </div>
  )
}
