import React, {useEffect, useState} from "react";
import {holiday_list} from "../config";
import dayjs from "dayjs";

const Sidebar = ({tab, setDate}) => {

    const [activeTab, activateTab] = useState(null);
    const [holidayList, setHolidayList] = useState([]);

    const switchTab = (index, date) => {
        activateTab(index);
        setDate(date);
    };

    useEffect(() => {
        setHolidayList(holiday_list);
        if (tab!== null) {
            activateTab(tab);
        }
    }, [tab] );

    return (
        <div className="sidebar" id="sidebar">
            <div className='row'>
                <div className='col' style={{borderBottom: '1px solid #f2f2f2', marginLeft: '12px', padding:'12px', fontWeight:'520', fontSize: '1.4em'}}>
                    List of holidays
                </div>
            </div>
            <div className="menus" style={{overflowX: 'hidden'}}>
                {holidayList.length === 0 ?
                    <div style={{textAlign: 'center', fontSize: '1.15em', marginTop: '40px'}}>
                        Bad news! No off-day for you!!
                    </div>
                    :
                    holidayList.map((instant, index)=>{
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
                                                -- {dayjs(instant.date[instant.date.length -1]).format("MMM DD, YYYY")}
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