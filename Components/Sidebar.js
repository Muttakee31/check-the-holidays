import React, {useEffect, useState} from "react";
import {months} from "../config";
import dayjs from "dayjs";

const Sidebar = ({tab, holidays, selectedMonth, setNewDate,
                     setStartDate, loader, setSelectedMonth, getImage}) => {

    const [activeTab, activateTab] = useState(null);
    const [holidayList, setHolidayList] = useState([]);
    const [visibleHolidayList, setVisibleHolidayList] = useState([]);
    const [month, setMonth] = useState("");

    const switchTab = (index, date) => {
        activateTab(index);
        const temp = dayjs(date).toDate();
        setNewDate(temp);
        setStartDate(temp);
        getImage(dayjs(date).month());
    };

    useEffect(() => {
        setHolidayList(holidays);
        setVisibleHolidayList(holidays);
        if (tab!== null) {
            activateTab(tab);
        }
        if (selectedMonth !== null) {
            setVisibleHolidayList(holidayList.filter( instant => (instant.month === Number(selectedMonth))));
            setMonth(selectedMonth);
        }
    }, [tab, holidays, holidayList, selectedMonth] );

    const filterHolidayList = (e) => {
        let val = e.target.value;
        setMonth(val);
        setSelectedMonth(Number(val));
        if (val.length !== 0) {
            let arr = holidayList.filter( instant => (instant.month == val));
            setVisibleHolidayList(arr);
            if (arr.length !== 0) {
                switchTab(arr[0]._id, arr[0].date[0]);
            }
            else {
                setNewDate(new Date(2020, val, 1));
            }
        }
        else {
            setVisibleHolidayList(holidayList);
        }
    };

    return (
        <div className="sidebar" id="sidebar">

            <div className="custom-selector-container">
                <select
                    onChange={filterHolidayList}
                    name="month"
                    value={month}
                    className="form-control custom-selector"
                >
                    <option value={""}>All holidays </option>
                    {months.map((mon, index) => (
                        <option value={index}>{mon}</option>
                    ))}
                </select>
            </div>

            <div className='row'>
                <div className='col' style={{borderBottom: '1px solid #f2f2f2', marginLeft: '12px', padding:'12px', fontWeight:'520', fontSize: '1.4em'}}>
                    List of holidays
                    <div style={{fontSize: '10px'}}> <span style={{color:'red'}}>*</span> marked holidays depend on moon sighting</div>
                </div>
            </div>
            <div className="menus" style={{overflowX: 'hidden'}}>
                {loader === true?
                    <div className='mx-auto' style={{height: '50px', width: '50px', marginTop: '80px'}}>
                        <div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    visibleHolidayList.length === 0 ?
                    <div style={{textAlign: 'center', fontSize: '1.15em', marginTop: '40px'}}>
                        Bad news! No off-day for you!!
                    </div>
                    :
                    visibleHolidayList.map((instant, index)=>{
                        return (
                            <div className={activeTab === instant._id?'active-tab':''} onClick={()=> switchTab(instant._id, instant.date[0])}
                                 style={{padding: '20px 8px', cursor: 'pointer', boxShadow:'0 4px 29px 0 rgba(0,0,0,.05)'}}>
                                <div className='row'>
                                    <div className='col'>
                                        {instant.title}
                                        {instant.type === 2 && <span style={{color:'red'}}>*</span>}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        {dayjs(instant.date[0]).format("MMM DD, YYYY")}
                                        {instant.date.length >1 &&
                                            <span>
                                                {" "} -- {dayjs(instant.date[instant.date.length -1]).format("MMM DD, YYYY")}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>

                        )
                    })

                }
            </div>
        </div>
    );
};

export default Sidebar;