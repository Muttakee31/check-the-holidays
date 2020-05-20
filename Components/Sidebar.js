import React, {useEffect, useState} from "react";
import {holiday_list, months} from "../config";
import dayjs from "dayjs";

const Sidebar = ({tab, setDate}) => {

    const [activeTab, activateTab] = useState(null);
    const [holidayList, setHolidayList] = useState([]);
    const [visibleHolidayList, setVisibleHolidayList] = useState([]);
    const [month, setMonth] = useState("");

    const switchTab = (index, date) => {
        activateTab(index);
        setDate(date);
    };

    useEffect(() => {
        setHolidayList(holiday_list);
        setVisibleHolidayList(holiday_list);
        if (tab!== null) {
            activateTab(tab);
        }
    }, [tab] );

    const filterHolidayList = (e) => {
        let val = e.target.value;
        setMonth(val);
        if (val.length !== 0) {
            let arr = holidayList.filter( instant => (instant.month == val));
            console.log(arr);
            setVisibleHolidayList(holidayList.filter( instant => (instant.month === Number(val))));
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
                </div>
            </div>
            <div className="menus" style={{overflowX: 'hidden'}}>
                {visibleHolidayList.length === 0 ?
                    <div style={{textAlign: 'center', fontSize: '1.15em', marginTop: '40px'}}>
                        Bad news! No off-day for you!!
                    </div>
                    :
                    visibleHolidayList.map((instant, index)=>{
                        return (
                            <div className={Number(activeTab) === instant.id?'active-tab':''} onClick={()=> switchTab(instant.id, instant.date[0])}
                                 style={{padding: '20px 8px', cursor:'pointer', borderBottom: '1px solid #f2f2f2'}}>
                                <div className='row'>
                                    <div className='col'>
                                        {instant.title}
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