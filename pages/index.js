import Head from 'next/head'
import {Calendar} from "react-calendar";
import React, {useEffect, useState} from "react";
import {holiday_list} from "../config";
import Sidebar from "../Components/Sidebar";
import dayjs from "dayjs";


export default function Home() {
    const [date, setDate] = useState(new Date());

    const [holidays, setHolidays] = useState(holiday_list);
    const [offList, setOffList] = useState([]);
    const [tab, setTab] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    useEffect( () => {
        let temp = [];
        holidays.map((instant, index) => {
            let id = instant.id;
            instant.date.map((ins, ind)=> {
                temp.push({date: ins, id: id});
            })
        });
        setOffList(temp);
    }, []);

    const onChange = () => {
    };

    const activateTab = (value, event) => {
        offList.map((instant, index) => {
            if (dayjs(instant.date).format('DD-MM-YYYY') === dayjs(value).format('DD-MM-YYYY')) {
                setTab(instant.id);
                setNewDate(value);
            }
        });
        setSelectedMonth(value.getMonth());
        //console.log(value.getMonth());
    };

    const setNewDate = (date) => {
        setDate(date);
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

      </Head>

        <div className='row container'>
            <div className='col-xs-6 col-sm-3' style={{paddingLeft: 0}}>
                <Sidebar tab={tab} setNewDate={setNewDate} selectedMonth={selectedMonth}/>
            </div>
            <div className='col-xs-6 col-sm-9 calendar-container'>
                <h1 className="title">
                    Welcome to Holiday Calendar
                </h1>

                <Calendar
                    onChange={onChange}
                    value={date}
                    activeStartDate={date}
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
