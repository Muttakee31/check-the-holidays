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
                setDate(value);
                setTab(instant.id);
            }
        });
    };

    const setNewDate = (date) => {
        setDate(date);
    };

   const tileClassName = ({ date, view }) => {
        // Add class to tiles in month view only
       if (offList.find(dDate => (dayjs(dDate.date).format('DD-MM-YYYY') == dayjs(date).format('DD-MM-YYYY')))) {
           return 'holiday';
       }
       /*offList.map((instant, index) => {
           if (dayjs(instant.date).format('DD-MM-YYYY') === dayjs(date).format('DD-MM-YYYY')) {
               return 'holiday'
           }
       });*/
    };


  return (
    <div className="container">
      <Head>
        <title>Know official holidays</title>
        <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
              crossOrigin="anonymous" />

      </Head>

        <Sidebar tab={tab} setDate={setNewDate}/>
      <main>
        <h1 className="title">
          Welcome to Holiday Calendar
        </h1>

          <Calendar
              onChange={onChange}
              value={date}
              tileClassName={tileClassName}
              calendarType='Arabic'
              onClickDay={activateTab}
          />



      </main>

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

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          padding-bottom: 30px;
          line-height: 1.15;
          font-size: 2rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
